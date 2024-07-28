/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: colors,
		},
	},
	plugins: [require("flowbite/plugin")],
	darkmode: "class",
};
