import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IDeviceState = {
	code: 1,
	ip: 'NOT CONNECTED',
	mac: 'XXXXXXXXXXXX',
	machine: '',
	uptime: 0,
	version: '',
	isConnected: false,
};

const slice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		updateDeviceStatus(
			state: IDeviceState,
			action: PayloadAction<IDeviceState>
		) {
			state.code = action.payload.code;
			state.ip = action.payload.ip;
			state.mac = action.payload.mac;
			state.uptime = action.payload.uptime;
			state.version = action.payload.version;
			state.machine = action.payload.machine;
			state.isConnected = action.payload.isConnected;
		},
	},
});

export const { reducer } = slice;
export const { updateDeviceStatus } = slice.actions;

export default slice;
