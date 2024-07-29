import TransmanagerCard from "@/components/TransmanagerCard";
import ControleAtendimentoCard from "@/components/ControleAtendimentoCard";

/**
 * Home é o componente de entrada do app.
 * Aqui será referenciado os demais componentes (cards) que
 * servirão como menus para acesso a módulos em toso o site
 * @author Krekinha
 * @version 1.0
 */
export default function Home() {
	return (
		<div className="dark:bg-gray-800 bg-red-700 flex justify-start ml-3 mt-3 max-sm:flex-col max-sm:items-center gap-2">
			<TransmanagerCard />
			<ControleAtendimentoCard />
		</div>
	);
}
