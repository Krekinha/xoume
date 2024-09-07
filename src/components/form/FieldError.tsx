import type { ResponseAction } from "@/utils/types";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface FieldErrorProps {
	field: string;
	errors: FieldErrors<FieldValues>;
}
export function FieldError({ field, errors }: FieldErrorProps) {
	const exampleErrors = {
		empresaId: {
			message: "Selecione uma opção válida",
			type: "too_small",
			ref: { name: "empresaId" },
		},
		notas: [
			{ message: "Número informado inválido", type: "invalid_type" },
			{ message: "Número informado inválido", type: "invalid_type" },
			{ message: "Número informado inválido", type: "invalid_type" },
		],
	};

	// const getErrorMessage = (
	// 	errorsArray: Array<{ message: string }>,
	// ): string | undefined => {
	// 	if (Array.isArray(errorsArray)) {
	// 		return errorsArray[0]?.message || undefined;
	// 	}
	// 	return errorsArray?.message || undefined;
	// };

	const getErrorMessage = (errorsArray: any) => {
		if (Array.isArray(errorsArray)) {
			return errorsArray[0] || undefined;
		}
		return errorsArray || undefined;
	};

	const errorMessage = getErrorMessage(errors[field]);

	console.log(errors);
	console.log(errors["notas"]);
	console.log(errorMessage);

	//const erro = errors[field]?.message?.toString();

	return (
		<>
			{errorMessage && (
				<p className="text-red-600 ml-1 text-xs">{errorMessage}</p>
			)}
			{/* {erro && (
				<>
					<p className="text-red-600 ml-1 text-xs">{erro}</p>
				</>
			)} */}
		</>
	);
}

// const FormMessage = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className, children, ...props }, ref) => {
//   const { error, formMessageId } = useFormField()
//   const body = error ? String(error?.message) : children

//   if (!body) {
//     return null
//   }

//   return (
//     <p
//       ref={ref}
//       id={formMessageId}
//       className={cn("text-[0.8rem] font-medium text-destructive", className)}
//       {...props}
//     >
//       {body}
//     </p>
//   )
// })
