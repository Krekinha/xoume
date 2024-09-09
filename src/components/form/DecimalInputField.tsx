"use client";
import { Controller, type Control } from "react-hook-form";

import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";
import { useId, useRef, type KeyboardEventHandler } from "react";
import { LabelField } from "./LabelField";
import { Input } from "../ui/input";
import React from "react";

interface DecimalInputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: string;
	control: Control<any, any>;
	placeholder?: string;
	fieldErrors?: any;
}

const DecimalInputField = React.forwardRef<
	HTMLInputElement,
	DecimalInputFieldProps
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
			...props
		},
		ref,
	) => {
		const id = useId();

		const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
			const allowedKeys = [
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
				",",
				"Backspace",
				"ArrowLeft",
				"ArrowRight",
				"Tab",
			];
			if (!allowedKeys.includes(e.key)) {
				e.preventDefault();
			}
		};

		const formatValue = (value: string) => {
			// Remove todos os caracteres não numéricos, exceto vírgula
			const numericValue = value.replace(/[^\d,]/g, "");
			// Garante que há apenas uma vírgula
			const parts = numericValue.split(",");
			if (parts.length > 2) {
				return `${parts[0]},${parts.slice(1).join("")}`;
			}
			return numericValue;
		};

		return (
			<div>
				{label && <LabelField label={label} />}
				<Controller
					name={name}
					control={control}
					render={({ field: { ref, value, onChange } }) => (
						<Input
							{...props}
							id={id}
							type="text"
							inputMode="decimal"
							placeholder={placeholder}
							value={value}
							onChange={(e) => {
								const formattedValue = formatValue(e.target.value);
								onChange(formattedValue);
							}}
							onKeyDown={handleKeyDown}
							className={cn(
								"dark:bg-zinc-950 dark:border-zinc-800",
								"dark:text-sm dark:text-gray-400 h-[38px]",
								"max-h-[38px] placeholder-blue-500",
								// as linhas abaixo seguir removem as arrows do input do tipo number
								"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none",
								"[&::-webkit-inner-spin-button]:appearance-none",
								className,
							)}
						/>
					)}
				/>

				{fieldErrors && <ErrorField field={name} errors={fieldErrors} />}
			</div>
		);
	},
);

DecimalInputField.displayName = "DecimalInputField";

export { DecimalInputField };
