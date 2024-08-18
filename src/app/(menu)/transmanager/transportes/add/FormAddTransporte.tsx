"use client";

import { useRouter } from "next/navigation";
import { ReactSelect } from "@/components/form/ReactSelect";
import { Button } from "@/components/ui/button";
import { addTransporte } from "@/server/TransporteActions";
import {
	TipoMessage,
	type Empresa,
	type Message,
	type Motorista,
	type Tomador,
} from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ModalDialog, { type ModalDialogProps } from "@/components/ModalDialog";
import React, { useState } from "react";

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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState<Message>({});
	const router = useRouter();
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
		if (modalMessage?.type === TipoMessage.SUCCESS) {
			console.log("success");
			router.push("/transmanager");
			setIsModalOpen(false);
		}

		if (modalMessage?.type === TipoMessage.ERROR) {
			setIsModalOpen(false);
		}
	}

	async function onSubmit(values: z.infer<typeof schema>) {
		console.log(values);

		const res = await addTransporte(values);
		console.log(res);

		if (res.message) {
			setModalMessage(res.message);
			setIsModalOpen(true);
		}
	}

	return (
		<div id="frmRoot" className="h-full px-3 pb-4">
			{isModalOpen && (
				<ModalDialog
					isOpen={isModalOpen}
					message={modalMessage}
					onClose={onClose}
				/>
			)}
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
