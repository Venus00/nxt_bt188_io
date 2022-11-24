export interface BrokerType {
	name: string;
	ip: string;
	port: string;
}
export interface APPCONFIG {
	connection: {
		brokers: Array<BrokerType>;
	};
	device: any;
}
