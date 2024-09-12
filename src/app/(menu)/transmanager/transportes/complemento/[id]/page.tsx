import { ErrorBoundary } from "react-error-boundary";
import { FallbackFetch } from "../../FallbackFetch";
import ComplementoAddNavbar from "@/components/transmanager/ComplementoAddNavbar";
import { FormAddComplemento } from "@/components/transmanager/FormAddComplemento";

export default function Page({ params }: { params: { id: number } }) {
	return (
		<div className="flex h-full max-h-screen flex-col items-center ">
			<ComplementoAddNavbar />
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<FormAddComplemento id={params.id} />
			</ErrorBoundary>
		</div>
	);
}
