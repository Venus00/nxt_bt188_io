/* eslint-disable no-plusplus */
import { SerialPort } from 'serialport';
import { DelimiterParser } from '@serialport/parser-delimiter';
import { Timer } from 'timer-node';
import * as cron from 'node-cron';

export enum EventType {
	ON_OP = 'on_op',
	ON_DATA = 'on_data',
}

export class TwistingMachine {
	public isConnected: boolean;

	private port: SerialPort;

	private decoder: DelimiterParser | undefined;

	private path: string;

	private timer: Timer;

	public state: MachineState;

	private onEvent: (event: EventType, payload: any) => void;

	public constructor(
		portPath: string,
		onEventCallback: (event: EventType, payload: any) => void
	) {
		this.isConnected = false;
		this.path = portPath;
		this.onEvent = onEventCallback;
		this.timer = new Timer({ label: 'downtime' });
		this.timer.clear();
		this.timer.start();
		this.state = {
			io: 0,
			downtime: 0,
			opCount: 0,
			status: 'IDLE',
			hour: 0,
			opCountPerHour: [0, 0, 0, 0, 0, 0, 0, 0],
			downtimePerShift: 0,
		};

		// shift setup hour
		const hour = new Date().getHours();
		if (hour >= 6 && hour < 14) this.state.hour = hour - 6;
		else if (hour >= 14 && hour < 22) this.state.hour = hour - 14;
		else if (hour < 6) this.state.hour = hour + 2;
		else this.state.hour = hour - 22;

		this.port = new SerialPort(
			{
				path: this.path,
				baudRate: 115200,
				autoOpen: true,
			},
			(err) => {
				if (err) {
					throw new Error("Can't Open Serial Port");
				}
				console.log('Device Connected');
				this.isConnected = true;
				this.decoder = this.port.pipe(
					new DelimiterParser({
						delimiter: ['\n'.charCodeAt(0)],
					})
				);
				this.decoder.on('data', this.handleDeviceMessage.bind(this));
			}
		);

		setInterval(this.hearthBeat.bind(this), 1000);

		cron.schedule('0 * * * *', () => {
			if (this.state.hour > 6) {
				this.state.opCountPerHour = [0, 0, 0, 0, 0, 0, 0, 0];
				this.state.hour = 0;
				this.state.opCount = 0;
				this.state.downtimePerShift = 0;
			} else this.state.hour += 1;
		});
	}

	public hearthBeat() {
		const time = Math.floor(this.timer.ms() / 1000);
		this.state.downtime = time;
		if (time > 30) this.state.downtimePerShift = time - 30;
		this.onEvent(EventType.ON_DATA, this.state);
	}

	private handleDeviceMessage(chunk: any) {
		// eslint-disable-next-line radix
		const data = parseInt(chunk.toString().trim());

		// hold
		if (data === 1 && this.state.io === 0) {
			this.timer.clear();
			this.timer.pause();
			this.state.downtime = 0;
			this.state.opCount += 1;
			this.state.opCountPerHour[this.state.hour] += 1;
			this.state.status = 'TWISTING';
		}

		// release
		if (data === 0 && this.state.io === 1) {
			this.timer.start();
			this.state.status = 'IDLE';
			this.onEvent(EventType.ON_OP, `Operation DONE`);
		}
		this.state.io = data;
		this.onEvent(EventType.ON_DATA, this.state);
	}
}
