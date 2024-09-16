"use client";

import type { Transporte } from "@/utils/types";

interface TransporteAutomacoesProps {
	transporte: Transporte;
}

export function TransporteAutomacoes({
	transporte,
}: TransporteAutomacoesProps) {
	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="bg-blue-500">CTe</div>
			<div className="bg-violet-500">Complemento</div>
		</div>
	);
}
