import { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";

export function ToggleTheme() {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark",
	);
	const element = document.documentElement;
	const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
	console.log(darkQuery, "darkQuery");

	const options = [
		{
			icon: <MdNightlightRound className=" self-center place-self-center" />,
			text: "dark",
		},
		{
			icon: <MdOutlineLightMode className=" self-center place-self-center" />,
			text: "light",
		},
	];

	function onWindowMatch() {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) && darkQuery.matches)
		) {
			element.classList.add("dark");
		} else {
			element.classList.remove("dark");
		}
	}

	onWindowMatch();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		switch (theme) {
			case "dark":
				element.classList.add("dark");
				localStorage.setItem("theme", "dark");
				break;
			case "light":
				element.classList.remove("dark");
				localStorage.setItem("theme", "light");
				break;

			default:
				localStorage.removeItem("theme");
				onWindowMatch();
				break;
		}
	}, [theme, element]);

	return (
		<div className="flex duration-100 text-gray-500">
			{options.map((opt) => (
				<button
					key={opt.text}
					onClick={() => setTheme(opt.text)}
					className={`flex w-8 h-8 leading-9 text-xl rounded-full ${theme === opt.text && "text-sky-600"} place-content-center`}
				>
					{opt.icon}
				</button>
			))}
		</div>
	);
}
