"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import type { z, ZodError } from "zod";
import { useRef, useState } from "react";
import { DecimalInputField } from "../form/DecimalInputField";
import { NumberInputField } from "../form/NumberInputField";
import { DatePickerField } from "../form/DatePickerField";
import { updateComplemento } from "@/server/ComplementoActions";
import {
	QueryKeyFactory,
	useServerActionMutation,
} from "@/hooks/server-action-hooks";
import { formatCurrency, formatDecimal } from "@/utils/format";
import { cn } from "@/lib/utils";
import { useMainDialogContext } from "@/providers/MainDialogProvider";
import {
	ErrorDialogContent,
	InfoDialogContent,
	SuccessDialogContent,
} from "./MessageDialogContent";
import { useQueryClient } from "@tanstack/react-query";
import type { Transporte } from "@/utils/types";
import type { complementoUpdateSchema } from "@/utils/schemas";

interface FormAddComplementoProps {
	transporteId: string;
}

export function FormUpdateComplemento({
	transporteId,
}: FormAddComplementoProps) {
	const queryClient = useQueryClient();

	const data = queryClient.getQueryData<Transporte[]>(
		QueryKeyFactory.getTransportes(),
	);

	const transporte = data?.find((t) => t.id === transporteId);

	const mutation = useServerActionMutation(updateComplemento, {
		onSuccess: (data) => {
			console.log(data);
			setFieldErrors({});
			invalidateQueries();
			if (data.code === 200) {
				setMainDialog({
					open: true,
					content: <SuccessDialogContent message={data.message} />,
					onClose: () => onClose(),
				});
			}
			if (data.code === 204) {
				setMainDialog({
					open: true,
					content: (
						<InfoDialogContent
							message={data.message}
							title="Nada para atualizar"
						/>
					),
					onClose: () => onClose(),
				});
			}
		},
		onError: (error) => {
			console.log({ error });
			if (error.code === "NOT_AUTHORIZED") {
				// Handle not authorized error
			} else if (error.code === "INPUT_PARSE_ERROR") {
				const zodError = JSON.parse(error?.data) as ZodError;
				console.log(zodError.issues);
				setFieldErrors(zodError.issues);
			} else {
				setMainDialog({
					open: true,
					content: (
						<ErrorDialogContent
							title={`${error.code}: (${error.name})`}
							message={error.message}
						/>
					),
				});
			}
		},
	});

	const { setMainDialog } = useMainDialogContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const router = useRouter();

	const refCteComplementar = useRef<HTMLInputElement | null>(null);
	const refValCteComplementar = useRef<HTMLInputElement | null>(null);

	const { control, handleSubmit, getValues } = useForm<
		z.infer<typeof complementoUpdateSchema>
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
		const valCte = valCteFieldValue ?? transporte?.cteComplementar?.val_cte;
		console.log({ valCte, valCtePrevision: valCtePrevision() });
		if (!valCte || !valCtePrevision()) return false;
		const ctePrevision = valCtePrevision();
		const cteWatch = Number.parseFloat(valCte.toString().replace(",", "."));
		if (ctePrevision === cteWatch) {
			return true;
		}
		return false;
	};

	function freteTotal() {
		const peso =
			pesoFieldValue?.toString().replace(",", ".") ??
			getValues("peso")?.toString().replace(",", ".") ??
			transporte?.cteComplementar?.peso;
		if (!peso || !transporte?.val_tonelada) return 0;

		const val_peso = Number.parseFloat(peso.toString()) / 1000;
		return val_peso * Number(transporte.val_tonelada);
	}

	function valCtePrevision(): number {
		if (!freteTotal() || !transporte?.val_cte) return 0;

		const previsao = freteTotal() - Number(transporte.val_cte);
		return Number(previsao.toFixed(2));
	}

	const handlePeso = () => {
		if (pesoFieldValue)
			return formatDecimal(pesoFieldValue.toString().replace(",", "."));
		if (getValues("peso"))
			return formatDecimal(
				getValues("peso")?.toString().replace(",", "."),
			);
		if (transporte?.cteComplementar?.peso)
			return formatDecimal(transporte.cteComplementar.peso.toString());
		return "?";
	};

	const handleFreteTotal = () => {
		if (freteTotal() > 0) return formatCurrency(freteTotal().toString());
		return "?";
	};

	const handleValCtePrevision = () => {
		if (valCtePrevision() > 0)
			return formatCurrency(valCtePrevision().toString());
		return "?";
	};

	function invalidateQueries() {
		queryClient.invalidateQueries({
			queryKey: QueryKeyFactory.getTransportes(),
		});
	}

	function onClose() {
		router.push("/transmanager");
		console.log("indo para /transmanager");
	}

	function transformValues(values: any) {
		const transformedValues = { ...values };

		// console.log(transporte);
		transformedValues.transporteId = transporteId;

		if (transformedValues.cte === "") {
			if (transporte?.cteComplementar?.cte) {
				transformedValues.cte = null;
			} else {
				transformedValues.cte = undefined;
			}
		}

		if (transformedValues.peso === "") {
			if (transporte?.peso) {
				transformedValues.peso = null;
			} else {
				transformedValues.peso = undefined;
			}
		}

		if (transformedValues.peso) {
			transformedValues.peso = transformedValues.peso
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.val_tonelada === "") {
			if (transporte?.cteComplementar?.val_tonelada) {
				transformedValues.val_tonelada = null;
			} else {
				transformedValues.val_tonelada = undefined;
			}
		}

		if (transformedValues.val_tonelada) {
			transformedValues.val_tonelada = transformedValues.val_tonelada
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.val_cte === "") {
			if (transporte?.cteComplementar?.val_cte) {
				transformedValues.val_cte = null;
			} else {
				transformedValues.val_cte = undefined;
			}
		}

		if (transformedValues.val_cte) {
			transformedValues.val_cte = transformedValues.val_cte
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.reducao_bc_icms === "") {
			if (transporte?.cteComplementar?.reducao_bc_icms) {
				transformedValues.reducao_bc_icms = null;
			} else {
				transformedValues.reducao_bc_icms = undefined;
			}
		}

		if (transformedValues.reducao_bc_icms) {
			transformedValues.reducao_bc_icms =
				transformedValues.reducao_bc_icms.toString().replace(",", ".");
		}

		if (transformedValues.aliquota_icms === "") {
			if (transporte?.cteComplementar?.aliquota_icms) {
				transformedValues.aliquota_icms = null;
			} else {
				transformedValues.aliquota_icms = undefined;
			}
		}

		if (transformedValues.aliquota_icms) {
			transformedValues.aliquota_icms = transformedValues.aliquota_icms
				.toString()
				.replace(",", ".");
		}

		return { ...transformedValues, id: transporte?.cteComplementar?.id };
	}

	function setInputValue(input: HTMLInputElement, value: string) {
		const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
			window?.HTMLInputElement?.prototype,
			"value",
		)?.set;
		nativeInputValueSetter?.call(input, value);
		const event = new Event("input", {
			bubbles: true,
		});
		input.dispatchEvent(event);
	}

	async function onSubmit(values: z.infer<typeof complementoUpdateSchema>) {
		console.log({ values });
		const newValues = transformValues(values) as z.infer<
			typeof complementoUpdateSchema
		>;
		console.log({ newValues });

		mutation.mutate(newValues);
	}

	return (
		<div className="h-full w-full flex flex-col overflow-y-auto">
			<div className="flex flex-col border border-gray-600 rounded-md p-2 m-4 gap-2">
				<div className="flex flex-row gap-2">
					<span className="text-amber-500 text-sm gap-1 flex">
						Peso:
						<span className="text-sm text-gray-400">
							{handlePeso()}
						</span>
					</span>

					<span className="text-sm text-blue-600">x</span>

					<span className="text-amber-500 text-sm gap-1 flex">
						Val/Ton:
						<span className="text-sm text-gray-400">
							{transporte?.val_tonelada?.toString() ?? "?"}
						</span>
					</span>

					<span className="text-sm text-blue-600">=</span>
					<span className="text-sm">{handleFreteTotal()}</span>
				</div>

				<span className="text-sm text-amber-500">
					Val. CTe Anterior:{" "}
					<span id="teste" className="text-sm text-gray-400">
						{formatCurrency(
							transporte?.val_cte?.toString() ?? "?",
						) ?? "?"}
					</span>
				</span>

				<div className="flex flex-row gap-2">
					<span className="text-sm text-amber-500 flex gap-1">
						Val. CTe Previsto:
						<span
							className={`text-sm ${
								isEqualValCte()
									? "text-green-600"
									: "text-red-500"
							}`}
						>
							{handleValCtePrevision()}
						</span>
					</span>
					<button
						disabled={valCtePrevision() === 0}
						type="button"
						onClick={() => {
							if (refValCteComplementar.current) {
								const input = refValCteComplementar.current;

								setInputValue(
									input,
									valCtePrevision()
										.toString()
										.replace(".", ","),
								);
							}
						}}
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
							defaultValue={transporte?.cteComplementar?.cte}
							ref={refCteComplementar}
						/>
						<DecimalInputField
							name="peso"
							label="Peso"
							placeholder="Digite um número"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
							defaultValue={transporte?.cteComplementar?.peso
								?.toString()
								.replace(".", ",")}
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
							defaultValue={transporte?.cteComplementar?.reducao_bc_icms
								?.toString()
								.replace(".", ",")}
						/>
						<DecimalInputField
							name="aliquota_icms"
							label="Aliq. ICMS"
							placeholder="Digite um valor"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
							defaultValue={transporte?.cteComplementar?.aliquota_icms
								?.toString()
								.replace(".", ",")}
						/>
					</div>

					<div className="grid grid-flow-col grid-cols-2 gap-3">
						<DecimalInputField
							id="val_cte"
							name="val_cte"
							label="Val. CTe"
							placeholder="Digite um valor"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
							ref={refValCteComplementar}
							defaultValue={transporte?.cteComplementar?.val_cte
								?.toString()
								.replace(".", ",")}
						/>
						<DatePickerField
							name="emissao_cte"
							label="Emissão CTe"
							placeholder="Selecione uma data"
							control={control}
							fieldErrors={fieldErrors}
							defaultValue={
								transporte?.cteComplementar?.emissao_cte
							}
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
