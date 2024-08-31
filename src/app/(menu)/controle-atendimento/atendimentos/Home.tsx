//"use client";
import { ListAtendimentos } from "./ListAtendimentos";
import { useAtendimentoStore } from "@/store/useAtendimentoStore";
import { DialogAddAtendimento } from "./DialogAddAtendimento";
import { prisma } from "@/utils/prisma";
import type { PrismaClientValidationError } from "@prisma/client/runtime/library";
import type { Atendimento } from "@/utils/types";
//import { use } from 'react';
export const dynamic = "force-dynamic";
import { unstable_noStore as nostore } from "next/cache";

async function getAtendimentos() {
	try {
		/**
		 * É necessário que o include seja feita em todos os relacionamentos
		 * entre os objetos, do contrário, os elementos sem o include não
		 * irão aparecer em componentes visuais como lista e tabelas
		 */
		const atendimentos = await prisma.atendimento.findMany({
			include: {
				cliente: true,
				evolucao: { include: { eventos: true } },
			},
		});

		console.log(atendimentos);
		return atendimentos;
	} catch (error) {
		console.log("GET-ALL ERRO: ", error);
		return error;
	}
}

export default async function Home() {
	nostore();
	//useAtendimentoStore.getState().getAtendimentos();
	const atendimentos = (await getAtendimentos()) as Atendimento[];
	return (
		<>
			<nav className="navbar p-4 sm:ml-64 fixed top-0 w-full mt-11 py-2 shadow-sm bg-white">
				<DialogAddAtendimento />
				<span className="ml-2 text-sm text-black">Novo atendimento</span>
			</nav>
			<div className="p-4 sm:ml-64 mt-8">
				<div className="mt-12">
					<div className="container mx-auto">
						<div className="relative w-full overflow-auto">
							<ListAtendimentos atendimentos={atendimentos} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
