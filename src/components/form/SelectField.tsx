"use client";
import type { SelectItemProps } from "@/utils/types";
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
import { Label } from "../ui/label";

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
			<Label className="mb-2">Motorista</Label>
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
								<SelectItem
									key={item.label}
									value={item?.value?.toString() as string}
								>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			{stateError && <FieldError field={name} errors={stateError} />}
		</>
	);
}
