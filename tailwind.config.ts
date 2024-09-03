import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				slideIn: {
					from: {
						width: "0px",
						"min-width": "0px",
						display: "none",
						opacity: "0",
					},
					to: {
						width: "256px",
						"min-width": "256px",
						display: "inline-flex",
						opacity: "1",
					},
				},
				slideOut: {
					from: {
						width: "256px",
						"min-width": "256px",
						opacity: "1",
						display: "inline-flex",
					},
					to: {
						width: "0px",
						"min-width": "0px",
						opacity: "0.5",
						display: "none",
					},
				},
				slideOpen: {
					from: {
						width: "0px",
						display: "none",
					},
					to: {
						width: "240px",
						display: "flex",
					},
				},
				slideClose: {
					from: {
						// width: "240px",
						display: "flex",
						// position: "sticky",
					},
					to: {
						// width: "0px",
						display: "none",
						// position: "fixed",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				slideIn: "slideIn 0.5s ease-in",
				slideOut: "slideOut 0.5s ease-out",
				slideOpen: "slideOpen 0.4s linear",
				slideClose: "slideClose 0.4s linear",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
