"use client";

import { ReactSelect } from "@/components/form/ReactSelect";
import { ReactSelectCity } from "@/components/form/ReactSelectCity";
import { Button } from "@/components/ui/button";
import {
	QueryKeyFactory,
	useServerActionMutation,
	useServerActionQuery,
} from "@/hooks/server-action-hooks";
import { useMainDialogContext } from "@/providers/MainDialogProvider";
import { getEmpresas } from "@/server/EmpresaActions";
import { getMotoristas } from "@/server/MotoristaActions";
import { getTomadores } from "@/server/TomadorActions";
import { addTransporte } from "@/server/TransporteActions";
import { estadosBrasil } from "@/utils/constants";
import type { transporteSchema } from "@/utils/schemas";
import type { Empresa, Motorista, Tomador } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ZodError, z } from "zod";
import { DatePickerField } from "../form/DatePickerField";
import { DecimalInputField } from "../form/DecimalInputField";
import { NumberInputField } from "../form/NumberInputField";
import { ReactSelectInputMulti } from "../form/ReactSelectInputMulti";
import {
	ErrorDialogContent,
	SuccessDialogContent,
} from "./MessageDialogContent";

export function FormAddTransporte() {
	const queryClient = useQueryClient();

	const mutation = useServerActionMutation(addTransporte, {
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
		},
		onError: (error) => {
			console.log(error);
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

	const { data: empresas } = useServerActionQuery(getEmpresas, {
		input: undefined,
		queryKey: ["getEmpresas"],
	});

	const { data: motoristas } = useServerActionQuery(getMotoristas, {
		input: undefined,
		queryKey: ["getMotoristas"],
	});

	const { data: tomadores } = useServerActionQuery(getTomadores, {
		input: undefined,
		queryKey: ["getTomadores"],
	});

	const { setMainDialog } = useMainDialogContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const router = useRouter();

	const { control, handleSubmit, setValue } = useForm<
		z.infer<typeof transporteSchema>
	>({
		defaultValues: {
			empresaId: undefined,
			motoristaId: undefined,
			notas: undefined,
			cte: undefined,
			peso: undefined,
			val_tonelada: undefined,
			val_cte: undefined,
			reducao_bc_icms: undefined,
			aliquota_icms: undefined,
		},
	});

	const empresaItems = () => {
		if (empresas) {
			return empresas.map((empresa: Empresa) => ({
				label: empresa.razaoNome,
				value: empresa.id,
			}));
		}
		return [];
	};

	const motoristaItems = () => {
		if (motoristas) {
			return motoristas.map((motorista: Motorista) => ({
				label: motorista.nome,
				value: motorista.id,
			}));
		}
		return [];
	};

	const tomadorItems = () => {
		if (tomadores) {
			return tomadores.map((tomador: Tomador) => ({
				label: tomador.razaoNome,
				value: tomador.id,
			}));
		}
		return [];
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

		if (transformedValues.empresaId === "") {
			transformedValues.empresaId = undefined;
		}

		if (transformedValues.motoristaId === "") {
			transformedValues.motoristaId = undefined;
		}

		if (transformedValues.tomadorId === "") {
			transformedValues.tomadorId = undefined;
		}

		if (transformedValues.cte === "") {
			transformedValues.cte = undefined;
		}

		if (transformedValues.peso === "") {
			transformedValues.peso = undefined;
		}

		if (transformedValues.peso) {
			transformedValues.peso = transformedValues.peso
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.val_tonelada === "") {
			transformedValues.val_tonelada = undefined;
		}

		if (transformedValues.val_tonelada) {
			transformedValues.val_tonelada = transformedValues.val_tonelada
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.val_cte === "") {
			transformedValues.val_cte = undefined;
		}

		if (transformedValues.val_cte) {
			transformedValues.val_cte = transformedValues.val_cte
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.reducao_bc_icms === "") {
			transformedValues.reducao_bc_icms = undefined;
		}

		if (transformedValues.reducao_bc_icms) {
			transformedValues.reducao_bc_icms =
				transformedValues.reducao_bc_icms.toString().replace(",", ".");
		}

		if (transformedValues.aliquota_icms === "") {
			transformedValues.aliquota_icms = undefined;
		}

		if (transformedValues.aliquota_icms) {
			transformedValues.aliquota_icms = transformedValues.aliquota_icms
				.toString()
				.replace(",", ".");
		}

		return transformedValues;
	}

	async function onSubmit(values: z.infer<typeof transporteSchema>) {
		console.log({ values });
		const newValues = transformValues(values) as z.infer<
			typeof transporteSchema
		>;
		console.log({ newValues });

		mutation.mutate(newValues);
	}

	return (
		<div className="h-full w-full flex flex-col overflow-y-auto">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col w-full p-4 gap-3 dark:bg-[#191c1f] ">
					<ReactSelect
						name="empresaId"
						label="Empresa"
						control={control}
						items={empresaItems()}
						placeholder="Selecione uma empresa"
						fieldErrors={fieldErrors}
					/>
					<ReactSelect
						name="motoristaId"
						label="Motorista"
						control={control}
						items={motoristaItems()}
						placeholder="Selecione um motorista"
						fieldErrors={fieldErrors}
					/>

					<ReactSelect
						name="tomadorId"
						label="Tomador"
						control={control}
						items={tomadorItems()}
						placeholder="Selecione um tomador"
						fieldErrors={fieldErrors}
					/>

					<ReactSelectCity
						label="Origem"
						placeholder="Selecione um município"
						control={control}
						setValue={setValue}
						fieldErrors={fieldErrors}
						nameUf="uf_origem"
						itemsUf={estadosBrasil}
						nameMunicipio="cidade_origem"
					/>

					<ReactSelectCity
						label="Destino"
						placeholder="Selecione um município"
						control={control}
						setValue={setValue}
						fieldErrors={fieldErrors}
						nameUf="uf_destino"
						itemsUf={estadosBrasil}
						nameMunicipio="cidade_destino"
					/>

					<div className="grid grid-flow-col grid-cols-2 gap-3">
						<ReactSelectInputMulti
							name="notas"
							label="Notas"
							placeholder="Digite um número e pressione enter"
							control={control}
							setValue={setValue}
							fieldErrors={fieldErrors}
						/>
						<NumberInputField
							name="cte"
							label="CTe"
							placeholder="Digite um número"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
					</div>
					<div className="grid grid-flow-col grid-cols-3 gap-3">
						<DecimalInputField
							name="peso"
							label="Peso"
							placeholder="Digite um número"
							type="number"
							control={control}
							fieldErrors={fieldErrors}
						/>
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
