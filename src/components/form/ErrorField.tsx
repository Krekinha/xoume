import type { ZodIssue } from "zod";

interface FieldErrorProps {
	field: string;
	errors: ZodIssue[];
}
export function ErrorField({ field, errors }: FieldErrorProps) {
	const exampleErrors = [
		{
			code: "too_small",
			minimum: 0,
			type: "number",
			inclusive: false,
			exact: false,
			message: "Selecione uma opção válida",
			path: ["empresaId"],
		},
		{
			code: "too_small",
			minimum: 0,
			type: "number",
			inclusive: false,
			exact: false,
			message: "Selecione uma opção válida",
			path: ["motoristaId"],
		},
		{
			code: "invalid_type",
			expected: "number",
			received: "nan",
			path: ["notas", 0],
			message: "Expected number, received nan",
		},
	];

	const errorArr: ZodIssue[] = [];

	if (Array.isArray(errors)) {
		errors.map((erro) => {
			if (erro.path.length > 0) {
				errorArr.push(erro);
			}
		});
	}

	const erro = errorArr.find((c) => c.path.includes(field)) ?? null;

	return (
		<>{erro && <p className="text-[#f02424] ml-1 text-xs">{erro.message}</p>}</>
	);
}
