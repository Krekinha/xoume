"use client";

import { useRouter } from "next/navigation";
import { ReactSelect } from "@/components/form/ReactSelect";
import { Button } from "@/components/ui/button";
import { updateTransporte } from "@/server/TransporteActions";
import type { Empresa, Motorista, Tomador, Transporte } from "@/utils/types";
import { useForm } from "react-hook-form";
import type { z, ZodError } from "zod";
import type React from "react";
import { useRef, useState } from "react";
import { ReactSelectCity } from "@/components/form/ReactSelectCity";
import {
	QueryKeyFactory,
	useServerActionMutation,
	useServerActionQuery,
} from "@/hooks/server-action-hooks";
import { getEmpresas } from "@/server/EmpresaActions";
import { getMotoristas } from "@/server/MotoristaActions";
import { getTomadores } from "@/server/TomadorActions";
import { ReactSelectInputMulti } from "../form/ReactSelectInputMulti";
import type { transporteUpdateSchema } from "@/utils/schemas";
import { DecimalInputField } from "../form/DecimalInputField";
import { NumberInputField } from "../form/NumberInputField";
import { DatePickerField } from "../form/DatePickerField";
import { useMainDialogContext } from "@/providers/MainDialogProvider";
import {
	ErrorDialogContent,
	InfoDialogContent,
	SuccessDialogContent,
} from "./MessageDialogContent";
import { estadosBrasil } from "@/utils/constants";
import { useQueryClient } from "@tanstack/react-query";

interface FormUpdateTransporteProps {
	transporteId: number;
}

export function FormUpdateTransporte({
	transporteId,
}: FormUpdateTransporteProps) {
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData<Transporte[]>(
		QueryKeyFactory.getTransportes(),
	);

	const transporte = data?.find((t) => t.id === Number(transporteId));

	const mutation = useServerActionMutation(updateTransporte, {
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

	const { setMainDialog } = useMainDialogContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const router = useRouter();

	const refUfOrigem = useRef<any>(undefined);
	const refMunicipioOrigem = useRef<any>(undefined);
	const refUfDestino = useRef<any>(undefined);
	const refMunicipioDestino = useRef<any>(undefined);
	const refNotas = useRef<any>(null);
	const refCte = useRef<HTMLInputElement | null>(null);

	const defaultValues = {
		empresaId: undefined,
		motoristaId: undefined,
		tomadorId: undefined,
		notas: undefined,
		cte: undefined,
		peso: undefined,
		val_tonelada: undefined,
		val_cte: undefined,
		reducao_bc_icms: undefined,
		uf_origem: undefined,
		cidade_origem: undefined,
		uf_destino: undefined,
		cidade_destino: undefined,
	};

	const { control, handleSubmit, setValue } = useForm<
		z.infer<typeof transporteUpdateSchema>
	>({
		defaultValues: defaultValues,
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
		queryClient.invalidateQueries({
			queryKey: QueryKeyFactory.getTransporteById(
				transporteId.toString(),
			),
		});
	}

	function onClose() {
		router.push("/transmanager");
		console.log("indo para /transmanager");
	}

	function transformValues(values: any) {
		const transformedValues = { ...values };

		if (transformedValues.uf_origem === undefined) {
			transformedValues.uf_origem = null;
		}

		if (transformedValues.uf_destino === undefined) {
			transformedValues.uf_destino = null;
		}

		if (transformedValues.cidade_origem === undefined) {
			transformedValues.cidade_origem = null;
		}

		if (transformedValues.cidade_destino === undefined) {
			transformedValues.cidade_destino = null;
		}

		if (transformedValues.empresaId === "") {
			if (transporte?.empresaId) {
				transformedValues.empresaId = null;
			} else {
				transformedValues.empresaId = undefined;
			}
		}

		if (transformedValues.cte === "") {
			if (transporte?.cte) {
				transformedValues.cte = null;
			} else {
				transformedValues.cte = undefined;
			}
		}

		if (transformedValues.motoristaId === "") {
			if (transporte?.motoristaId) {
				transformedValues.motoristaId = null;
			} else {
				transformedValues.motoristaId = undefined;
			}
		}

		if (transformedValues.tomadorId === "") {
			if (transporte?.tomadorId) {
				transformedValues.tomadorId = null;
			} else {
				transformedValues.tomadorId = undefined;
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
			if (transporte?.val_tonelada) {
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
			if (transporte?.val_cte) {
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
			if (transporte?.reducao_bc_icms) {
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
			if (transporte?.aliquota_icms) {
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

		return { ...transformedValues, id: transporte?.id };
	}

	async function onSubmit(values: z.infer<typeof transporteUpdateSchema>) {
		console.log({ values });
		const newValues = transformValues(values) as z.infer<
			typeof transporteUpdateSchema
		>;

		console.log({ newValues });
		mutation.mutate(newValues);
	}

	return (
		<div className="h-full w-full flex flex-col overflow-y-auto">
			{transporte && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col w-full p-4 gap-3 dark:bg-[#191c1f] ">
						<ReactSelect
							name="empresaId"
							label="Empresa"
							control={control}
							defaultValue={transporte?.empresaId}
							items={empresaItems()}
							placeholder="Selecione uma empresa"
							fieldErrors={fieldErrors}
						/>
						<ReactSelect
							name="motoristaId"
							label="Motorista"
							control={control}
							defaultValue={transporte?.motoristaId}
							items={motoristaItems()}
							placeholder="Selecione um motorista"
							fieldErrors={fieldErrors}
						/>

						<ReactSelect
							name="tomadorId"
							label="Tomador"
							control={control}
							defaultValue={transporte?.tomadorId}
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
							isUpdate
							nameUf="uf_origem"
							refUf={refUfOrigem}
							itemsUf={estadosBrasil}
							defaultValueUf={transporte?.uf_origem}
							nameMunicipio="cidade_origem"
							refMunicipio={refMunicipioOrigem}
							defaultValueMunicipio={transporte?.cidade_origem}
						/>

						<ReactSelectCity
							nameUf="uf_destino"
							refUf={refUfDestino}
							itemsUf={estadosBrasil}
							nameMunicipio="cidade_destino"
							refMunicipio={refMunicipioDestino}
							defaultValueUf={transporte?.uf_destino}
							defaultValueMunicipio={transporte?.cidade_destino}
							label="Destino"
							placeholder="Selecione um município"
							control={control}
							setValue={setValue}
							fieldErrors={fieldErrors}
							isUpdate
						/>

						<div className="grid grid-flow-col grid-cols-2 gap-3">
							<ReactSelectInputMulti
								refInput={refNotas}
								name="notas"
								label="Notas"
								placeholder="Digite um número e pressione enter"
								control={control}
								setValue={setValue}
								fieldErrors={fieldErrors}
								defaultValue={transporte?.notas}
								isUpdate
							/>
							<NumberInputField
								name="cte"
								defaultValue={transporte?.cte}
								label="CTe"
								ref={refCte}
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
								defaultValue={transporte?.peso
									?.toString()
									.replace(".", ",")}
							/>
							<DecimalInputField
								name="val_tonelada"
								label="Val/Ton"
								placeholder="Digite um valor"
								type="number"
								control={control}
								fieldErrors={fieldErrors}
								defaultValue={transporte?.val_tonelada
									?.toString()
									.replace(".", ",")}
							/>
							<DecimalInputField
								name="val_cte"
								label="Val. CTe"
								placeholder="Digite um valor"
								type="number"
								control={control}
								fieldErrors={fieldErrors}
								defaultValue={transporte?.val_cte
									?.toString()
									.replace(".", ",")}
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
								defaultValue={transporte?.reducao_bc_icms
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
								defaultValue={transporte?.aliquota_icms
									?.toString()
									.replace(".", ",")}
							/>
							<DatePickerField
								name="emissao_cte"
								label="Emissão CTe"
								placeholder="Selecione uma data"
								defaultValue={transporte?.emissao_cte}
								control={control}
								fieldErrors={fieldErrors}
							/>
						</div>

						<div className="flex justify-center self-end mt-5 gap-2">
							{/* <Button
								onClick={() => {
									const element =
										document.getElementById("calendar");
									console.log({ teste: element });
								}}
								type="button"
								className="bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 dark:text-white shadow-sm dark:shadow-black/90"
							>
								Teste
							</Button> */}
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
			)}
			{!transporte && (
				<div className="flex flex-col gap-3 justify-center items-center h-full">
					<p>Transporte indisponível</p>
					<Button
						variant="outline"
						type="button"
						onClick={() => router.push("/transmanager")}
					>
						Voltar
					</Button>
				</div>
			)}
		</div>
	);
}
