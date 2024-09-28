"use client";
import type { Transporte } from "@/utils/types";
import { MdFactory } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { RiWeightFill } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { PercentCircle, Calendar } from "lucide-react";
import { TransporteListItem } from "@/components/transmanager/TransporteListItem";
import { useServerActionQuery } from "@/hooks/server-action-hooks";
import { getTransportes } from "@/server/TransporteActions";
import QueryStatus from "@/components/main/QueryStatus";
import {
	formatarData,
	formatarDataHora,
	formatCurrency,
	formatDecimal,
	formatPercent,
} from "@/utils/format";
import { Separator } from "@/components/ui/separator";
import type { Decimal } from "@prisma/client/runtime/library";

export function TransportesList() {
	const { isLoading, isRefetching, isSuccess, isError, error, data } =
		useServerActionQuery(getTransportes, {
			input: undefined,
			queryKey: ["getTransportes"],
		});

	const valIcms = (
		val_cte: Decimal | undefined,
		aliquota_icms: Decimal | undefined,
		reducao_bc_icms: Decimal | undefined,
	) => {
		if (val_cte && aliquota_icms) {
			const valCteNum = Number(val_cte);
			const bc = reducao_bc_icms
				? valCteNum * (1 - Number(reducao_bc_icms) / 100)
				: valCteNum;
			const val_icms = bc * (Number(aliquota_icms) / 100);
			return val_icms;
		}
		return null;
	};

	const titleAliqIcms = (
		aliquota_icms: Decimal | undefined,
		reducao_bc_icms: Decimal | undefined,
	) => {
		const val_alq = `Aliq: ${formatPercent(aliquota_icms?.toString())}`;
		const val_red = `Red. bc: ${formatPercent(reducao_bc_icms?.toString())}`;
		return `${val_alq}\n${val_red}`;
	};
	return (
		<div className="h-full max-h-screen w-full space-y-3 overflow-y-auto p-4 overflow-x-hidden">
			<QueryStatus
				isLoading={isLoading}
				isRefetching={isRefetching}
				isError={isError}
				error={error}
			/>
			{isSuccess
				? data?.map((transporte: Transporte) => (
						<ul key={transporte.id}>
							<TransporteListItem.Root>
								<TransporteListItem.Header>
									<TransporteListItem.HeaderStart>
										<TransporteListItem.Empresa
											empresa={
												transporte.empresa?.razaoNome
											}
										/>
									</TransporteListItem.HeaderStart>
									<TransporteListItem.HeaderEnd>
										<span
											title="Data da criação"
											className="text-[0.7rem] text-gray-500"
										>
											{formatarDataHora(
												transporte.criadoEm,
											)}
										</span>
										<TransporteListItem.Menu
											transporte={transporte}
										/>
									</TransporteListItem.HeaderEnd>
								</TransporteListItem.Header>

								<TransporteListItem.Content>
									<div className="flex flex-row gap-2 justify-between">
										<div className="flex gap-2 items-center">
											<TransporteListItem.CTe
												cte={transporte?.cte?.toString()}
											/>
											{transporte.cte &&
												transporte?.notas && (
													<Separator
														orientation="vertical"
														className="bg-gray-600 w-[1px] mx-1 h-[0.5rem]"
													/>
												)}
											<TransporteListItem.Tag
												tag={transporte.notas?.join(
													"/",
												)}
												icon={FaFileAlt}
												title="Notas fiscais"
												className="text-xs truncate"
											/>
										</div>
										<TransporteListItem.ValCTe
											transporte={transporte}
										/>
									</div>
									<div className="flex gap-1 items-center">
										<TransporteListItem.Motorista
											motorista={
												transporte.motorista?.nome
											}
										/>
										{transporte.cidade_origem && (
											<Separator
												orientation="vertical"
												className="bg-gray-600 w-[1px] mx-1 h-[0.5rem]"
											/>
										)}
										<TransporteListItem.Origem
											cidadeOrigem={
												transporte.cidade_origem
											}
											ufOrigem={transporte.uf_origem}
										/>
										<TransporteListItem.Destino
											cidadeDestino={
												transporte.cidade_destino
											}
											ufDestino={transporte.uf_destino}
										/>
									</div>
								</TransporteListItem.Content>

								<TransporteListItem.Footer>
									<TransporteListItem.Tag
										tag={transporte.tomador?.razaoNome}
										icon={MdFactory}
										title="Tomador"
									/>

									<TransporteListItem.Tag
										tag={formatDecimal(
											transporte.peso?.toString(),
										)}
										icon={RiWeightFill}
										title="Peso"
									/>
									<TransporteListItem.Tag
										tag={formatCurrency(
											transporte.val_tonelada?.toString(),
										)}
										icon={PiInvoiceBold}
										title="Valor por tonelada"
										other="/ton."
									/>

									<TransporteListItem.Tag
										tag={formatCurrency(
											valIcms(
												transporte?.val_cte,
												transporte?.aliquota_icms,
												transporte?.reducao_bc_icms,
											)?.toString(),
										)}
										icon={PercentCircle}
										title={titleAliqIcms(
											transporte.aliquota_icms,
											transporte.reducao_bc_icms,
										)}
									/>
									<TransporteListItem.Tag
										tag={formatarData(
											transporte.emissao_cte,
										)}
										icon={Calendar}
										title="Emissão"
									/>
								</TransporteListItem.Footer>

								<TransporteListItem.Complemento
									complemento={transporte.cteComplementar}
								>
									<div className="flex flex-row w-full gap-2 justify-between">
										<div className="flex gap-2 items-center flex-wrap">
											<TransporteListItem.CTe
												cte={transporte.cteComplementar?.cte?.toString()}
												className="text-sm font-semibold "
											/>

											<TransporteListItem.Tag
												tag={formatDecimal(
													transporte.cteComplementar?.peso?.toString(),
												)}
												icon={RiWeightFill}
												title="Peso"
												className="text-sm font-semibold "
											/>

											<TransporteListItem.Tag
												tag={formatCurrency(
													transporte.val_tonelada?.toString(),
												)}
												icon={PiInvoiceBold}
												title="Valor por tonelada"
												other="/ton."
												className="text-sm font-semibold"
											/>

											<TransporteListItem.Tag
												tag={formatCurrency(
													valIcms(
														transporte
															?.cteComplementar
															?.val_cte,
														transporte
															?.cteComplementar
															?.aliquota_icms,
														transporte
															?.cteComplementar
															?.reducao_bc_icms,
													)?.toString(),
												)}
												icon={PercentCircle}
												title={titleAliqIcms(
													transporte.cteComplementar
														?.aliquota_icms,
													transporte.cteComplementar
														?.reducao_bc_icms,
												)}
												className="text-sm font-semibold"
											/>

											<TransporteListItem.Tag
												tag={formatarData(
													transporte.cteComplementar
														?.emissao_cte,
												)}
												icon={Calendar}
												title="Emissão"
												className="text-sm font-semibold"
											/>
										</div>
										<TransporteListItem.ValCteComplementar
											transporte={transporte}
										/>
									</div>
								</TransporteListItem.Complemento>
							</TransporteListItem.Root>
						</ul>
					))
				: ""}
		</div>
	);
}
