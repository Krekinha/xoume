"use client";
import { Controller, useController, type Control } from "react-hook-form";

import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { LabelField } from "./LabelField";
import { Input } from "../ui/input";
import React from "react";
import { number } from "zod";

interface NumberInputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: string;
	control: Control<any, any>;
	placeholder?: string;
	fieldErrors?: any;
}

const NumberInputField = React.forwardRef<
	HTMLInputElement,
	NumberInputFieldProps
>(
	(
		{
			label,
			name,
			placeholder,
			fieldErrors,
			className,
			control,
			type,
			pattern,
			defaultValue,
			...props
		},
		ref,
	) => {
		const id = useId();
		const {
			field,
			fieldState: { error },
		} = useController({
			name,
			control,
		});

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			const keysPermitidas = [
				"0",
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"Backspace",
				"ArrowLeft",
				"ArrowRight",
				"Tab",
			];
			if (!keysPermitidas.includes(e.key)) {
				e.preventDefault();
			}
		};

		const formatValue = (value: string) => {
			// Remove todos os caracteres não numéricos
			return value.replace(/\D/g, "");
		};

		return (
			<div>
				{label && <LabelField label={label} />}
				<Controller
					name={name}
					control={control}
					defaultValue={() => {
						if (
							defaultValue === undefined ||
							defaultValue === null
						) {
							return "";
						}
						return defaultValue;
					}}
					render={({ field: { value, onChange } }) => (
						<Input
							{...props}
							ref={ref}
							id={id}
							type="text"
							inputMode="numeric"
							placeholder={placeholder}
							value={value}
							onChange={(e) => {
								const formattedValue = formatValue(
									e.target.value,
								);
								onChange(
									formattedValue === ""
										? ""
										: Number(formattedValue),
								);
							}}
							onKeyDown={handleKeyDown}
							className={cn(
								"dark:bg-zinc-950 dark:border-zinc-800",
								"dark:text-sm dark:text-gray-400 h-[38px]",
								"max-h-[38px] placeholder-blue-500",
								className,
							)}
						/>
					)}
				/>

				{fieldErrors && (
					<ErrorField field={name} errors={fieldErrors} />
				)}
			</div>
		);
	},
);

NumberInputField.displayName = "NumberInputField";

export { NumberInputField };
