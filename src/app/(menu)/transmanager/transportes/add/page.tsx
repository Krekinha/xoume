import { FormAddTransporte } from "./FormAddTransporte";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { FallbackFetch } from "../FallbackFetch";
import { getEmpresas } from "@/server/EmpresaActions";
import { getMotoristas } from "@/server/MotoristaActions";
import { getTomadores } from "@/server/TomadorActions";

export default async function Page() {
	const empresas = await getEmpresas();
	const motoristas = await getMotoristas();
	const tomadores = await getTomadores();
	return (
		<>
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<Suspense fallback={<LoadingSkeleton model={1} />}>
					<FormAddTransporte
						empresas={empresas}
						motoristas={motoristas}
						tomadores={tomadores}
					/>
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
