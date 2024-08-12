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
import { FormLabel } from "@/components/form/FormLabel";
import { SelectField } from "@/components/form/SelectField";
import Select from "react-select";
import { useState } from "react";

interface IFormInput {
	empresaId: string;
	motoristaId: string;
	tomadorId: string;
}

const initialState: ResponseAction = {
	errors: [],
	message: {},
};

export function FormTeste() {
	const [state, formAction] = useFormState(addTransporte, initialState);
	const [open, setOpen] = useState(false);
	const [buttomValue, setButtomValue] = useState("Selecione um tomador");
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
					<FormLabel className="mb-2">Empresa</FormLabel>
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
					<Controller
						name="tomadorId"
						control={control}
						render={({ field }) => (
							<Select
								{...register("tomadorId")}
								{...field}
								options={tomadores}
								theme={(theme) => ({
									...theme,
									borderRadius: 5,
									backgroundColor: "red",
									colors: {
										...theme.colors,
										primary25: "gray",
										primary: "black",
									},
								})}
							/>
						)}
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
