import { FormAddTransporte } from "@/components/transmanager/FormAddTransporte";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackFetch } from "../FallbackFetch";

export default async function Page() {
	return (
		<>
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<FormAddTransporte />
			</ErrorBoundary>
		</>
	);
}
