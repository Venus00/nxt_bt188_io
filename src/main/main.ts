/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable global-require */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'node:path';
import fs from 'node:fs';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import mac from 'macaddress';
import MenuBuilder from './menu';
import {
	generateDeviceID,
	generateMqttPassword,
	getAssetPath,
	installExtensions,
	isDebug,
	resolveHtmlPath,
} from './util';
import {
	ON_DEVICE_STATE_UPDATE,
	ON_MACHINE_OP_DONE,
	ON_MACHINE_STATE_UPDATE,
} from '../shared/Channels';
import { ConnectionClient } from './ConnectionClient';
import { EventType, TwistingMachine } from './TwistingMachine';

app.disableHardwareAcceleration();

let mainWindow: BrowserWindow | null = null;
let globalConfig: any;
const clients: ConnectionClient[] = [];
// eslint-disable-next-line @typescript-eslint/no-use-before-define
const machine = new TwistingMachine(
	process.platform === 'linux' ? '/dev/ttyS1' : 'COM48',
	onMachineEvent
);

const deviceState: IDeviceState = {
	code: 0,
	ip: '',
	mac: '',
	uptime: 0,
	version: '1.0.0',
	machine: 'N/A',
	isConnected: false,
};

const createWindow = async () => {
	if (isDebug) {
		await installExtensions();
	}

	mainWindow = new BrowserWindow({
		kiosk: !isDebug,
		show: false,
		width: 1024,
		height: !isDebug ? 600 : 680,
		icon: getAssetPath('icon.png'),
		webPreferences: {
			preload: !isDebug
				? path.join(__dirname, 'preload.js')
				: path.join(__dirname, '../../.nxt/dll/preload.js'),
		},
	});

	mainWindow.loadURL(resolveHtmlPath('index.html'));

	mainWindow.on('ready-to-show', () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined');
		}
		if (process.env.START_MINIMIZED) {
			mainWindow.minimize();
		} else {
			mainWindow.show();
		}
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// const menuBuilder = new MenuBuilder(mainWindow);
	// menuBuilder.buildMenu();

	mainWindow.webContents.setWindowOpenHandler((edata) => {
		shell.openExternal(edata.url);
		return { action: 'deny' };
	});
};

/**
 *  LifeCycle Handlers
 */

function onMachineEvent(evt: EventType, payload: Buffer) {
	switch (evt) {
		case EventType.ON_OP:
			console.log('OPERATION DONE');
			mainWindow?.webContents.send(ON_MACHINE_OP_DONE, 'OPERATION DONE');
			clients.forEach((client) => {
				client.publish('devices/_id/events', 'OPERATION DONE');
			});
			break;
		case EventType.ON_DATA:
			const data = JSON.stringify({
				device: deviceState,
				state: payload,
			});
			console.log(data);
			mainWindow?.webContents.send(ON_MACHINE_STATE_UPDATE, payload);
			clients.forEach((client) => {
				client.publish('devices/_id/data', data);
			});
			break;
		default:
			break;
	}
}

function hearthBeat() {
	deviceState.uptime += 1;
	mainWindow?.webContents.send(ON_DEVICE_STATE_UPDATE, deviceState);
}

async function refreshIP() {
	const result = await mac.all();
	const connected = deviceState.isConnected;
	if (process.platform === 'linux') {
		deviceState.ip = result.wlan0.ipv4;
		deviceState.mac = (result.wlan0.mac as string)
			.replaceAll(':', '')
			.toLocaleUpperCase();
		deviceState.isConnected = true;
	} else {
		deviceState.ip = result.WiFi.ipv4;
		deviceState.mac = (result.WiFi.mac as string)
			.replaceAll(':', '')
			.toLocaleUpperCase();
		deviceState.isConnected = true;
	}

	if (connected !== deviceState.isConnected) {
		ipcMain.emit('connected', 'done');
	}
}

async function handleRPC(source: string, payload: Buffer) {
	console.log(`[${source}] - ${payload.toString()}`);
}

/**
 * Add event listeners...
 */
ipcMain.on('startup', () => {
	for (let index = 0; index < clients.length; index++) {
		const client = clients[index];
		client.addSubscription('devices/_id/rpc', (c, msg) => {
			handleRPC(c.name, msg);
		});

		client.connect();
	}
});

ipcMain.on('connected', () => {
	try {
		console.log('connected');
		const id = generateDeviceID(deviceState.mac);
		const username = id;
		const password = generateMqttPassword(id);

		globalConfig.connection.brokers.forEach((broker: any) => {
			clients.push(
				new ConnectionClient(
					broker.name,
					broker.ip,
					broker.port,
					`044${id}`,
					username,
					password
				)
			);
		});
		ipcMain.emit('startup');
	} catch (error) {
		console.log((error as any).message);
	}
});
app.on('ready', () => {
	refreshIP();
	hearthBeat();
	setInterval(hearthBeat, 1000);
	setInterval(refreshIP, 10000);

	const file = fs.readFileSync(getAssetPath('cfg.json'));
	globalConfig = JSON.parse(file.toString());
	deviceState.machine = globalConfig.device.name;
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.whenReady()
	.then(async () => {
		createWindow();
		app.on('activate', async () => {
			if (mainWindow === null) {
				createWindow();
			}
		});
		return null;
	})
	.catch(console.log);
