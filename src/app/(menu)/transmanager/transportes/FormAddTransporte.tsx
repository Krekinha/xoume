//"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";
import { baseUrl } from "@/utils/constants";
import { addTransporte } from "@/server/TransporteActions";
import type { Empresa } from "@/utils/types";

const formSchema = z.object({
	empresaId: z.coerce
		.number()
		.positive({ message: "Selecione uma opção válida" }),
});

interface FormAddTransporteProps {
	empresas: Empresa[];
}

export function FormAddTransporte({ empresas }: FormAddTransporteProps) {
	//const { setOpen, getTransportes } = useTransporteStore();
	const url = baseUrl("/transportes/add");
	console.log(empresas);

	// async function getEmpresass() {
	// 	const empresas = await getEmpresas();
	// 	console.log(empresas);
	// 	return empresas;
	// }

	// 1. Define o formulário
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			empresaId: 0,
		},
	});

	// 2. Define a o evento submit
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			//const response = await addTransporte(values);
			//console.log(response);
		} catch (error) {
			//console.error("Erro ao adicionar o transporte:", error);
			// Aqui eu posso adicionar um tratamento de erro, como por exemplo mostrar uma mensagem de erro na interface do usuário.
		}
	}

	return (
		// <Form {...form}>
		// 	<form action={addTransporte} className="space-y-8">
		// 		<FormField
		// 			control={form.control}
		// 			name="empresaId"
		// 			render={({ field }) => (
		// 				<FormItem>
		// 					<FormLabel>Empresa</FormLabel>
		// 					<Select
		// 						onValueChange={field.onChange}
		// 						defaultValue={field.value.toString()}
		// 					>
		// 						<FormControl>
		// 							<SelectTrigger>
		// 								<SelectValue placeholder="Selecione uma empresa" />
		// 							</SelectTrigger>
		// 						</FormControl>
		// 						<SelectContent>
		// 							<SelectItem value="0">Selecione uma empresa</SelectItem>
		// 							{empresas?.map((empresa: Empresa) => (
		// 								<SelectItem
		// 									key={empresa.id}
		// 									value={empresa.id?.toString() || "0"}
		// 								>
		// 									{empresa.razaoNome}
		// 								</SelectItem>
		// 							))}
		// 						</SelectContent>
		// 					</Select>
		// 					<FormMessage className="text-red-600 ml-1 text-xs" />
		// 				</FormItem>
		// 			)}
		// 		/>
		// 		<Button
		// 			type="submit"
		// 			className="bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white"
		// 		>
		// 			Salvar
		// 		</Button>

		// 		<DialogClose asChild>
		// 			<Button
		// 				type="button"
		// 				variant="destructive"
		// 				className="bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white ml-2"
		// 			>
		// 				Cancelar
		// 			</Button>
		// 		</DialogClose>
		// 	</form>
		// </Form>

		<Form {...form}>
			<form action={addTransporte}>
				<FormField
					control={form.control}
					name="empresaId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white"
				>
					Salvar
				</Button>

				<DialogClose asChild>
					<Button
						type="button"
						variant="destructive"
						className="bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white ml-2"
					>
						Cancelar
					</Button>
				</DialogClose>
			</form>
		</Form>
	);
}
