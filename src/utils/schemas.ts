import { z } from "zod";

export const transporteSchema = z.object({
	// id: z.string({
	// 	message: "Campo obrigatório",
	// }),
	empresaId: z
		.string({
			message: "Campo obrigatório",
		}),
	motoristaId: z
		.string({ message: "Campo obrigatório" }),
	tomadorId: z
		.string({ message: "O valor deve ser informado" })
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
		.superRefine((val, ctx) => {
			if (val !== null && val !== undefined && val <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser maior que 0",
				});
			}
		})
		.array()
		.optional(),
	cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			if (val !== null && val !== undefined && val <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser maior que 0",
				});
			}
		})
		.nullable()
		.optional(),
	peso: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			console.log({ peso: val });
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
	val_tonelada: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	val_cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			console.log(val);
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
	reducao_bc_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	aliquota_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	emissao_cte: z.coerce
		.date({ message: "O valor deve ser uma data válida" })
		.optional(),
});

export const transporteUpdateSchema = z.object({
	id: z.string({
		message: "Campo obrigatório",
	}),
	empresaId: z
		.string({
			message: "Campo obrigatório",
		}),
	motoristaId: z
		.string({ message: "Campo obrigatório" }),
	tomadorId: z
		.string({ message: "O valor deve ser infornado" })
		.optional(),
	uf_origem: z
		.string({ message: "UF: O valor esperado é uma string" })
		.nullable()
		.optional(),
	cidade_origem: z
		.string({ message: "Cidade: O valor esperado é uma string" })
		.toUpperCase()
		.nullable()
		.optional(),
	uf_destino: z
		.string({ message: "UF: O valor esperado é uma string" })
		.nullable()
		.optional(),
	cidade_destino: z
		.string({ message: "Cidade: O valo esperado é uma string" })
		.toUpperCase()
		.nullable()
		.optional(),
	notas: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			if (val !== null && val !== undefined && val <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser maior que 0",
				});
			}
		})
		.array()
		.nullable()
		.optional(),
	cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			if (val !== null && val !== undefined && val <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser maior que 0",
				});
			}
		})
		.nullable()
		.optional(),
	peso: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	val_tonelada: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	val_cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			console.log(val);
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
	reducao_bc_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	aliquota_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	emissao_cte: z.coerce
		.date({ message: "O valor deve ser uma data válida" })
		.nullable()
		.optional(),
});

export const complementoSchema = z.object({
	transporteId: z
		.string({
			message: "Campo obrigatório",
		}),
	cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			if (val !== null && val !== undefined && val <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser maior que 0",
				});
			}
		})
		.nullable()
		.optional(),
	peso: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	val_tonelada: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	val_cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
		}),
	reducao_bc_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	aliquota_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	emissao_cte: z.coerce
		.date({ message: "O valor deve ser uma data válida" })
		.optional(),
});

export const complementoUpdateSchema = z.object({
	id: z.string({
		message: "Campo obrigatório",
	}),
	transporteId: z
		.string({
			message: "Campo obrigatório",
		}),
	cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.superRefine((val, ctx) => {
			if (val !== null && val !== undefined && val <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser maior que 0",
				});
			}
		})
		.nullable()
		.optional(),
	peso: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	val_tonelada: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	val_cte: z.coerce
		.number({ message: "O valor deve ser um número válido" })
		.nullable()
		.optional()
		.superRefine((val, ctx) => {
			console.log({ val_cte: val });
			if (val === null) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: 1,
					type: "number",
					inclusive: true,
					message: "Campo obrigatório",
				});
			}

			if (val !== null && val !== undefined && val <= 0) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_big,
					maximum: 1,
					type: "number",
					inclusive: true,
					message: "O número deve ser maior que 0",
				});
			}
		}),
	reducao_bc_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	aliquota_icms: z.coerce
		.number({ message: "O valor deve ser um número válido" })
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
	emissao_cte: z.coerce
		.date({ message: "O valor deve ser uma data válida" })
		.optional(),
});
