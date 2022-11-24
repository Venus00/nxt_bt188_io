import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: MachineState = {
	io: 0,
	report: 0,
	status: 'IDLE',
	downtime: 0,
	opCount: 0,
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
			state.report = action.payload.report;
			state.downtime = action.payload.downtime;
			state.opCount = action.payload.opCount;
		},
	},
});

export const { reducer } = slice;
export const { updateMachineStatus } = slice.actions;

export default slice;
