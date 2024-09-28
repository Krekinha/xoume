import { ErrorBoundary } from "react-error-boundary";
import { FallbackFetch } from "../../../FallbackFetch";
import ComplementoAddNavbar from "@/components/transmanager/ComplementoAddNavbar";
import { FormAddComplemento } from "@/components/transmanager/FormAddComplemento";

export default function Page({ params }: { params: { transporteId: number } }) {
	console.log(params.transporteId);

	return (
		<div className="flex h-full max-h-screen flex-col items-center ">
			<ComplementoAddNavbar />
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<FormAddComplemento transporteId={params.transporteId} />
			</ErrorBoundary>
		</div>
	);
}
