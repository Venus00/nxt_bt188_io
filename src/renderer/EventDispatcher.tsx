import { useEffect } from 'react';
import { useNotification } from 'react-hook-notification';
import {
	ON_DEVICE_STATE_UPDATE,
	ON_MACHINE_OP_DONE,
	ON_MACHINE_STATE_UPDATE,
} from 'shared/Channels';
import { useAppDispatch } from './store';
import { updateDeviceStatus } from './store/slices/device';
import { updateMachineStatus } from './store/slices/machine';

const EventDispatcher = () => {
	const dispatch = useAppDispatch();
	const notify = useNotification();

	useEffect(() => {
		window.electron.ipcRenderer.on(ON_DEVICE_STATE_UPDATE, (payload) => {
			const status = payload as IDeviceState;
			dispatch(updateDeviceStatus(status));
		});

		window.electron.ipcRenderer.on(ON_MACHINE_STATE_UPDATE, (payload) => {
			dispatch(updateMachineStatus(payload as MachineState));
		});

		window.electron.ipcRenderer.on(ON_MACHINE_OP_DONE, (payload) => {
			notify.success({
				text: payload as string,
				title: 'BT188 Twist',
			});
		});
	}, [dispatch, notify]);
	return null;
};

export default EventDispatcher;
