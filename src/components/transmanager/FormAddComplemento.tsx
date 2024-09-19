"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import type { z, ZodError } from "zod";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useServerAction } from "zsa-react";
import type { complementoSchema } from "@/utils/schemas";
import { DecimalInputField } from "../form/DecimalInputField";
import { NumberInputField } from "../form/NumberInputField";
import { DatePickerField } from "../form/DatePickerField";
import { addComplemento } from "@/server/ComplementoActions";
import { useServerActionQuery } from "@/hooks/server-action-hooks";
import { getTransporteById } from "@/server/TransporteActions";
import { formatCurrency, formatDecimal } from "@/utils/format";
import type { Decimal } from "@prisma/client/runtime/library";
import { cn } from "@/lib/utils";
import CopyToClipboard from "../main/CopyToClipboard";
import { useMainDialogContext } from "@/providers/MainDialogProvider";
import {
	ErrorDialogContent,
	SuccessDialogContent,
} from "./MessageDialogContent";

interface FormAddComplementoProps {
	transporteId: number;
}

export function FormAddComplemento({ transporteId }: FormAddComplementoProps) {
	const refValCte = useRef<HTMLInputElement>(null);

	const { data: transporte } = useServerActionQuery(getTransporteById, {
		input: { id: transporteId },
		queryKey: ["getTransporteById", transporteId.toString()],
	});
	console.log(transporte);
	const { execute } = useServerAction(addComplemento);
	const { setMainDialog } = useMainDialogContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const router = useRouter();

	const { control, handleSubmit, setValue, getValues, getFieldState } = useForm<
		z.infer<typeof complementoSchema>
	>({
		defaultValues: {
			cte: undefined,
			peso: undefined,
			val_cte: undefined,
			reducao_bc_icms: undefined,
			aliquota_icms: undefined,
		},
	});

	const pesoFieldValue = useWatch({
		control,
		name: "peso",
	});

	const valCteFieldValue = useWatch({
		control,
		name: "val_cte",
	});

	const isEqualValCte = () => {
		if (!valCteFieldValue || !valCtePrevision()) return false;
		const ctePrevision = valCtePrevision();
		const cteWatch = Number.parseFloat(
			valCteFieldValue.toString().replace(",", "."),
		);
		console.log(ctePrevision);
		console.log(cteWatch);
		if (ctePrevision === cteWatch) {
			return true;
		}
		return false;
	};

	function freteTotal() {
		if (!pesoFieldValue || !transporte?.val_tonelada) return 0;

		const val_peso = Number.parseFloat(pesoFieldValue.toString()) / 1000;
		return val_peso * Number(transporte.val_tonelada);
	}

	function valCtePrevision(): number {
		if (!freteTotal() || !transporte?.val_cte) return 0;

		const previsao = freteTotal() - Number(transporte.val_cte);
		return Number(previsao.toFixed(2));
	}

	function onClose(data: unknown) {
		if (data) {
			router.push("/transmanager");
			console.log("indo para /transmanager");
		}
	}

	function transformValues(values: any) {
		const transformedValues = { ...values };

		console.log(transporte);
		transformedValues.transporteId = transporteId;

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
				setMainDialog({
					open: true,
					content: (
						<ErrorDialogContent
							title={`${err.code}: (${err.name})`}
							message={err.message}
						/>
					),
					onClose: () => onClose(data),
				});
			}
		} else {
			setFieldErrors({});
			setMainDialog({
				open: true,
				content: (
					<SuccessDialogContent message="Complemento adicionado com sucesso" />
				),
				onClose: () => onClose(data),
			});
		}
	}

	return (
		<div className="h-full w-full flex flex-col overflow-y-auto">
			<div className="flex flex-col border border-gray-600 rounded-md p-2 m-4 gap-2">
				<div className="flex flex-row gap-2">
					<span className="text-amber-500 text-sm gap-1 flex">
						Peso:
						<span className="text-sm text-gray-400">
							{pesoFieldValue ?? "?"}
						</span>
					</span>

					<span className="text-sm text-blue-600">x</span>

					<span className="text-amber-500 text-sm gap-1 flex">
						Val/Ton:
						<span className="text-sm text-gray-400">
							{transporte?.val_tonelada ?? "?"}
						</span>
					</span>

					<span className="text-sm text-blue-600">=</span>
					<span className="text-sm">
						{freteTotal() > 0 ? formatCurrency(freteTotal().toString()) : "?"}
					</span>
				</div>

				<span className="text-sm text-amber-500">
					Val. CTe Anterior:{" "}
					<span id="teste" className="text-sm text-gray-400">
						{formatCurrency(transporte?.val_cte) ?? "?"}
					</span>
				</span>

				<div className="flex flex-row gap-2">
					<span className="text-sm text-amber-500 flex gap-1">
						Val. CTe Previsto:
						<span
							className={`text-sm ${
								isEqualValCte() ? "text-green-600" : "text-red-500"
							}`}
						>
							{valCtePrevision() > 0
								? formatCurrency(valCtePrevision().toString())
								: "?"}
						</span>
					</span>
					<button
						disabled={valCtePrevision() === 0}
						type="button"
						onClick={() => setValue("val_cte", valCtePrevision())}
						className={cn(
							"px-2 rounded-md",
							"bg-green-700 dark:bg-green-700 dark:hover:bg-green-600",
							"dark:text-white shadow-sm dark:shadow-black/90 text-xs",
							"disabled:bg-gray-400 disabled:dark:bg-gray-400 disabled:hover:bg-gray-400",
							" disabled:dark:hover:bg-gray-400 disabled:opacity-50",
						)}
					>
						Aplicar
					</button>
				</div>
			</div>
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

					<div className="grid grid-flow-col grid-cols-2 gap-3 items-center">
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
							defaultValue=""
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
					</div>

					<div className="grid grid-flow-col grid-cols-2 gap-3">
						<DecimalInputField
							name="val_cte"
							label="Val. CTe"
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
