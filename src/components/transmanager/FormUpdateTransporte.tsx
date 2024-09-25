"use client";

import { useRouter } from "next/navigation";
import { ReactSelect } from "@/components/form/ReactSelect";
import { Button } from "@/components/ui/button";
import {
	getTransporteById,
	updateTransporte,
} from "@/server/TransporteActions";
import type { Empresa, Motorista, Tomador, Transporte } from "@/utils/types";
import { useForm } from "react-hook-form";
import type { z, ZodError } from "zod";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ReactSelectCity } from "@/components/form/ReactSelectCity";
import { useServerAction } from "zsa-react";
import { useServerActionQuery } from "@/hooks/server-action-hooks";
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
	SuccessDialogContent,
} from "./MessageDialogContent";
import { estadosBrasil } from "@/utils/constants";
import { getMunicipiosByUf } from "@/server/OthersActions";

interface FormUpdateTransporteProps {
	transporteId: number;
}

export function FormUpdateTransporte({
	transporteId,
}: FormUpdateTransporteProps) {
	const { data: transporte } = useServerActionQuery(getTransporteById, {
		input: { id: transporteId },
		queryKey: ["getTransporteById", transporteId.toString()],
	});

	const refUfOrigem = useRef<any>(undefined);
	const refMunicipioOrigem = useRef<any>(undefined);
	const refUfDestino = useRef<any>(undefined);
	const refMunicipioDestino = useRef<any>(undefined);
	const refNotas = useRef<any>(null);

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

	const { execute } = useServerAction(updateTransporte);
	const { setMainDialog } = useMainDialogContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const router = useRouter();

	const { register, control, handleSubmit, setValue, getValues } = useForm<
		z.infer<typeof transporteUpdateSchema>
	>({
		defaultValues: defaultValues,
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

	useEffect(() => {
		if (transporte) {
			const ufOrigem = estadosBrasil.find(
				(estado) => estado.label === transporte.uf_origem,
			);
			const ufDestino = estadosBrasil.find(
				(estado) => estado.label === transporte.uf_destino,
			);

			setValue("empresaId", transporte.empresaId);
			setValue("motoristaId", transporte.motoristaId);
			setValue("tomadorId", transporte.tomadorId);
			setValue("uf_origem", transporte.uf_origem);
			refUfOrigem.current.setValue(ufOrigem);
			setValue("cidade_origem", transporte.cidade_origem);
			refMunicipioOrigem.current.setValue({
				label: transporte.cidade_origem,
			});
			setValue("uf_destino", transporte.uf_destino);
			refUfDestino.current.setValue(ufDestino);
			setValue("cidade_destino", transporte.cidade_destino);
			refMunicipioDestino.current.setValue({
				label: transporte.cidade_destino,
			});
			setValue("notas", transporte.notas);
			const notas = transporte.notas?.map((nota: string) => ({
				label: nota,
				value: nota,
			}));
			refNotas.current.setValue(notas);
			setValue("cte", transporte.cte);
			setValue("peso", transporte.peso);
			setValue("val_tonelada", transporte.val_tonelada);
			setValue("val_cte", transporte.val_cte);
			setValue("reducao_bc_icms", transporte.reducao_bc_icms);
			setValue("aliquota_icms", transporte.aliquota_icms);
			setValue("emissao_cte", transporte.emissao_cte);
		}
	}, [transporte, setValue]);

	function onClose(data: unknown) {
		if (data) {
			router.push("/transmanager");
			console.log("indo para /transmanager");
		}
	}

	function transformValues(values: any) {
		const transformedValues = { ...values };

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
			transformedValues.val_cte = transformedValues.val_cte
				.toString()
				.replace(",", ".");
		}

		if (transformedValues.reducao_bc_icms) {
			transformedValues.reducao_bc_icms =
				transformedValues.reducao_bc_icms.toString().replace(",", ".");
		}

		if (transformedValues.aliquota_icms) {
			transformedValues.aliquota_icms = transformedValues.aliquota_icms
				.toString()
				.replace(",", ".");
		}

		return { ...transformedValues, id: transporte.id };
	}

	async function onSubmit(values: z.infer<typeof transporteUpdateSchema>) {
		// console.log({ values });
		const newValues = transformValues(values) as z.infer<
			typeof transporteUpdateSchema
		>;

		console.log({ newValues });

		// const camposModificados = obterCamposAlterados(
		// 	transporte,
		// 	newValues as Partial<Transporte>,
		// );

		// console.log("Transporte:", transporte);
		// console.log("Novos Valores:", newValues);
		// console.log("Campos modificados:", camposModificados);

		const [data, err] = await execute(newValues);

		// console.log(data);
		// console.log(err);

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
				content: <SuccessDialogContent message={data.message} />,
				onClose: () => onClose(data),
			});
		}
	}

	return (
		<div className="h-full w-full flex flex-col overflow-y-auto">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col w-full p-4 gap-3 dark:bg-[#191c1f] ">
					<ReactSelect
						name="empresaId"
						label="Empresa"
						control={control}
						register={register}
						items={empresaItems()}
						placeholder="Selecione uma empresa"
						fieldErrors={fieldErrors}
					/>
					<ReactSelect
						name="motoristaId"
						label="Motorista"
						control={control}
						register={register}
						items={motoristaItems()}
						placeholder="Selecione um motorista"
						fieldErrors={fieldErrors}
					/>

					<ReactSelect
						name="tomadorId"
						label="Tomador"
						control={control}
						register={register}
						items={tomadorItems()}
						placeholder="Selecione um tomador"
						fieldErrors={fieldErrors}
					/>

					<ReactSelectCity
						nameUf="uf_origem"
						refUf={refUfOrigem}
						nameMunicipio="cidade_origem"
						refMunicipio={refMunicipioOrigem}
						label="Origem"
						placeholder="Selecione um município"
						control={control}
						setValue={setValue}
						fieldErrors={fieldErrors}
					/>

					<ReactSelectCity
						nameUf="uf_destino"
						refUf={refUfDestino}
						nameMunicipio="cidade_destino"
						refMunicipio={refMunicipioDestino}
						label="Destino"
						placeholder="Selecione um município"
						control={control}
						setValue={setValue}
						fieldErrors={fieldErrors}
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
							setValue={setValue}
						/>
					</div>

					<div className="flex justify-center self-end mt-5 gap-2">
						<Button
							onClick={() => {
								// setValue("uf_origem", "SP");
								// console.log(refUfOrigem.current.getValue());
								// refUfOrigem.current.setValue({ label: "SP" });
								refNotas.current.setValue([
									{
										label: "1",
										value: 1,
									},
								]);
								console.log(refNotas.current.getValue());
								console.log(refUfOrigem.current);
								// refNotas.current.setValue([33, 34]);
							}}
							type="button"
							className="bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-600 dark:text-white shadow-sm dark:shadow-black/90"
						>
							Teste
						</Button>
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
