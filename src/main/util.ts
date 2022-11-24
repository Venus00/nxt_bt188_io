/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */
/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import fs from 'fs';
import { sprintf } from 'sprintf-js';
import { APPCONFIG } from './config';

export const isDebug = process.env.NODE_ENV === 'development';

export const RESOURCES_PATH = path.join(__dirname, '../../assets');

if (!isDebug) {
	const sourceMapSupport = require('source-map-support');
	sourceMapSupport.install();
}

if (isDebug) {
	require('electron-debug')();
}

export const getAssetPath = (...paths: string[]): string => {
	return path.join(RESOURCES_PATH, ...paths);
};

export function resolveHtmlPath(htmlFileName: string) {
	if (process.env.NODE_ENV === 'development') {
		const port = process.env.PORT || 1212;
		const url = new URL(`http://localhost:${port}`);
		url.pathname = htmlFileName;
		return url.href;
	}
	return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

export function loadConfig(): Promise<APPCONFIG> {
	return new Promise((resolve, reject) => {
		try {
			const file = fs.readFileSync(getAssetPath('cfg.json')).toString();
			const config = JSON.parse(file);
			resolve(config);
		} catch (error) {
			console.log((error as any)?.message);
			reject((error as any)?.message);
		}
	});
}

export const installExtensions = async () => {
	const installer = require('electron-devtools-installer');
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
	const extensions = ['REACT_DEVELOPER_TOOLS'];

	return installer
		.default(
			extensions.map((name) => installer[name]),
			forceDownload
		)
		.catch(console.log);
};

export function generateDeviceID(mac: string) {
	const result = sprintf(
		'%u%u%u%u%u%u',
		parseInt(mac.substring(0, 2), 16),
		parseInt(mac.substring(3, 5), 16),
		parseInt(mac.substring(6, 8), 16),
		parseInt(mac.substring(9, 11), 16),
		parseInt(mac.substring(12, 14), 16),
		parseInt(mac.substring(15, 17), 16)
	);

	return result;
}

export function reverseStr(str: string) {
	let result = '';
	for (let i = 0; i < str.length; i++) result += str[str.length - i - 1];
	return result;
}

export function generateMqttPassword(pwd: string) {
	const result = sprintf(
		'%s%s%s%s',
		reverseStr(pwd.substring(5, 8)),
		reverseStr(pwd.substring(2, 5)),
		isNaN(parseInt(pwd.substring(0, 2), 10))
			? '00'
			: parseInt(pwd.substring(0, 2), 10),
		pwd.substring(8, 10)
	);
	return result;
}
