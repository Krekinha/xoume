"use client";

import { useRouter } from "next/navigation";
import { ReactSelect } from "@/components/form/ReactSelect";
import { Button } from "@/components/ui/button";
import { addTransporte } from "@/server/TransporteActions";
import type { Empresa, Motorista, Tomador } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { ReactSelectCity } from "@/components/form/ReactSelectCity";
import { useServerAction } from "zsa-react";
import { useModalDialogContext } from "@/providers/ModaDialogProvider";

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
});

export function FormAddTransporte({
	empresas,
	motoristas,
	tomadores,
}: FormAddTransporteProps) {
	const { isPending, execute, data, error } = useServerAction(addTransporte);
	const { setModalDialog } = useModalDialogContext();
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

	function onClose(data: any) {
		if (data) {
			router.push("/transmanager");
			console.log("indo para /transmanager");
		}
	}

	async function onSubmit(values: z.infer<typeof schema>) {
		console.log(values);

		const [data, err] = await execute(values);

		console.log(data);
		console.log(err);

		setModalDialog({
			open: true,
			data: data ? data : null,
			error: err
				? { code: err.code, name: err.name, message: err.message }
				: undefined,
			onClose: () => onClose(data),
		});
		// if (res.message) {
		// 	setModalMessage(res.message);
		// 	setIsModalOpen(true);
		// }
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

					<div className="flex justify-center mt-10 gap-2">
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
