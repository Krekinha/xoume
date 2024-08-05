import { MainCard } from "@/components/MainCard";
import { FcInTransit } from "react-icons/fc";
import Image from "next/image";

/**
 * Home é o componente de entrada do app.
 * Aqui será referenciado os demais componentes (cards) que
 * servirão como menus para acesso a módulos em todo o site
 * @author Krekinha
 */
export default function Home() {
	function caImage() {
		return (
			<div>
				<Image
					src="/images/ca-card.png"
					width={25}
					height={25}
					alt="makit"
					className="w-[25px] h-[25px]"
				/>
			</div>
		);
	}

	return (
		<div className=" h-screen dark:bg-gray-800 pt-16 pl-6 bg-slate-200 flex justify-start max-sm:flex-col max-sm:items-center gap-4">
			<MainCard.Root link="/transmanager">
				<MainCard.Header>
					<MainCard.Icon icon={FcInTransit} />
					<MainCard.Titulo titulo="Transmanager" />
				</MainCard.Header>
				<MainCard.Conteudo conteudo="Gerencimento de transportes" />
			</MainCard.Root>

			<MainCard.Root link="/controle-atendimento">
				<MainCard.Header>
					<MainCard.Icon icon={caImage} />
					<MainCard.Titulo titulo="Atendimentos" />
				</MainCard.Header>
				<MainCard.Conteudo conteudo="Controle para gerencimento dos atendimentos realizados" />
			</MainCard.Root>
		</div>
	);
}
