"use client";
import type { SelectItemProps } from "@/utils/types";
import { FormLabel } from "./FormLabel";
import {
	Controller,
	type Control,
	type FieldValues,
	type UseFormRegister,
} from "react-hook-form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { FieldError } from "./FieldError";
import { CommandInput } from "../ui/command";

interface SelectFieldProps {
	name: string;
	control: Control<any, any>;
	register: UseFormRegister<any>;
	items?: SelectItemProps[];
	displayItem?: string;
	stateError?: any;
}

export function SelectField({
	name,
	control,
	register,
	items,
	displayItem,
	stateError,
}: SelectFieldProps) {
	return (
		<>
			<FormLabel className="mb-2">Motorista</FormLabel>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select
						{...register(name)}
						onValueChange={field.onChange}
						defaultValue={field.value}
					>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{displayItem && <SelectItem value="0">{displayItem}</SelectItem>}

							{items?.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			{stateError && <FieldError field={name} state={stateError} />}
		</>
	);
}
