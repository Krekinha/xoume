import { useEffect, useState } from "react";

/**
 * Esse Navbar é o menu principal do site. Estará visível em
 * todas as rotas que necessite de login
 * @author Krekinha
 * @version 1.0
 */
export default function Media() {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== "undefined") {
				setWidth(window.innerWidth);
				setHeight(window.innerHeight);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // Executa uma vez para iniciar com a largura inicial

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="flex gap-2 items-center">
			<span className="text-gray-500 sm:text-amber-500 sm:font-bold">SM</span>
			<span className="text-gray-500 md:text-amber-500 md:font-bold">MD</span>
			<span className="text-gray-500 lg:text-amber-500 lg:font-bold">LG</span>
			<div className="flex gap-1">
				<span>w:</span>
				<span className="text-green-600">({width}px)</span>
			</div>
			<div className="flex gap-1">
				<span>h:</span>
				<span className="text-blue-500">({height}px)</span>
			</div>
		</div>
	);
}
