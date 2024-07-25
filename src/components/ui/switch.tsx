import React from "react";
import * as Switch from "@radix-ui/react-switch";

interface Props {
	checked: boolean;
}

export function SwitchDemo({ checked }: Props) {
	function changeTheme(e: boolean) {
		// console.log(localStorage.theme);

		// //On page load or when changing themes, best to add inline in `head` to avoid FOUC
		// if (
		// 	localStorage.theme === "dark" ||
		// 	(!("theme" in localStorage) &&
		// 		window.matchMedia("(prefers-color-scheme: dark)").matches)
		// ) {
		// 	document.documentElement.classList.add("dark");
		// } else {
		// 	document.documentElement.classList.remove("dark");
		// }

		// if (e) {
		// 	localStorage.theme = "dark";
		// 	return;
		// }
		// localStorage.theme = "light";

		// Whenever the user explicitly chooses light mode
		//localStorage.theme = "light";

		// Whenever the user explicitly chooses dark mode
		//localStorage.theme = "dark";

		// Whenever the user explicitly chooses to respect the OS preference
		//localStorage.removeItem("theme");
	}
	return (
		<form>
			<div>
				<Switch.Root
					className="w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
					id="airplane-mode"
					//checked={checked}
					onCheckedChange={(e) => {
						//changeTheme(e);
					}}
				>
					<Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
				</Switch.Root>
			</div>
		</form>
	);
}
