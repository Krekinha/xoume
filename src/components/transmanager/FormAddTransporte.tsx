"use client";

import { useRouter } from "next/navigation";
import { ReactSelect } from "@/components/form/ReactSelect";
import { Button } from "@/components/ui/button";
import { addTransporte } from "@/server/TransporteActions";
import type { Empresa, Motorista, Tomador } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { ReactSelectCity } from "@/components/form/ReactSelectCity";
import { useServerAction } from "zsa-react";
import { useModalDialogContext } from "@/providers/ModaDialogProvider";
import { useServerActionQuery } from "@/lib/server-action-hooks";
import { getEmpresas } from "@/server/EmpresaActions";
import { getMotoristas } from "@/server/MotoristaActions";
import { getTomadores } from "@/server/TomadorActions";
import { ReactSelectInputMulti } from "../form/ReactSelectInputMulti";

export function FormAddTransporte() {
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

	const {
		isPending,
		execute,
		data,
		error: err,
	} = useServerAction(addTransporte);
	const { setModalDialog } = useModalDialogContext();
	const [fieldErrors, setFieldErrors] = useState({});
	const router = useRouter();

	// define o schema de validação dos dados recebidos pelo form cliente
	const schema = z.object({
		empresaId: z.coerce
			.number()
			.positive({ message: "Selecione uma opção válida" }),
		motoristaId: z.coerce
			.number()
			.positive({ message: "Selecione uma opção válida" }),
		tomadorId: z.coerce
			.number()
			.positive({ message: "Selecione uma opção válida" })
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
		notas: z.string().array().optional(),
		//.positive({ message: "o número deve ser positivo" }),
		//{ message: "Campo obrigatório" },

		// notas: z.coerce
		// 	.number({ message: "Somente números" })
		// 	.positive({ message: "o número deve ser positivo" })
		// 	.array()
		// 	.optional(),
		// notas: z.coerce
		// 	.number({ message: "Somente números" })
		// 	.positive({ message: "o número deve ser positivo" })
		// 	.optional()
		// 	.array(),
	});

	const {
		register,
		control,
		handleSubmit,
		formState,
		setValue,
		getValues,
		getFieldState,
	} = useForm({
		//resolver: zodResolver(schema),
		defaultValues: {
			empresaId: 0,
			motoristaId: 0,
			notas: undefined,
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

	function onClose(data: any) {
		if (data) {
			router.push("/transmanager");
			console.log("indo para /transmanager");
		}
	}

	async function onSubmit(values) {
		console.log(values);

		const [data, err] = await execute(values);

		if (err) {
			if (err.code === "NOT_AUTHORIZED") {
				// Handle not authorized error
			} else if (err.code === "INPUT_PARSE_ERROR") {
				// Handle input validation errors
				console.log(err.fieldErrors);
				console.log(err.formErrors);
				console.log(err.formattedErrors);
				setFieldErrors(err.fieldErrors);
			} else {
				// Handle other errors
			}
		}

		console.log(data);
		console.log(err);

		// setModalDialog({
		// 	open: true,
		// 	data: data ? data : null,
		// 	error: err
		// 		? { code: err.code, name: err.name, message: err.message }
		// 		: undefined,
		// 	onClose: () => onClose(data),
		// });
	}

	return (
		<div className="h-full w-full bg-zinc-800">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col w-full p-4 gap-3">
					<ReactSelect
						name="empresaId"
						label="Empresa"
						control={control}
						register={register}
						items={empresaItems()}
						placeholder="Selecione uma empresa"
						stateError={formState.errors}
					/>
					<ReactSelect
						name="motoristaId"
						label="Motorista"
						control={control}
						register={register}
						items={motoristaItems()}
						placeholder="Selecione um motorista"
						stateError={formState.errors}
					/>

					<ReactSelect
						name="tomadorId"
						label="Tomador"
						control={control}
						register={register}
						items={tomadorItems()}
						placeholder="Selecione um tomador"
						stateError={formState.errors}
					/>

					<ReactSelectCity
						nameUf="uf_origem"
						nameMunicipio="cidade_origem"
						label="Origem"
						control={control}
						register={register}
						items={tomadorItems()}
						placeholder="Selecione um município"
						stateError={formState.errors}
					/>

					<ReactSelectCity
						nameUf="uf_destino"
						nameMunicipio="cidade_destino"
						label="Destino"
						control={control}
						register={register}
						items={tomadorItems()}
						placeholder="Selecione um município"
						stateError={formState.errors}
					/>

					<ReactSelectInputMulti
						name="notas"
						label="Notas"
						control={control}
						register={register}
						setValue={setValue}
						getValues={getValues}
						getFieldState={getFieldState}
						formState={formState}
						placeholder="Digite uma número de nota e precione enter"
						stateError={formState.errors}
						fieldErrors={fieldErrors}
					/>

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
