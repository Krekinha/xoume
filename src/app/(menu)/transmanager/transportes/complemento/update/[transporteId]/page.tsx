import { ErrorBoundary } from "react-error-boundary";
import { FallbackFetch } from "../../../FallbackFetch";
import ComplementoAddNavbar from "@/components/transmanager/ComplementoAddNavbar";
import { FormUpdateComplemento } from "@/components/transmanager/FormUpdateComplemento";

export default function Page({ params }: { params: { transporteId: string } }) {
	console.log(params.transporteId);

	return (
		<div className="flex h-full max-h-screen flex-col items-center ">
			<ComplementoAddNavbar />
			<ErrorBoundary FallbackComponent={FallbackFetch}>
				<FormUpdateComplemento transporteId={params.transporteId} />
			</ErrorBoundary>
		</div>
	);
}
