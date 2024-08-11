"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import type { Empresa, ResponseAction } from "@/utils/types";
import { addTransporte } from "@/server/TransporteActions";
import { useFormState } from "react-dom";
import { FieldError } from "@/components/FieldError";

interface IFormInput {
	empresaId: string;
	motoristaId: number;
}

const initialState: ResponseAction = {
	errors: [],
	message: {},
};

export function FormTeste() {
	const [state, formAction] = useFormState(addTransporte, initialState);
	const { register } = useForm<IFormInput>();

	const motoristas = [
		{ label: "RENIVALDO", value: 1 },
		{ label: "FABRICIO", value: 2 },
	] as const;

	console.log(state);

	return (
		<form action={formAction}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col">
					<label>Empresa</label>
					<input {...register("empresaId")} className="border-white border" />
					<FieldError field="empresaId" state={state} />
				</div>
				<div className="flex flex-col">
					<label>Motorista</label>
					<select {...register("motoristaId")} className="border-white border">
						<option value={0}>Selecione um motorista</option>
						{motoristas.map((motorista) => (
							<option key={motorista.value} value={motorista.value}>
								{motorista.label}
							</option>
						))}
					</select>
					<FieldError field="motoristaId" state={state} />
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
