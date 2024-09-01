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
import ModalDialog from "@/components/transmanager/ModalDialog";

interface FormAddTransporteProps {
	empresas: Empresa[];
	motoristas: Motorista[];
	tomadores: Tomador[];
}

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

export function FormAddTransporte({
	empresas,
	motoristas,
	tomadores,
}: FormAddTransporteProps) {
	const { isPending, execute, data, error } = useServerAction(addTransporte);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalResponse, setModalResponse] = useState<any>({});
	const router = useRouter();
	const { register, control, handleSubmit, formState } = useForm<
		z.infer<typeof schema>
	>({
		resolver: zodResolver(schema),
		defaultValues: {
			empresaId: 0,
			motoristaId: 0,
		},
	});

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

	function onClose() {
		if (data) {
			router.push("/transmanager");
			//setIsModalOpen(false);
			console.log(data);
		}
		console.log("nada");
		router.push("/transmanager");
		// if (error) {
		// 	setIsModalOpen(false);
		// }
	}

	async function onSubmit(values: z.infer<typeof schema>) {
		console.log(values);

		const [data, err] = await execute(values);

		console.log(data);
		console.log(err);

		setModalResponse({ data: data, err: err });
		setIsModalOpen(true);
		// if (res.message) {
		// 	setModalMessage(res.message);
		// 	setIsModalOpen(true);
		// }
	}

	return (
		<div className="h-full w-full bg-zinc-800">
			<ModalDialog
				isOpen={isModalOpen}
				data={modalResponse.data}
				err={modalResponse.err}
				onClose={onClose}
			/>
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
						nameUf="tomadorId"
						nameCidade=""
						label="Origem"
						control={control}
						register={register}
						items={tomadorItems()}
						placeholder="Selecione um tomador"
						stateError={formState.errors}
					/>

					<div className="flex justify-center gap-2">
						<Button
							type="button"
							onClick={() => router.push("/transmanager")}
							className="bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:text-white"
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							className="bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white shadow-md dark:shadow-black"
						>
							Enviar
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
