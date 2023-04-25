import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MachineState = {
	io: 0,
	status: 'IDLE',
	downtime: 0,
	opCount: 0,
	opCountPerHour: [0, 0, 0, 0, 0, 0, 0, 0],
	hour: 0,
	downtimePerShift: 0,
};

const slice = createSlice({
	name: 'machine',
	initialState,
	reducers: {
		updateMachineStatus(
			state: MachineState,
			action: PayloadAction<MachineState>
		) {
			state.io = action.payload.io;
			state.status = action.payload.status;
			state.downtime = action.payload.downtime;
			state.opCount = action.payload.opCount;
			state.opCountPerHour = action.payload.opCountPerHour;
			state.downtimePerShift = action.payload.downtimePerShift;
		},
	},
});

export const { reducer } = slice;
export const { updateMachineStatus } = slice.actions;

export default slice;

