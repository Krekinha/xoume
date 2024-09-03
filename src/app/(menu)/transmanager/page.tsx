import { ErrorBoundary } from "react-error-boundary";
import { FallbackFetch } from "./transportes/FallbackFetch";
import { TransportesList } from "./transportes/TransportesList";
import TransporteNavbar from "@/components/transmanager/TransporteNavbar";

export default async function Page() {
	return (
		<div className="flex h-full max-h-screen flex-col items-center overflow-y-auto">
			<TransporteNavbar />
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<TransportesList />
			</ErrorBoundary>
		</div>
	);
}
