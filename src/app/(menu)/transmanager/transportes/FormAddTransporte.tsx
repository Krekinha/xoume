"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

import type {
	Empresa,
	Motorista,
	ResponseAction,
	SelectItemProps,
} from "@/utils/types";
import { addTransporte } from "@/server/TransporteActions";
import { useFormState } from "react-dom";
import { FieldError } from "@/components/form/FieldError";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/form/SelectField";
import { useState } from "react";
import { ReactSelect } from "@/components/form/ReactSelect";
import { Label } from "@/components/ui/label";

interface IFormInput {
	empresaId: string;
	motoristaId: string;
	tomadorId: string;
}

const initialState: ResponseAction = {
	errors: [],
	message: {},
};

export function FormAddTransporte() {
	const [state, formAction] = useFormState(addTransporte, initialState);
	const { register, control, getValues, setValue } = useForm<IFormInput>({
		defaultValues: {
			motoristaId: "0",
			tomadorId: "0",
		},
	});

	function getControl() {
		console.log(control);
		console.log(register);
		console.log(getValues());
	}

	const motoristas: SelectItemProps[] = [
		{ label: "JOAO LUIZ", value: "1" },
		{ label: "RENIVALDO", value: "3" },
		{ label: "GENILTON", value: "5" },
	];

	const empresas: SelectItemProps[] = [
		{ label: "JOAO LUIZ", value: "1" },
		{ label: "RENIVALDO", value: "3" },
		{ label: "GENILTON", value: "5" },
	];

	const options = [
		{ label: "JOAO LUIZ", value: "1" },
		{ label: "RENIVALDO", value: "3" },
		{ label: "GENILTON", value: "5" },
	];

	interface StateOption {
		readonly options: any[];
	}

	const tomadores: readonly StateOption[] = [
		{
			options: [
				{ label: "MAGBAN", value: "1" },
				{ label: "GRANSENA", value: "3" },
			],
		},
	];

	console.log(state);

	return (
		<form action={formAction}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col">
					<Label className="mb-2">Empresa</Label>
					<Input {...register("empresaId")} className="border-white border" />
					<FieldError field="empresaId" state={state} />
				</div>
				<div className="flex flex-col">
					<SelectField
						name="motoristaId"
						control={control}
						register={register}
						items={motoristas}
						displayItem="Selecione uma motorista..."
						stateError={state}
					/>
				</div>
				<div>
					<ReactSelect
						name="tomadorId"
						label="Tomador"
						control={control}
						register={register}
						items={motoristas}
						placeholder="Selecione um tomador"
						stateError={state}
					/>
				</div>

				<div className="flex justify-center">
					<Button
						type="submit"
						className="bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white"
					>
						Enviar
					</Button>
				</div>
			</div>
		</form>
	);
}
