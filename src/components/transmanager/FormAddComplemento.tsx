"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import type { z, ZodError } from "zod";
import type React from "react";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { useModalDialogContext } from "@/providers/ModaDialogProvider";
import type { complementoSchema } from "@/utils/schemas";
import { DecimalInputField } from "../form/DecimalInputField";
import { NumberInputField } from "../form/NumberInputField";
import { DatePickerField } from "../form/DatePickerField";
import { addComplemento } from "@/server/ComplementoActions";

interface FormAddComplementoProps {
	id: number;
}

export function FormAddComplemento({ id }: FormAddComplementoProps) {
	// const { data: empresas } = useServerActionQuery(getEmpresas, {
	// 	input: undefined,
	// 	queryKey: ["getEmpresas"],
	// });

	const { execute } = useServerAction(addComplemento);
	const { setModalDialog } = useModalDialogContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const router = useRouter();

	const { control, handleSubmit, setValue, getValues } = useForm<
		z.infer<typeof complementoSchema>
	>({
		defaultValues: {
			cte: undefined,
			peso: undefined,
			val_tonelada: undefined,
			val_cte: undefined,
			reducao_bc_icms: undefined,
			aliquota_icms: undefined,
		},
	});

	function onClose(data: unknown) {
		if (data) {
			router.push("/transmanager");
			console.log("indo para /transmanager");
		}
	}

	function transformValues(values: any) {
		const transformedValues = { ...values };

		transformedValues.transporteId = id;

		if (transformedValues.peso) {
			transformedValues.peso = transformedValues.peso
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.val_tonelada) {
			transformedValues.val_tonelada = transformedValues.val_tonelada
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.val_cte) {
			console.log(transformedValues.val_cte);
			transformedValues.val_cte = transformedValues.val_cte
				.toString()
				.replace(",", ".");
		} else if (transformedValues.val_cte === "") {
			console.log("val_cte é vazio");
			transformedValues.val_cte = undefined;
		}

		if (transformedValues.reducao_bc_icms) {
			transformedValues.reducao_bc_icms = transformedValues.reducao_bc_icms
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.aliquota_icms) {
			transformedValues.aliquota_icms = transformedValues.aliquota_icms
				.toString()
				.replace(",", ".");
		}

		return transformedValues;
	}

	async function onSubmit(values: z.infer<typeof complementoSchema>) {
		console.log(values);
		const newValues = transformValues(values) as z.infer<
			typeof complementoSchema
		>;
		console.log(newValues);

		const [data, err] = await execute(newValues);

		console.log(data);
		console.log(err);

		if (err) {
			if (err.code === "NOT_AUTHORIZED") {
				// Handle not authorized error
			} else if (err.code === "INPUT_PARSE_ERROR") {
				const zodError = JSON.parse(err?.data) as ZodError;
				console.log(zodError.issues);
				setFieldErrors(zodError.issues);
			} else {
				setModalDialog({
					open: true,
					data: data ? data : null,
					error: err
						? { code: err.code, name: err.name, message: err.message }
						: undefined,
					onClose: () => onClose(data),
				});
			}
		} else {
			setFieldErrors({});
			setModalDialog({
				open: true,
				data: data ? data : null,
				error: undefined,
				onClose: () => onClose(data),
			});
		}
	}

	return (
		<div className="h-full w-full flex flex-col overflow-y-auto">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col w-full p-4 gap-3 dark:bg-[#191c1f] ">
					<div className="grid grid-flow-col grid-cols-2 gap-3">
						<NumberInputField
							name="cte"
							label="CTe"
							placeholder="Digite um número"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
						<DecimalInputField
							name="peso"
							label="Peso"
							placeholder="Digite um número"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
					</div>
					<div className="grid grid-flow-col grid-cols-2 gap-3">
						<DecimalInputField
							name="val_tonelada"
							label="Val/Ton"
							placeholder="Digite um valor"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
						<DecimalInputField
							name="val_cte"
							label="Val. CTe"
							placeholder="Digite um valor"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
					</div>
					<div className="grid grid-flow-col grid-cols-3 gap-3 items-center">
						<DecimalInputField
							name="reducao_bc_icms"
							label="Redução BC ICMS"
							placeholder="Digite um número"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
						<DecimalInputField
							name="aliquota_icms"
							label="Aliq. ICMS"
							placeholder="Digite um valor"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
						<DatePickerField
							name="emissao_cte"
							label="Emissão CTe"
							placeholder="Selecione uma data"
							control={control}
							fieldErrors={fieldErrors}
							setValue={setValue}
						/>
					</div>

					<div className="flex justify-center self-end mt-5 gap-2">
						<Button
							type="button"
							onClick={() => router.push("/transmanager")}
							className="bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:text-white shadow-sm dark:shadow-black/90"
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							className="bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white shadow-sm dark:shadow-black/90"
						>
							Enviar
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
