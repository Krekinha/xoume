"use client";
import { format } from "date-fns";
import {
	Controller,
	type Control,
	type UseFormSetValue,
} from "react-hook-form";

import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";
import { type ReactNode, useId, useState } from "react";
import { LabelField } from "./LabelField";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { FormControl } from "../ui/form";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface DatePickerFieldProps {
	label?: string;
	name: string;
	control: Control<any, any>;
	placeholder?: ReactNode;
	setValue: UseFormSetValue<any>;
	fieldErrors: any;
}

export function DatePickerField({
	label,
	name,
	control,
	placeholder,
	setValue,
	fieldErrors,
	...props
}: DatePickerFieldProps) {
	const id = useId();

	// function onChangeValues(newValue: MultiValue<SelectItemProps>) {
	// 	const atualNotas = newValue.map((item) => item.value);
	// 	setValue("notas", atualNotas);
	// 	setMultiValue(newValue);
	// }

	return (
		<div className="flex flex-col gap-1 mt-1">
			{label && <LabelField label={label} />}
			<Controller
				name={name}
				control={control}
				render={({ field: { ref, value, onChange } }) => (
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-full pl-3 text-left h-[38px] font-normal",
									!value && "text-muted-foreground",
								)}
							>
								{value ? (
									format(value, "PPP")
								) : (
									<span className="text-blue-500">{placeholder}</span>
								)}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={value}
								onSelect={onChange}
								disabled={(date) =>
									date > new Date() || date < new Date("1900-01-01")
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				)}
			/>

			{fieldErrors && <ErrorField field={name} errors={fieldErrors} />}
		</div>
	);
}
