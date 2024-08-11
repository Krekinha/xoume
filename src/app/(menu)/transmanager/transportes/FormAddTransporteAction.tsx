"use client";
import { useFormState, useFormStatus } from "react-dom";
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

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
//import { DialogClose } from "@radix-ui/react-dialog";
import type { Empresa, ResponseAction } from "@/utils/types";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { addTransporte } from "@/server/TransporteActions";

interface FormAddTransporteProps {
	empresas: Empresa[];
	action: (_prevState: any, params: FormData) => Promise<ResponseAction>;
}

const findErrors = (fieldName: string, state: ResponseAction) => {
	return state?.errors
		?.filter((item) => {
			return item.path.includes(fieldName);
		})
		.map((item) => item.message);
};

const initialState: ResponseAction = {
	errors: [],
	message: {},
};

export function FormAddTransporteAction({
	empresas,
	action,
}: FormAddTransporteProps) {
	//const { setOpen, getTransportes } = useTransporteStore();
	const [state, formAction] = useFormState(addTransporte, initialState);

	console.log(state);

	const empresaIdErrors = findErrors("empresaId", { errors: state.errors });

	console.log(empresaIdErrors);

	function onSubmit(values: any) {
		console.log(values);
	}

	// 1. Define o formulário
	const form = useForm({
		defaultValues: {
			empresaId: 0,
			motoristaId: "1",
		},
	});

	const motoristas = [
		{ label: "RENIVALDO", value: "1" },
		{ label: "FABRICIO", value: "2" },
	] as const;

	return (
		<Form {...form}>
			<form action={formAction} method="POST" id="form1" className="space-y-8">
				{/* <SelectContent>
					<SelectItem value="0">Selecione uma empresa</SelectItem>
					{empresas?.map((empresa: Empresa) => (
						<SelectItem key={empresa.id} value={empresa.id?.toString() || "0"}>
							{empresa.razaoNome}
						</SelectItem>
					))}
				</SelectContent> */}

				<FormField
					control={form.control}
					name="empresaId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Empresa</FormLabel>
							<FormControl>
								<Input placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="motoristaId"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Language</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-[200px] justify-between",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value
												? motoristas.find(
														(motorista) => motorista.value === field.value,
													)?.label
												: "Select language"}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0">
									<Command>
										<CommandInput
											placeholder="Search framework..."
											className="h-9"
										/>
										<CommandList>
											<CommandEmpty>No framework found.</CommandEmpty>
											<CommandGroup>
												{motoristas.map((motorista) => (
													<CommandItem
														value={motorista.label}
														key={motorista.value}
														onSelect={() => {
															form.setValue("motoristaId", motorista.value);
														}}
													>
														{motorista.label}
														<CheckIcon
															className={cn(
																"ml-auto h-4 w-4",
																motorista.value === field.value
																	? "opacity-100"
																	: "opacity-0",
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					form="form1"
					className="bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 dark:text-white"
				>
					Salvar
				</Button>

				{/* <DialogClose asChild>
					<Button
						type="button"
						variant="destructive"
						className="bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white ml-2"
					>
						Cancelar
					</Button>
				</DialogClose> */}
			</form>
		</Form>
	);
}
