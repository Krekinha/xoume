import { z } from "zod";

export const transporteSchema = z.object({
	empresaId: z.coerce
		.number({
			message: "Campo obrigatório",
		})
		.positive({
			message: "O número deve ser positivo",
		}),
	motoristaId: z.coerce
		.number({ message: "Campo obrigatório" })
		.positive({ message: "O número deve ser positivo" }),
	tomadorId: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.positive({ message: "O número deve ser positivo" })
		.optional(),
	uf_origem: z
		.string({ message: "UF: O valo esperado é uma string" })
		.optional(),
	cidade_origem: z
		.string({ message: "Cidade: O valo esperado é uma string" })
		.toUpperCase()
		.optional(),
	uf_destino: z
		.string({ message: "UF: O valo esperado é uma string" })
		.optional(),
	cidade_destino: z
		.string({ message: "Cidade: O valo esperado é uma string" })
		.toUpperCase()
		.optional(),
	notas: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.positive({ message: "O número deve ser positivo" })
		.array()
		.optional(),
	cte: z.coerce

		.number({ message: "O valor deve ser um número válido" })
		.transform((val) => {
			if (val === 0) {
				return null;
			}
			return val;
		})
		.superRefine((val, ctx) => {
			if (val !== null && val !== undefined && val < 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser positivo",
				});
			}
		})
		.nullable()
		.optional(),
});
