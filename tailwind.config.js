/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/renderer/index.ejs',
		'./src/renderer/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
