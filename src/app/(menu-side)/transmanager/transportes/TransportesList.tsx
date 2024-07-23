import { PiInvoiceBold } from "react-icons/pi";
import { RiWeightFill } from "react-icons/ri";
import { MdFactory } from "react-icons/md";
import { FaFileAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import type { Transporte } from "@/utils/types";
import { DropdownTransporte } from "./DropdownTransporte";

export const TransportesList = async () => {
	let transportes: Transporte[] = [];

	// `${process.env.API_TRANSMANAGER_URL}/transportes`)
	// "http://localhost:3333/transportes"
	const res = await fetch(`${process.env.API_TRANSMANAGER_URL}/transportes`, {
		cache: "no-store",
	});
	console.log(res);

	const responseObj = await res.json();

	transportes = responseObj.transportes;
	console.log(transportes);

	return (
		<div>
			{transportes.map((transporte: Transporte) => (
				<ul key={transporte.id}>
					<div className="grid grid-flow-row auto-rows-auto w-full my-3 rounded-lg border border-gray-200 bg-violet-50/30 p-1.5 shadow-sm-light shadow-gray-100">
						{/* EMPRESA */}
						<div className="grid grid-flow-col items-center">
							<div className="flex gap-2 items-center">
								<FaTruck className="text-blue-700" />
								<div className="text-[0.650rem] font-semibold">
									{transporte.empresa?.razaoNome}
								</div>
							</div>

							<div className="justify-self-end">
								<DropdownTransporte transporte={transporte} />
							</div>
						</div>

						{/* MOTORISTA */}
						<div className=" text-xs truncate text-gray-700/80 ml-6 mr-1">
							{transporte.motorista?.nome}
						</div>

						<div className="flex flex-row gap-2.5 items-center mt-3">
							{/* TOMADOR */}
							<div title="Tomador" className="flex items-center gap-1">
								<MdFactory className="text-gray-700 w-3 h-3" />
								<div className="text-[0.70rem] font-medium text-gray-500">
									{transporte.tomador?.razaoNome}
								</div>
							</div>

							{/* NOTA */}
							{transporte.nota && (
								<>
									<Separator orientation="vertical" className="bg-gray-200" />
									<div title="Nota fiscal" className="flex items-center gap-1 ">
										<FaFileAlt className="text-gray-700 w-3 h-3 " />
										<div className="text-[0.70rem] font-medium text-gray-500">
											{transporte.nota}
										</div>
									</div>
								</>
							)}

							{/* CTE */}
							{transporte.cte && (
								<>
									<Separator orientation="vertical" className="bg-gray-200" />
									<div title={"CT-e "} className="flex items-center gap-1 ">
										<div className="text-gray-700 w-4 h-3 text-[0.55rem] text-center font-extrabold">
											CTe
										</div>
										<div className="text-[0.70rem] font-medium text-gray-500">
											{transporte.cte}
										</div>
									</div>
								</>
							)}

							{/* PESO */}
							{transporte.peso && (
								<>
									<Separator orientation="vertical" className="bg-gray-200" />
									<div title="Cliente" className="flex items-center gap-1">
										<RiWeightFill className="text-gray-700 w-3 h-3" />
										<div className="text-[0.65rem] font-medium text-gray-500">
											{transporte.peso.toString()}
										</div>
									</div>
								</>
							)}

							{/* TONELADA/VALOR */}
							{transporte.val_tonelada && (
								<>
									<Separator orientation="vertical" className="bg-gray-200" />
									<div
										title="Valor/tonelada"
										className="flex items-center gap-1"
									>
										<PiInvoiceBold className="text-gray-700 w-3 h-3" />
										<div className="text-[0.65rem] font-medium text-gray-500">
											{transporte.val_tonelada.toString()}
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</ul>
			))}
		</div>
	);
};
