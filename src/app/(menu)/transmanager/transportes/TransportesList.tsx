"use client";
import type { Transporte } from "@/utils/types";
import { TransporteListItem } from "@/components/TransporteListItem";
import { MdFactory } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { RiWeightFill } from "react-icons/ri";
import { PiInvoiceBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { getTransportes } from "@/lib/utils";

export async function TransportesList() {
	//const transportes = await getTransportes();
	// const { data, error } = useQuery({
	// 	queryKey: ["transportes"],
	// 	queryFn: getTransportes,
	// 	initialData: transportes,
	// });

	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/transportes`, {
		cache: "no-store",
	});

	const responseObj = await res.json();

	const transportes = responseObj.transportes;

	const { data, error } = useQuery({
		queryKey: ["transportes"],
		queryFn: getTransportes,
		initialData: transportes,
	});

	//if (error) <h2>{error.message}</h2>;
	//if (data)
	return (
		<div className="space-y-3">
			{transportes?.map((transporte: Transporte) => (
				<ul key={transporte.id}>
					<TransporteListItem.Root>
						<TransporteListItem.Header>
							<TransporteListItem.Empresa
								empresa={transporte.empresa?.razaoNome}
							/>
							<TransporteListItem.Menu transporte={transporte} />
						</TransporteListItem.Header>

						<TransporteListItem.Content>
							<TransporteListItem.Motorista
								motorista={transporte.motorista?.nome}
							/>
							<TransporteListItem.Origem
								cidadeOrigem={transporte.cidade_origem}
								ufOrigem={transporte.uf_origem}
							/>
							<TransporteListItem.Destino
								cidadeDestino={transporte.cidade_destino}
								ufDestino={transporte.uf_destino}
							/>
						</TransporteListItem.Content>

						<TransporteListItem.Footer>
							<TransporteListItem.Tag
								tag={transporte.tomador?.razaoNome}
								icon={MdFactory}
								title="Tomador"
							/>
							<TransporteListItem.Tag
								tag={transporte.notas?.join("/")}
								icon={FaFileAlt}
								title="Notas fiscais"
							/>
							<TransporteListItem.Tag
								tag={transporte.cte?.toString()}
								title="CTe"
							/>
							<TransporteListItem.Tag
								tag={transporte.peso?.toString()}
								icon={RiWeightFill}
								title="Peso"
							/>
							<TransporteListItem.Tag
								tag={transporte.val_tonelada?.toString()}
								icon={PiInvoiceBold}
								title="Valor por tonelada"
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
			))}
		</div>
	);
}
