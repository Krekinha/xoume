"use client";
import type { UseFormGetValues, UseFormRegister } from "react-hook-form";

import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";
import { useId, useRef, useState, type KeyboardEventHandler } from "react";
import { LabelField } from "./LabelField";
import { Input } from "../ui/input";
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: string;
	register: UseFormRegister<any>;
	placeholder?: string;
	fieldErrors?: any;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			label,
			name,
			placeholder,
			fieldErrors,
			className,
			register,
			type,
			pattern,
			...props
		},
		ref,
	) => {
		const id = useId();
		const refInput = useRef<HTMLInputElement>(null);
		// const elem = refInput.current;
		// const [value, setValue] = useState("");
		const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
			const charCode = e.key;

			// Permite apenas números, vírgulas e pontos e Backspace
			if (
				(charCode >= "0" && charCode <= "9") ||
				charCode === "," ||
				charCode === "." ||
				charCode === "Backspace"
			) {
				console.log();

				// Verifica se o caractere pressionado violaria alguma das regras
				if (violatesRules(charCode, props.value?.toString())) {
					console.log(e.key);
					e.preventDefault();
				}
				return;
			}

			// Previne que caracteres inválidos sejam inseridos
			e.preventDefault();

			console.log(e.key);
		};

		return (
			<div>
				{label && <LabelField label={label} />}
				<Input
					{...props}
					{...register(name)}
					id={id}
					// ref={refInput}
					type={type}
					placeholder={placeholder}
					// pattern={"[0-9]{2}"}
					step={"0.01"}
					// pattern="/[0-9\.\,]+/"
					// pattern={pattern}
					onKeyDownCapture={handleKeyDown}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
						}
					}}
					className={cn(
						"dark:bg-zinc-950 dark:border-zinc-800",
						"dark:text-sm dark:text-gray-400 h-[38px]",
						"placeholder-blue-500",
						// as linhas abaixo seguir removem as arrows do input do tipo number
						"[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none",
						"[&::-webkit-inner-spin-button]:appearance-none",
						className,
					)}
				/>
				{/* )}
				/> */}

				{fieldErrors && <ErrorField field={name} errors={fieldErrors} />}
			</div>
		);
	},
);

InputField.displayName = "InputField";

export { InputField };

function violatesRules(charCode: string, currentValue = ""): boolean {
	console.log(currentValue);
	// Função auxiliar para verificar se o caractere pressionado violaria alguma das regras
	const lastChar = currentValue[currentValue.length - 1];

	if (charCode === "," && (lastChar === "," || lastChar === ".")) return true;
	if (charCode === "." && (lastChar === "," || lastChar === ".")) return true;

	return false;
}
