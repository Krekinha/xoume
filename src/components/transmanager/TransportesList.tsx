"use client";
import type { Transporte } from "@/utils/types";
import { MdFactory } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { RiWeightFill } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { PercentCircle } from "lucide-react";
import { TransporteListItem } from "@/components/transmanager/TransporteListItem";
import { useServerActionQuery } from "@/lib/server-action-hooks";
import { getTransportes } from "@/server/TransporteActions";
import QueryStatus from "@/components/main/QueryStatus";
import { formatCurrency, formatDecimal } from "@/utils/format";
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
		return 0;
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
											empresa={transporte.empresa?.razaoNome}
										/>
									</TransporteListItem.HeaderStart>
									<TransporteListItem.HeaderEnd>
										<TransporteListItem.Menu transporte={transporte} />
									</TransporteListItem.HeaderEnd>
								</TransporteListItem.Header>

								<TransporteListItem.Content>
									<div className="flex flex-row gap-2 justify-between">
										<div className="flex gap-2 items-center">
											<TransporteListItem.CTe
												cte={transporte?.cte?.toString()}
											/>
											<Separator
												orientation="vertical"
												className="bg-gray-600 w-[1px] h-[0.5rem]"
											/>
											<TransporteListItem.Tag
												tag={transporte.notas?.join("/")}
												icon={FaFileAlt}
												title="Notas fiscais"
												className="text-xs truncate"
											/>
										</div>
										<TransporteListItem.ValCTe transporte={transporte} />
									</div>
									<div className="flex gap-1 items-center">
										<TransporteListItem.Motorista
											motorista={transporte.motorista?.nome}
										/>
										<Separator
											orientation="vertical"
											className="bg-gray-600 w-[1px] mx-1 h-[0.5rem]"
										/>
										<TransporteListItem.Origem
											cidadeOrigem={transporte.cidade_origem}
											ufOrigem={transporte.uf_origem}
										/>
										<TransporteListItem.Destino
											cidadeDestino={transporte.cidade_destino}
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
										tag={formatDecimal(transporte.peso?.toString())}
										icon={RiWeightFill}
										title="Peso"
									/>
									<TransporteListItem.Tag
										tag={formatCurrency(transporte.val_tonelada?.toString())}
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
											).toString(),
										)}
										icon={PercentCircle}
										title="Valor do ICMS"
									/>
								</TransporteListItem.Footer>

								<TransporteListItem.Complemento
									complemento={transporte.cteComplementar}
								>
									<TransporteListItem.Tag
										tag={transporte.cteComplementar?.cte?.toString()}
										title="CTe"
									/>

									<TransporteListItem.Tag
										tag={transporte.cteComplementar?.peso?.toString()}
										icon={RiWeightFill}
										title="Peso"
									/>

									<TransporteListItem.Tag
										tag={transporte.cteComplementar?.val_tonelada?.toString()}
										icon={PiInvoiceBold}
										title="Valor por tonelada"
									/>

									<TransporteListItem.Tag
										tag={transporte.cteComplementar?.val_frete?.toString()}
										icon={PiInvoiceBold}
										title="Valor total do frete"
									/>

									<TransporteListItem.Tag
										tag={transporte.cteComplementar?.val_cte?.toString()}
										icon={PiInvoiceBold}
										title="Valor do CTe"
									/>

									<TransporteListItem.Tag
										tag={transporte.cteComplementar?.aliquota_icms?.toString()}
										icon={PiInvoiceBold}
										title="Alíquota ICMS"
									/>

									<TransporteListItem.Tag
										tag={transporte.cteComplementar?.val_icms?.toString()}
										icon={PiInvoiceBold}
										title="Valor do ICMS"
									/>
								</TransporteListItem.Complemento>
							</TransporteListItem.Root>
						</ul>
					))
				: ""}
		</div>
	);
}
