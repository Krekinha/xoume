import type { inferServerActionError, TNoInputHandlerFunc } from "zsa";
import LoadingSkeleton from "../ui/LoadingSkeleton";
import type { ErrorResponse } from "@/utils/types";
import { useRef, type ReactNode } from "react";

/**
 * Esse componente provê o efeito visual para o status
 * de uma consulta usando react-query
 * @author Krekinha
 * @version 1.0
 */

interface QueryStatusProps {
	isRefetching?: boolean;
	isError: boolean;
	isLoading: boolean;
	loadingNode?: ReactNode;
	error:
		| inferServerActionError<
				TNoInputHandlerFunc<
					Promise<any>,
					undefined,
					undefined,
					"ShapeErrorNotSet",
					undefined,
					false
				>
		  >
		| null
		| ErrorResponse;
}
export default function QueryStatus({
	isRefetching,
	isError,
	isLoading,
	loadingNode,
	error,
}: QueryStatusProps) {
	const refDiv = useRef<HTMLDivElement>(null);

	function hide() {
		const elem = refDiv.current;
		if (elem) {
			elem.style.display = "none";
		}
	}
	return (
		<>
			{isRefetching && <div className="loader" />}
			{isLoading && (loadingNode ? loadingNode : <LoadingSkeleton model={1} />)}
			{isError && (
				<div
					id="error-message-container"
					ref={refDiv}
					className=" rounded-lg bg-red-600/80 text-white p-3 relative"
				>
					{error?.message}
					<button
						onClick={hide}
						className="absolute top-1 right-1 p-1 cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<title>Fechar janela</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={3}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			)}
		</>
	);
}
