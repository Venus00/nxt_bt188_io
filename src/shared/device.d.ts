interface IDeviceState {
	isConnected: boolean;
	ip: string;
	mac: string;
	machine: string;
	uptime: number;
	code: number;
	version: string;
}
interface MachineState {
	downtime: number;
	opCount: number;
	io: number;
	status: 'IDLE' | 'TWISTING';
	opCountPerHour: number[];
	hour: number;
	downtimePerShift: number;
}

