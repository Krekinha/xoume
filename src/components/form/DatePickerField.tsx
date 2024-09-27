"use client";
import { format } from "date-fns";
import {
	Controller,
	type Control,
	type UseFormSetValue,
} from "react-hook-form";
import { ptBR } from "date-fns/locale";

import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";
import { type ReactNode, useId } from "react";
import { LabelField } from "./LabelField";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface DatePickerFieldProps {
	label?: string;
	name: string;
	control: Control<any, any>;
	placeholder?: ReactNode;
	fieldErrors: any;
	defaultValue?: Date;
	isUpdate?: boolean;
	refCalendar?: React.RefObject<any>;
}

export function DatePickerField({
	label,
	name,
	control,
	placeholder,
	fieldErrors,
	defaultValue,
	isUpdate,
	refCalendar,
}: DatePickerFieldProps) {
	const id = useId();
	return (
		<div className="flex flex-col gap-1 mt-1">
			{label && <LabelField label={label} />}
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field: { value, onChange } }) => (
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
									format(value, "P", { locale: ptBR })
								) : (
									<span className="text-blue-500 truncate">
										{placeholder}
									</span>
								)}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50 flex-shrink-0" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								id={id}
								mode="single"
								selected={value ? new Date(value) : undefined}
								onSelect={onChange}
								disabled={(date) =>
									date > new Date() ||
									date < new Date("1900-01-01")
								}
								initialFocus
								classNames={{
									day_selected:
										"dark:bg-amber-300 dark:text-zinc-900 dark:hover:bg-amber-300 dark:hover:text-zinc-900 dark:focus:bg-amber-300 dark:focus:text-zinc-900",
								}}
							/>
						</PopoverContent>
					</Popover>
				)}
			/>

			{fieldErrors && <ErrorField field={name} errors={fieldErrors} />}
		</div>
	);
}
