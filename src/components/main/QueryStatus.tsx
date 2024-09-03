import type { inferServerActionError, TNoInputHandlerFunc } from "zsa";
import LoadingSkeleton from "../ui/LoadingSkeleton";

/**
 * Esse componente provê o efeito visual para o status
 * de uma consulta usando react-query
 * @author Krekinha
 * @version 1.0
 */

interface QueryStatusProps {
	isRefetching: boolean;
	isError: boolean;
	isLoading: boolean;
	error: inferServerActionError<
		TNoInputHandlerFunc<
			Promise<any>,
			undefined,
			undefined,
			"ShapeErrorNotSet",
			undefined,
			false
		>
	> | null;
}
export default function QueryStatus({
	isRefetching,
	isError,
	isLoading,
	error,
}: QueryStatusProps) {
	return (
		<>
			{isRefetching && <div className="loader" />}
			{isLoading && <LoadingSkeleton model={1} />}
			{isError && (
				<div className=" rounded-lg bg-red-600/80 text-white p-4">
					{error?.message}
				</div>
			)}
		</>
	);
}
