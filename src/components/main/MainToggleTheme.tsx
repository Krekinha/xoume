"use client";
import { useTheme } from "next-themes";
import * as React from "react";

import { Moon, Sun } from "lucide-react";

export function MainToggleTheme() {
	const { setTheme } = useTheme();

	return (
		<div
			className="inline-flex items-center rounded-full border p-0.5 border-gray-700"
			aria-label="Toggle Theme"
		>
			<button type="button" className="" onClick={() => setTheme("light")}>
				<Sun className="dark:hover:text-gray-500 dark:text-gray-700 text-amber-400  size-7 rounded-full p-1.5" />
			</button>

			<button type="button" onClick={() => setTheme("dark")}>
				<Moon className="lucide lucide-moon text-gray-700 hover:text-gray-500 dark:text-amber-400 size-7 rounded-full p-1.5" />
			</button>
		</div>
	);
}
