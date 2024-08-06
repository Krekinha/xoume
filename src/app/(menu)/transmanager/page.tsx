import { ErrorBoundary } from "react-error-boundary";
import { DialogAddTransporte } from "./transportes/DialogAddTransporte";
import { FallbackFetch } from "./transportes/FallbackFetch";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { TransportesList } from "./transportes/TransportesList";

export default function Page() {
	return (
		<>
			<nav className="navbar p-4 sm:ml-64 fixed top-0 w-full mt-11 py-2 shadow-sm bg-white">
				<DialogAddTransporte />
				<span className="ml-2 text-sm text-black">Novo transporte</span>
			</nav>
			{/* em telas sm a margem recua 256px apartir da esquerda para entrada do sidebar */}
			<div className="p-4 sm:ml-64 mt-20">
				<ErrorBoundary FallbackComponent={FallbackFetch}>
					<Suspense fallback={<LoadingSkeleton model={1} />}>
						<TransportesList />
					</Suspense>
				</ErrorBoundary>
			</div>
		</>
	);
}
