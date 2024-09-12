import { FormAddTransporte } from "@/components/transmanager/FormAddTransporte";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackFetch } from "../FallbackFetch";
import TransporteAddNavbar from "@/components/transmanager/TransporteAddNavbar";

export default function Page() {
	return (
		<div className="flex h-full max-h-screen flex-col items-center ">
			<TransporteAddNavbar />
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<FormAddTransporte />
			</ErrorBoundary>
		</div>
	);
}
