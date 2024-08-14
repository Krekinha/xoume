"use client";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

import type {
	Empresa,
	Motorista,
	ResponseAction,
	SelectItemProps,
	Tomador,
} from "@/utils/types";
import { addTransporte } from "@/server/TransporteActions";
import { useFormState } from "react-dom";
import { ReactSelect } from "@/components/form/ReactSelect";

interface FormAddTransporteProps {
	empresas: Empresa[];
	motoristas: Motorista[];
	tomadores: Tomador[];
}

interface IFormInput {
	empresaId: string;
	motoristaId: string;
	tomadorId: string;
}

const initialState: ResponseAction = {
	errors: [],
	message: {},
};

export function FormAddTransporte({
	empresas,
	motoristas,
	tomadores,
}: FormAddTransporteProps) {
	const [state, formAction] = useFormState(addTransporte, initialState);
	const { register, control, getValues, setValue } = useForm<IFormInput>({
		defaultValues: {
			motoristaId: "",
			tomadorId: "",
		},
	});

	function getControl() {
		console.log(control);
		console.log(register);
		console.log(getValues());
	}

	const empresaItems = (): SelectItemProps[] => {
		if (empresas) {
			return empresas.map((empresa) => ({
				label: empresa.razaoNome || "",
				value: empresa.id?.toString() || "",
			}));
		}
		return [];
	};

	const motoristaItems = (): SelectItemProps[] => {
		if (motoristas) {
			return motoristas.map((motorista) => ({
				label: motorista.nome || "",
				value: motorista.id?.toString() || "",
			}));
		}
		return [];
	};

	const tomadorItems = (): SelectItemProps[] => {
		if (tomadores) {
			return tomadores.map((tomador) => ({
				label: tomador.razaoNome || "",
				value: tomador.id?.toString() || "",
			}));
		}
		return [];
	};

	console.log(state);

	return (
		<form action={formAction}>
			<div className="flex flex-col gap-3">
				<ReactSelect
					name="empresaId"
					label="Empresa"
					control={control}
					register={register}
					items={empresaItems()}
					placeholder="Selecione uma empresa"
					stateError={state}
				/>
				<ReactSelect
					name="motoristaId"
					label="Motorista"
					control={control}
					register={register}
					items={motoristaItems()}
					placeholder="Selecione um motorista"
					stateError={state}
				/>

				<ReactSelect
					name="tomadorId"
					label="Tomador"
					control={control}
					register={register}
					items={tomadorItems()}
					placeholder="Selecione um tomador"
					stateError={state}
				/>

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
