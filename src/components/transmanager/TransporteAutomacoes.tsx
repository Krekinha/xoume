"use client";

import type { Transporte } from "@/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCopyright } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { formatCurrency, formatDecimal } from "@/utils/format";
import type React from "react";
import { TextToClipboard } from "./TextToClipboard";
import { Separator } from "../ui/separator";

interface TransporteAutomacoesProps {
	transporte: Transporte;
}

export function TransporteAutomacoes({
	transporte,
}: TransporteAutomacoesProps) {
	const valCoralCteA = () => {
		return `MARGEM PARA COMPLEMENTO = ${formatCurrency(
			transporte.val_cte?.toString(),
		)}`;
	};

	const valCoralCteB = () => {
		return `VALOR FRETE = PESO REAL NOTA ${transporte.notas?.join(
			"/",
		)} (${formatDecimal(transporte.peso?.toString())}) x ${formatCurrency(
			transporte.val_tonelada?.toString(),
		)} = ${formatCurrency(transporte.val_cte?.toString())}`;
	};

	const valCoralComplemento = () => {
		const model =
			"COMPLEMENTO DO CTE X. VALOR FRETE = PESO REAL NOTA X (XX.XXX,00) x XXX,00 = R$ XX.XXX,00 " +
			"- VALOR FRETE NO CTE X (R$ XX.XXX,00) = R$ XX.XXX,00";

		if (!transporte.cteComplementar?.peso || !transporte.val_tonelada)
			return model;
		const val_peso =
			Number.parseFloat(transporte.cteComplementar.peso.toString()) /
			1000;
		const valTransporte = val_peso * Number(transporte.val_tonelada);

		return `COMPLEMENTO DO CTE ${transporte.cte}. VALOR FRETE = PESO REAL NOTA(S) ${transporte.notas?.join(
			"/",
		)} (${formatDecimal(transporte.cteComplementar?.peso?.toString())}) x ${formatCurrency(
			transporte.val_tonelada?.toString(),
		)} = ${formatCurrency(valTransporte.toString())} - VALOR FRETE NO CTE ${transporte.cte} (${formatCurrency(transporte.val_cte?.toString())}) = ${formatCurrency(transporte.cteComplementar.val_cte?.toString())}`;
	};

	const valCTeWhatsApp = () => {
		return `Segue CT-e *${transporte.cte} (Nota(s) ${transporte.notas?.join(
			"/",
		)})* + MANIFESTO - (${transporte.cidade_origem} x ${
			transporte.cidade_destino
		}) - ${transporte.tomador?.razaoNome} - *${formatCurrency(
			transporte.val_cte?.toString(),
		)}*👇🏼`;
	};

	const valComplementoWhatsApp = () => {
		return `Segue CT-e *${transporte.cteComplementar?.cte}* COMPLEMENTAR ao CT-e *${transporte.cte} (Nota(s) ${transporte.notas?.join(
			"/",
		)})* - (${transporte.cidade_origem} x ${
			transporte.cidade_destino
		}) - ${transporte.tomador?.razaoNome} - *${formatCurrency(
			transporte.cteComplementar?.val_cte?.toString(),
		)}*👇🏼`;
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<Tabs defaultValue="cte" className="w-full">
				<TabsList>
					<TabsTrigger value="cte">CTe</TabsTrigger>
					<TabsTrigger value="complemento">Complemento</TabsTrigger>
				</TabsList>
				<TabsContent value="cte">
					<div className="flex flex-col gap-2 mt-3">
						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="Coral"
								icon={<FaCopyright className="text-gray-500" />}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value value={valCoralCteA()} />
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									textToCopy={valCoralCteA()}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>

						<TextToClipboard.Root>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value value={valCoralCteB()} />
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									textToCopy={valCoralCteB()}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>
						<Separator
							orientation="vertical"
							className="w-full dark:bg-zinc-800 h-[0.01rem]"
						/>

						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="WhatsApp"
								icon={
									<FaSquareWhatsapp className="text-green-500" />
								}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value
									value={valCTeWhatsApp()}
								/>
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									textToCopy={valCTeWhatsApp()}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>
					</div>
				</TabsContent>
				<TabsContent value="complemento">
					<div className="flex flex-col gap-4 mt-3">
						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="Coral"
								icon={<FaCopyright className="text-gray-500" />}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value
									value={valCoralComplemento()}
								/>
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									textToCopy={valCoralComplemento()}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>

						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="WhatsApp"
								icon={
									<FaSquareWhatsapp className="text-green-500" />
								}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value
									value={valComplementoWhatsApp()}
								/>
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									textToCopy={valComplementoWhatsApp()}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
