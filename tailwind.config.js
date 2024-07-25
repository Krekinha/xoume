/** @type {import('tailwindcss').Config} */

import colors from "tailwindcss/colors";

module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite-react/lib/esm/**/*.js",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			colors: colors,
		},
	},
	plugins: [require("flowbite/plugin")],
	darkmode: "class",
};
