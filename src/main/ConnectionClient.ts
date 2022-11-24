/* eslint-disable import/prefer-default-export */
import { connect, MqttClient } from 'mqtt';

interface SubEvent {
	name: string;
	handler: (client: ConnectionClient, msg: Buffer) => void;
}

export class ConnectionClient {
	private client: MqttClient | null;

	private isConnected: boolean;

	private SubEvents: Array<SubEvent>;

	constructor(
		public name: string,
		public ip: string,
		public port: number,
		public id: string = '',
		public username: string = '',
		private password: string = ''
	) {
		this.SubEvents = [];
		this.isConnected = false;
		this.client = null;
		if (this.id === '') {
			this.id = `NXT_A133_${Math.floor(Math.random() * 1000).toString()}`;
		}
	}

	addSubscription(
		topic: string,
		callback: (client: ConnectionClient, msg: Buffer) => void
	) {
		const t = topic.replaceAll('_id', this.id);
		this.SubEvents.push({
			name: t,
			handler: callback,
		});
	}

	connectionStatus() {
		return this.isConnected;
	}

	connect() {
		console.log(`${this.name} - Connecting`);
		this.client = connect({
			host: this.ip,
			port: this.port,
			clientId: this.id,
			//username: this.username,
			//password: this.password,
		});

		this.client.on('connect', () => {
			console.log(`${this.name} - Connected`);
			this.isConnected = true;
			this.SubEvents.forEach((sub) => {
				this.client?.subscribe(sub.name);
			});
		});

		this.client.on('disconnect', () => {
			console.log(`${this.name} - Disconnected`);
			this.isConnected = false;
			this.client?.reconnect();
		});

		this.client.on('message', (topic, payload) => {
			const sub = this.SubEvents.find((s) => s.name === topic);
			if (!sub) return;

			sub.handler(this, payload);
		});
	}

	publish(topic: string, message: string) {
		const t = topic.replaceAll('_id', this.id);
		if (this.client?.connected) {
			this.client.publish(t, message);
		}
	}
}

