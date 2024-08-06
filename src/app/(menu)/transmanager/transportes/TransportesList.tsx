import type { Transporte } from "@/utils/types";
import { TransporteListItem } from "@/components/TransporteListItem";

export const TransportesList = async () => {
	let transportes: Transporte[] = [];

	// `${process.env.API_TRANSMANAGER_URL}/transportes`)
	// "http://localhost:3333/transportes"
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/transportes`, {
		cache: "no-store",
	});
	//console.log(res);

	const responseObj = await res.json();

	transportes = responseObj.transportes;
	//console.log(transportes);

	return (
		<div className="space-y-3">
			{transportes.map((transporte: Transporte) => (
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
							<TransporteListItem.Tomador
								tomador={transporte.tomador?.razaoNome}
							/>
							<TransporteListItem.Notas notas={transporte.notas} />
							<TransporteListItem.Cte cte={transporte.cte} />
							<TransporteListItem.Peso peso={transporte.peso} />
							<TransporteListItem.ValTonelada
								valTonelada={transporte.val_tonelada}
							/>
						</TransporteListItem.Footer>
					</TransporteListItem.Root>
				</ul>
			))}
		</div>
	);
};
