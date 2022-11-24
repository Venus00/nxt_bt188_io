import { combineReducers } from '@reduxjs/toolkit';
import { reducer as deviceReducer } from './slices/device';
import { reducer as machineReducer } from './slices/machine';

const rootReducer = combineReducers({
	device: deviceReducer,
	machine: machineReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
