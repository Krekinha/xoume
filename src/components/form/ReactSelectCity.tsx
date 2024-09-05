"use client";
import Select, { components, type SelectInstance } from "react-select";
import type { SelectItemProps } from "@/utils/types";
import {
	Controller,
	type Control,
	type FieldErrors,
	type FieldValues,
	type UseFormRegister,
} from "react-hook-form";

import { FieldError } from "./FieldError";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { type ReactNode, useId, useRef, useState } from "react";
import { estadosBrasil } from "@/utils/constants";
import { useServerAction } from "zsa-react";
import { getMunicipiosByUf } from "@/server/OthersActions";

const DropdownIndicator = (props: any) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDownIcon className="h-4 w-4 opacity-50" />
		</components.DropdownIndicator>
	);
};

{
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
		selected:
			"after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
	};
	const noOptionsMessageStyles =
		"text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";
}

interface ReactSelectCityProps {
	label?: string;
	nameUf: string;
	nameMunicipio: string;
	control: Control<any, any>;
	register: UseFormRegister<any>;
	items?: SelectItemProps[];
	placeholder?: ReactNode;
	stateError?: FieldErrors<FieldValues>;
}

export function ReactSelectCity({
	label,
	nameUf,
	nameMunicipio,
	control,
	items,
	placeholder,
	stateError,
	...props
}: ReactSelectCityProps) {
	const refMunicipio = useRef<SelectInstance>(null);
	const selectEl = refMunicipio.current;
	const [municipios, setMunicipios] = useState<SelectItemProps[]>([]);
	const [item, setItem] = useState<SelectItemProps | null>(null);
	const { isPending, execute, data, error } =
		useServerAction(getMunicipiosByUf);
	const idUf = useId();
	const idCidade = useId();

	async function buscarMunicipios(uf: string) {
		setMunicipios([]);
		const [data, err] = await execute({ uf: uf });
		if (data) setMunicipios(data);

		selectEl?.focus();
	}

	function onChanged(val: SelectItemProps, onChange: (val?: string) => void) {
		setItem(val);
		onChange(val?.label);
	}

	function onFocus(onChange: (val?: string) => void) {
		if (!item?.label) onChange(item?.label);
	}

	return (
		<div>
			{label && (
				<label className="text-sm font-medium ml-1 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					{label}
				</label>
			)}
			<div className="flex flex-row gap-2">
				<Controller
					name={nameUf}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							{...props}
							instanceId={idUf}
							placeholder="UF"
							unstyled
							components={{ DropdownIndicator }}
							options={estadosBrasil}
							value={estadosBrasil?.find((c) => c.value === value)}
							onChange={(val) => {
								onChange(val?.label);
								setItem(null);
								buscarMunicipios(val?.label ?? "");
							}}
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
										"border rounded-md bg-white hover:cursor-pointer pl-2",
										"dark:bg-zinc-950 dark:border-zinc-800",
										"dark:text-sm dark:text-zinc-100 w-16",
										// "dark:flex dark:h-9 dark:items-center ",
										// "dark:whitespace-nowrap dark:rounded-md border dark:bg-transparent",
										// "dark:shadow-sm dark:ring-offset-pink-600",
										// "dark:ring-offset-zinc-950 ",
										// "focus:dark:ring-1 focus:dark:outline-none",
									),
								placeholder: () => "text-blue-500 pl-1 py-0.5 text-sm",
								input: () => "pl-1 py-0.5",
								valueContainer: () => "gap-1",
								singleValue: () => "leading-7 ml-1",
								multiValue: () =>
									"bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5",
								multiValueLabel: () => "leading-6 py-0.5",
								multiValueRemove: () =>
									"border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md",
								//indicatorsContainer: () => "p-1 gap-1",
								clearIndicator: () =>
									"text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800",
								//indicatorSeparator: () => "bg-gray-300",
								dropdownIndicator: () =>
									"p-1 hover:text-blue-500 rounded-md hover:text-black",
								menu: () =>
									cn(
										"p-1 mt-1 border border-gray-200 bg-white rounded-md text-sm",
										"dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50",
										"overflow-x-hidden overflow-y-hidden no-scrollbar mb-6",
									),
								menuList: () => cn("no-scrollbar"),
								menuPortal: () => "",
								group: () => cn("bg-green-500 overflow-y-hidden"),
								groupHeading: () => "ml-3 mt-2 mb-1 text-gray-500 text-sm",

								option: ({ isFocused, isSelected }) =>
									cn(
										isFocused && "bg-gray-100 dark:bg-zinc-900",
										isSelected && "text-amber-500",
										"hover:cursor-pointer px-2 py-2 rounded",
									),
								noOptionsMessage: () =>
									"text-red-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm",
							}}
						/>
					)}
				/>
				<Controller
					name={nameMunicipio}
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							{...props}
							ref={refMunicipio}
							instanceId={idCidade}
							placeholder={placeholder}
							unstyled
							noOptionsMessage={() => "Sem opções"}
							components={{ DropdownIndicator }}
							options={municipios}
							value={item}
							onChange={(val) => {
								onChanged(val as SelectItemProps, onChange);
							}}
							// onChange(val?.label)}
							onFocus={() => {
								onFocus(onChange);
							}}
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
										"border rounded-md bg-white hover:cursor-pointer pl-2",
										"dark:bg-zinc-950 dark:border-zinc-800",
										"dark:text-sm dark:text-zinc-100",
										// "dark:flex dark:h-9 dark:items-center ",
										// "dark:whitespace-nowrap dark:rounded-md border dark:bg-transparent",
										// "dark:shadow-sm dark:ring-offset-pink-600",
										// "dark:ring-offset-zinc-950 ",
										// "focus:dark:ring-1 focus:dark:outline-none",
									),
								// componente raiz
								container: () => "w-full",
								// componente contendo a descrição do controle quando nenhuma opção foi selecionada
								placeholder: () => "text-blue-500 pl-1 py-0.5 text-sm",
								// componente contendo o input
								input: () => "pl-1 py-0.5",
								// componente entorno do valor do controle, fica atrás do input
								valueContainer: () => "gap-1",
								// componente renderizado para conter valores únicos
								singleValue: () => "leading-7 ml-1",
								// componente renderizado para conter núltiplos valores
								multiValue: () =>
									"bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5",
								// componente contendo o rótulo de cada item em um componente multiValue
								multiValueLabel: () => "leading-6 py-0.5",
								// componente contendo o botão que remove o item em um componente multiValue
								multiValueRemove: () =>
									"border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md",
								//indicatorsContainer: () => "p-1 gap-1",
								clearIndicator: () =>
									"text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800",
								//indicatorSeparator: () => "bg-gray-300",
								dropdownIndicator: () =>
									"p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black",
								menu: () =>
									cn(
										"p-1 mt-1 border border-gray-200 bg-white rounded-md text-sm",
										"dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50 mb-6",
									),
								groupHeading: () => "ml-3 mt-2 mb-1 text-gray-500 text-sm",
								option: ({ isFocused, isSelected }) =>
									cn(
										isFocused && "bg-gray-100 dark:bg-zinc-900",
										isSelected &&
											"after:content-['✔'] after:ml-3 after:text-sm after:text-center after:text-blue-500 text-amber-500",
										"hover:cursor-pointer px-3 py-2 rounded",
									),
								noOptionsMessage: () =>
									"dark:text-gray-600 p-2 bg-gray-transparent border border-dashed border-gray-700 rounded-md",
							}}
						/>
					)}
				/>
			</div>

			{stateError && <FieldError field={nameUf} errors={stateError} />}
			{stateError && <FieldError field={nameMunicipio} errors={stateError} />}
		</div>
	);
}
