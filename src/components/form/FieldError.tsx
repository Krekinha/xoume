import type { ResponseAction } from "@/utils/types";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface FieldErrorProps {
	field: string;
	errors: FieldErrors<FieldValues>;
}
export function FieldError({ field, errors }: FieldErrorProps) {
	const someErrors = {
		empresaId: {
			message: "Expected number, received nan",
			type: "invalid_type",
		},
		motoristaId: {
			message: "Expected number, received nan",
			type: "invalid_type",
		},
	};

	//console.log(errors);
	const erro = errors[field]?.message?.toString();

	// ?.filter((item) => {
	// 	return item.path.includes(field);
	// })
	// .map((item) => item.message);
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
