"use client";
import type { UseFormRegister } from "react-hook-form";

import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";
import { useId } from "react";
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
			type,
			register,
			...props
		},
		ref,
	) => {
		const id = useId();
		return (
			<div>
				{label && <LabelField label={label} />}
				<Input
					{...props}
					{...register(name)}
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
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

export default InputField;
