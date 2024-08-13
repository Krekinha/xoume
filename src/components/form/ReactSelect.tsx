"use client";
import Select, { components, type DropdownIndicatorProps } from "react-select";
import type { SelectItemProps } from "@/utils/types";
import {
	Controller,
	type Control,
	type FieldValues,
	type UseFormRegister,
} from "react-hook-form";

import { FieldError } from "./FieldError";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Label } from "../ui/label";

const DropdownIndicator = (props: any) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDownIcon className="h-4 w-4 opacity-50" />
		</components.DropdownIndicator>
	);
};

// Styles
const controlStyles = {
	base: "border rounded-lg bg-white hover:cursor-pointer",
	focus: "border-primary-600 ring-1 ring-primary-500",
	nonFocus: "border-gray-300 hover:border-gray-400",
};
const placeholderStyles = "text-gray-500 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
	"bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
	"border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
	"text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "bg-gray-300";
const dropdownIndicatorStyles =
	"p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
	base: "hover:cursor-pointer px-3 py-2 rounded",
	focus: "bg-gray-100 active:bg-gray-200",
	selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
	"text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

interface ReactSelectProps {
	label?: string;
	name: string;
	control: Control<any, any>;
	register: UseFormRegister<any>;
	items?: SelectItemProps[];
	placeholder?: ReactNode;
	stateError?: any;
}

export function ReactSelect({
	label,
	name,
	control,
	register,
	items,
	placeholder,
	stateError,
	...props
}: ReactSelectProps) {
	return (
		<>
			{label && <Label className="mb-2">{label}</Label>}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select
						{...register(name)}
						{...field}
						{...props}
						placeholder={placeholder}
						unstyled
						components={{ DropdownIndicator }}
						options={items}
						styles={{
							input: (base) => ({
								...base,
								"input:focus": {
									boxShadow: "none",
								},
							}),
							// On mobile, the label will truncate automatically, so we want to
							// override that behaviour.
							multiValueLabel: (base) => ({
								...base,
								whiteSpace: "normal",
								overflow: "visible",
							}),
							control: (base) => ({
								...base,
								transition: "none",
							}),
						}}
						classNames={{
							control: ({ isFocused }) =>
								cn(
									isFocused
										? "border-primary-600 ring-1 ring-primary-500"
										: "border-gray-300 hover:border-gray-400",
									"border rounded-lg bg-white hover:cursor-pointer",
									// "dark:flex dark:h-9 dark:items-center ",
									// "dark:text-sm",
									// "dark:whitespace-nowrap dark:rounded-md border dark:bg-transparent",
									// "dark:shadow-sm dark:ring-offset-pink-600",
									// "dark:placeholder:text-red-500 dark:placeholder:text-red-400",
									// "dark:text-zinc-300",
									// "dark:border-zinc-800 dark:ring-offset-zinc-950 ",
									// isFocused ? "dark:ring-1 dark:outline-none" : "",
								),
							placeholder: () => "text-blue-500 pl-3 py-0.5",
							input: () => "pl-3 py-0.5",
							valueContainer: () => "p-1 gap-1",
							singleValue: () => singleValueStyles,
							multiValue: () => multiValueStyles,
							multiValueLabel: () => multiValueLabelStyles,
							multiValueRemove: () => multiValueRemoveStyles,
							indicatorsContainer: () => indicatorsContainerStyles,
							clearIndicator: () => clearIndicatorStyles,
							indicatorSeparator: () => indicatorSeparatorStyles,
							dropdownIndicator: () => dropdownIndicatorStyles,
							menu: () => menuStyles,
							groupHeading: () => groupHeadingStyles,
							option: ({ isFocused, isSelected }) =>
								cn(
									isFocused && optionStyles.focus,
									isSelected && optionStyles.selected,
									optionStyles.base,
								),
							noOptionsMessage: () => noOptionsMessageStyles,
						}}
					/>
				)}
			/>

			{stateError && <FieldError field={name} state={stateError} />}
		</>
	);
}
