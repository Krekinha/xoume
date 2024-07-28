/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {},
	plugins: [require("flowbite/plugin")],
	darkmode: "class",
};
