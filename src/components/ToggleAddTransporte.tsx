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

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { addTransporte } from "@/server/TransporteActions";
import { useFormState } from "react-dom";
import { ReactSelect } from "@/components/form/ReactSelect";
import Select, { components, type DropdownIndicatorProps } from "react-select";
import { useState, type HtmlHTMLAttributes, type ReactElement } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

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
});

export function ToggleAddTransporte({
	empresas,
	motoristas,
	tomadores,
}: ToggleAddTransporteProps) {
	//const [state, formAction] = useFormState(addTransporte, initialState);
	const [open, setOpen] = useState(false);
	const {
		register,
		control,
		getValues,
		setValue,
		reset,
		handleSubmit,
		formState,
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			empresaId: 0,
			motoristaId: 0,
		},
	});

	function getControl() {
		console.log(control);
		console.log(register);
		console.log(getValues());
	}

	const empresaItems = () => {
		if (empresas) {
			return empresas.map((empresa) => ({
				label: empresa.razaoNome,
				value: empresa.id,
			}));
		}
		return [];
	};

	const motoristaItems = () => {
		if (motoristas) {
			return motoristas.map((motorista) => ({
				label: motorista.nome,
				value: motorista.id,
			}));
		}
		return [];
	};

	const tomadorItems = () => {
		if (tomadores) {
			return tomadores.map((tomador) => ({
				label: tomador.razaoNome,
				value: tomador.id,
			}));
		}
		return [];
	};

	function onOpenChange(e: boolean) {
		/**
		 * (e) = retorna o estado atual do diálogo, quando
		 * esse diálogo estiver fechado (false) os valores
		 * do formulário serão resetados
		 */
		// if (open === false) {
		// 	reset();
		// 	state.errors = [];
		// 	state.message = {};
		// }
	}

	function after() {
		// console.log(state.message?.text);
		// if (state.message?.type) {
		// 	console.log(state.message.type);
		// 	const modal = document.querySelector("#modalDialog") as ModalDialogProps;
		// 	modal.message = state.message;
		// 	//modal?.showModal();
		// }
		// const modal = ModalDialog({message=state.message || {text:"", status:0}})
	}

	async function onSubmit(values: z.infer<typeof schema>) {
		console.log(values);

		const res = await addTransporte(values);

		console.log(res);

		// const validation = schema.parse({
		// 	empresaId: values.empresaId.value,
		// 	motoristaId: values.motoristaId.value,
		// 	tomadorId: values.tomadorId?.value,
		// });

		//console.log(validation);
		//if (validation.success) console.log(validation.data);
	}

	function teste(e: any) {
		console.log(e);
		getControl();
	}

	console.log(formState);

	return (
		<Sheet
			modal={false}
			open={open}
			onOpenChange={(e) => {
				onOpenChange(e);
			}}
		>
			<SheetTrigger asChild>
				<button
					onClick={() => setOpen(!open)}
					className={cn(
						"bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
						"shadow-md hover:shadow-lg focus:shadow-lg ease-linear transition-all",
						"rounded-full p-1 cursor-pointer duration-150 select-none",
					)}
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
					{/* <ModalDialog message={state.message} /> */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-3">
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

							<div className="flex justify-center gap-2">
								<Button
									type="button"
									onClick={() => setOpen(false)}
									className="bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:text-white"
								>
									Cancelar
								</Button>
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
