import {
	getEmpresas,
	getMotoristas,
	getTomadores,
} from "@/server/TransporteActions";
import { FormAddTransporte } from "./FormAddTransporte";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { FallbackFetch } from "../FallbackFetch";

export default async function Page() {
	const empresas = await getEmpresas();
	const motoristas = await getMotoristas();
	const tomadores = await getTomadores();
	return (
		<div className="p-4 sm:ml-64 mt-10">
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<Suspense fallback={<LoadingSkeleton model={1} />}>
					<FormAddTransporte
						empresas={empresas}
						motoristas={motoristas}
						tomadores={tomadores}
					/>
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
