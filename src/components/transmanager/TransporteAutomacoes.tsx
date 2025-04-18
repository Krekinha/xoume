"use client";

import type { Transporte } from "@/utils/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCopyright } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa"; 
import { formatCurrency, formatDecimal } from "@/utils/format";
import { TextToClipboard } from "./TextToClipboard";
import { notifyService } from "@/services/notifyService";
import { MdEmail } from "react-icons/md";

interface TransporteAutomacoesProps {
	transporte: Transporte;
}

export function TransporteAutomacoes({
	transporte,
}: TransporteAutomacoesProps) {
	const notasText =
		transporte.notas && transporte.notas.length > 1 ? "Notas" : "Nota";

	const valCoralCteA = () => {
		return `MARGEM PARA COMPLEMENTO = ${formatCurrency(
			transporte.val_cte?.toString(),
		)}`;
	};

	const valCoralCteB = () => {
		return `VALOR FRETE = PESO REAL ${notasText.toUpperCase()} ${transporte.notas?.join(
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

		return `COMPLEMENTO DO CTE ${transporte.cte}. VALOR FRETE = PESO REAL ${notasText.toUpperCase()} ${transporte.notas?.join(
			"/",
		)} (${formatDecimal(transporte.cteComplementar?.peso?.toString())}) x ${formatCurrency(
			transporte.val_tonelada?.toString(),
		)} = ${formatCurrency(valTransporte.toString())} - VALOR FRETE NO CTE ${transporte.cte} (${formatCurrency(transporte.val_cte?.toString())}) = ${formatCurrency(transporte.cteComplementar.val_cte?.toString())}`;
	};

	const valCTeWhatsApp = () => {
		return `Segue CT-e *${transporte.cte} (${notasText} ${transporte.notas?.join(
			"/",
		)})* + MANIFESTO - (${transporte.cidade_origem}-${
			transporte.uf_origem
		} x ${transporte.cidade_destino}-${transporte.uf_destino}) - ${
			transporte.tomador?.razaoNome
		} - *(${transporte.motorista?.nome})* - *${formatCurrency(transporte.val_cte?.toString())}*👇🏼`;
	};

	const valEmail = () => {
		// Get current hour to determine greeting
		const currentHour = new Date().getHours();
		let greeting = "Boa noite!";

		if (currentHour >= 0 && currentHour < 12) {
			greeting = "Bom dia!";
		} else if (currentHour >= 12 && currentHour < 18) {
			greeting = "Boa tarde!";
		}

		// Versão para exibição
		return `${greeting}<br><br>Segue:<br><br>- CTe <b>${transporte.cte} (${notasText} ${transporte.notas?.join("/")})</b><br>- Manifesto referente ao CTe <b>${transporte.cte}</b><br><br><br>Empresa: <b>${transporte.empresa?.razaoNome}</b>`;
	};

	const valEmailComplementar = () => {
		// Get current hour to determine greeting
		const currentHour = new Date().getHours();
		let greeting = "Boa noite!";

		if (currentHour >= 0 && currentHour < 12) {
			greeting = "Bom dia!";
		} else if (currentHour >= 12 && currentHour < 18) {
			greeting = "Boa tarde!";
		}

		// Versão para exibição
		return `${greeting}<br><br>Segue:<br><br>- CTe <b>${transporte.cteComplementar?.cte}</b> COMPLEMENTAR ao CTe <b>${transporte.cte} (${notasText} ${transporte.notas?.join("/")})</b><br>- Peso real informado: <b>${transporte.cteComplementar?.peso}</b> (conforme anexo)<br>- GNRE ICMS Frete (Comprovante de pagamento será enviado posteriormente)<br>- Comprovante pgto. GNRE ICMS Frete ref. CTe <b>${transporte.cteComplementar?.cte}</b><br><br><br>Empresa: <b>${transporte.empresa?.razaoNome}</b>`;
	};

	const valComplementoWhatsApp = () => {
		return `Segue CT-e *${transporte.cteComplementar?.cte}* COMPLEMENTAR ao CT-e *${transporte.cte} (${notasText} ${transporte.notas?.join(
			"/",
		)})* - (${transporte.cidade_origem}-${
			transporte.uf_origem
		} x ${transporte.cidade_destino}-${transporte.uf_destino}) - ${
			transporte.tomador?.razaoNome
		} - *(${transporte.motorista?.nome})* - *${formatCurrency(
			transporte.cteComplementar?.val_cte?.toString(),
		)}*👇🏼`;
	};

	async function copyTextToClipboard(text: string) {
		// Verificar se o Clipboard API está disponível
		if (!navigator.clipboard) {
			notifyService.error("Clipboard API não suportada. Usando fallback.");
			return;
		}
		try {
			// Criar o blob com o conteúdo HTML
			const htmlBlob = new Blob([text], { type: "text/html" });
			// Versão em texto simples (fallback)
			const plainBlob = new Blob([text.replace(/<[^>]*>/g, "")], {
				type: "text/plain",
			});

			// Criar o item para a área de transferência
			const clipboardItem = new ClipboardItem({
				"text/html": htmlBlob,
				"text/plain": plainBlob,
			});

			// Copiar para a área de transferência
			await navigator.clipboard.write([clipboardItem]);
			notifyService.success("Copiado para área de transferência!");

		} catch (err) {
			notifyService.error(`Erro ao copiar para a área de transferência: /n/ ${err}`);
			await navigator.clipboard.writeText(text.replace(/<[^>]*>/g, ""));
		}
	}

	return (
		<div className="flex flex-col gap-2 w-full">
			<Tabs defaultValue="cte" className="w-full">
				<TabsList>
					<TabsTrigger value="cte">CTe</TabsTrigger>
					<TabsTrigger value="complemento">Complemento</TabsTrigger>
				</TabsList>
				<TabsContent value="cte">
					<div className="flex flex-col gap-4 mt-3">
						{/* Coral A*/}
						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="Coral"
								icon={<FaCopyright className="text-gray-500" />}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value value={valCoralCteA()} />
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									copyData={() =>
										copyTextToClipboard(valCoralCteA())
									}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>

						{/* Coral B*/}
						<TextToClipboard.Root>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value value={valCoralCteB()} />
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									copyData={() =>
										copyTextToClipboard(valCoralCteB())
									}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>

						{/* WhatsApp */}
						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="WhatsApp"
								icon={
									<FaWhatsapp className="text-green-500" />
								}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value
									value={valCTeWhatsApp()}
								/>
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									copyData={() =>
										copyTextToClipboard(valCTeWhatsApp())
									}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>

						{/* Email */}
						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="Email"
								icon={
									<MdEmail className="text-blue-600" />
								}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value value={valEmail()} />
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									copyData={() =>
										copyTextToClipboard(valEmail())
									}
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
									copyData={() =>
										copyTextToClipboard(
											valCoralComplemento(),
										)
									}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>

						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="WhatsApp"
								icon={
									<FaWhatsapp className="text-green-500" />
								}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value
									value={valComplementoWhatsApp()}
								/>
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									copyData={() =>
										copyTextToClipboard(
											valComplementoWhatsApp(),
										)
									}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>

						{/* Email */}
						<TextToClipboard.Root>
							<TextToClipboard.Label
								label="Email"
								icon={
									<MdEmail className="text-blue-600" />
								}
							/>
							<TextToClipboard.ValueContainer>
								<TextToClipboard.Value value={valEmailComplementar()} />
								<TextToClipboard.CopyButton
									className="text-blue-700 hover:text-blue-500"
									copyData={() =>
										copyTextToClipboard(valEmailComplementar())
									}
								/>
							</TextToClipboard.ValueContainer>
						</TextToClipboard.Root>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
