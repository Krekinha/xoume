import { ErrorBoundary } from "react-error-boundary";
import { FallbackFetch } from "./transportes/FallbackFetch";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { TransportesList } from "./transportes/TransportesList";
import { getTransportes } from "@/server/TransporteActions";
import TransporteNavbar from "@/components/transmanager/TransporteNavbar";

export default async function Page() {
	const transportes = await getTransportes();

	return (
		<>
			<TransporteNavbar />
			{/* em telas sm a margem recua 256px apartir da esquerda para entrada do sidebar */}
			<div className="p-4">
				<ErrorBoundary FallbackComponent={FallbackFetch}>
					<Suspense fallback={<LoadingSkeleton model={1} />}>
						<TransportesList transportes={transportes} />
					</Suspense>
				</ErrorBoundary>
			</div>
		</>
	);
}
