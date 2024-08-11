import type { ResponseAction } from "@/utils/types";

interface FieldErrorProps {
	field: string;
	state: ResponseAction;
}
export function FieldError({ field, state }: FieldErrorProps) {
	const erro = state?.errors
		?.filter((item) => {
			return item.path.includes(field);
		})
		.map((item) => item.message);
	return (
		<>
			{erro && (
				<>
					<p className="text-red-600 ml-1 text-xs">{erro}</p>
				</>
			)}
		</>
	);
}
