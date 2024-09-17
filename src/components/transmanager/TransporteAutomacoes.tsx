"use client";

import type { Transporte } from "@/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { FaCopyright } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDecimal } from "@/utils/format";
import CopyToClipboard from "../main/CopyToClipboard";
import type React from "react";
import { useRef, forwardRef } from "react";
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

	const valWhatsApp = () => {
		return `Segue CT-e *${transporte.cte} (Nota ${transporte.notas?.join(
			"/",
		)})* + MANIFESTO - (${transporte.cidade_origem} x ${
			transporte.cidade_destino
		}) - ${transporte.tomador?.razaoNome} - *${formatCurrency(
			transporte.val_cte?.toString(),
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
								icon={<FaSquareWhatsapp className="text-green-500" />}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value value={valWhatsApp()} />
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									textToCopy={valWhatsApp()}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>
					</div>
				</TabsContent>
				<TabsContent value="complemento">
					Change your password here.
				</TabsContent>
			</Tabs>
		</div>
	);
}
