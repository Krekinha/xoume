"use client";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sidebar";
import type {
	Empresa,
	Motorista,
	Tomador,
	ResponseAction,
	SelectItemProps,
} from "@/utils/types";
import { GrAdd } from "react-icons/gr";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { addTransporte } from "@/server/TransporteActions";
import { useFormState } from "react-dom";
import { ReactSelect } from "@/components/form/ReactSelect";

interface ToggleAddTransporteProps {
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

export function ToggleAddTransporte({
	empresas,
	motoristas,
	tomadores,
}: ToggleAddTransporteProps) {
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
		<Sheet modal={false}>
			<SheetTrigger asChild>
				<button
					className="button-add rounded-full p-1 bg-blue-600 text-white hover:bg-green-700 active:bg-green-800
        shadow-md hover:shadow-lg focus:shadow-lg ease-linear transition-all 
        cursor-pointer duration-150 select-none "
				>
					<GrAdd className="h-4 w-4" />
				</button>
			</SheetTrigger>
			<SheetContent
				side={"right"}
				aria-describedby={undefined}
				className="bg-zinc-900"
			>
				<SheetTitle />
				<div className="h-full px-3 pb-4 overflow-y-auto">
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

							<div className="flex justify-center gap-2">
								<SheetClose asChild>
									<Button className="bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:text-white">
										Cancelar
									</Button>
								</SheetClose>
								<Button
									type="submit"
									className="bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white"
								>
									Enviar
								</Button>
							</div>
						</div>
					</form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
