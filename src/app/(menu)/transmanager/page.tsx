import { ErrorBoundary } from "react-error-boundary";
import { DialogAddTransporte } from "./transportes/DialogAddTransporte";
import { FallbackFetch } from "./transportes/FallbackFetch";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { TransportesList } from "./transportes/TransportesList";
import {
	getTransportes,
	getEmpresas,
	getMotoristas,
	getTomadores,
} from "@/server/TransporteActions";
import { ToggleAddTransporte } from "@/components/ToggleAddTransporte";

export default async function Page() {
	const transportes = await getTransportes();
	const empresas = await getEmpresas();
	const motoristas = await getMotoristas();
	const tomadores = await getTomadores();

	console.log(tomadores);
	return (
		<>
			<nav className="navbar p-4 sm:ml-64 fixed top-0 w-full mt-11 py-2 shadow-sm bg-white dark:bg-zinc-900">
				{/* <DialogAddTransporte
					empresas={empresas}
					motoristas={motoristas}
					tomadores={tomadores}
				/> */}

				<ToggleAddTransporte
					empresas={empresas}
					motoristas={motoristas}
					tomadores={tomadores}
				/>

				<span className="ml-2 text-sm dark:text-green-300">
					Novo transporte
				</span>
			</nav>
			{/* em telas sm a margem recua 256px apartir da esquerda para entrada do sidebar */}
			<div className="p-4 sm:ml-64 mt-20">
				<ErrorBoundary FallbackComponent={FallbackFetch}>
					<Suspense fallback={<LoadingSkeleton model={1} />}>
						<TransportesList transportes={transportes} />
					</Suspense>
				</ErrorBoundary>
			</div>
		</>
	);
}
