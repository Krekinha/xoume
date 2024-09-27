"use client";
import Select, { components, type SelectInstance } from "react-select";
import type { SelectItemProps } from "@/utils/types";
import {
	Controller,
	type Control,
	type UseFormSetValue,
} from "react-hook-form";

import { ErrorField } from "./ErrorField";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import { estadosBrasil } from "@/utils/constants";
import { useServerAction } from "zsa-react";
import { getMunicipiosByUf } from "@/server/OthersActions";
import QueryStatus from "../main/QueryStatus";
import { LabelField } from "./LabelField";

const DropdownIndicator = (props: any) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDownIcon className="h-4 w-4 opacity-50" />
		</components.DropdownIndicator>
	);
};

type itemsUfProps = {
	label: string;
	value: number;
};

interface ReactSelectCityProps {
	label?: string;
	control: Control<any, any>;
	setValue: UseFormSetValue<any>;
	placeholder?: ReactNode;
	fieldErrors: any;
	nameUf: string;
	refUf?: React.RefObject<any>;
	defaultValueUf?: any;
	itemsUf?: itemsUfProps[];
	nameMunicipio: string;
	refMunicipio?: React.RefObject<any>;
	defaultValueMunicipio?: any;
	isUpdate?: boolean;
}

export function ReactSelectCity({
	label,
	nameUf,
	refUf,
	itemsUf,
	nameMunicipio,
	refMunicipio,
	defaultValueUf,
	defaultValueMunicipio,
	control,
	setValue,
	placeholder,
	fieldErrors,
	isUpdate,
	...props
}: ReactSelectCityProps) {
	const [municipios, setMunicipios] = useState<SelectItemProps[]>([]);
	const [item, setItem] = useState<SelectItemProps | null>(null);
	const { isPending, execute, error, isError } =
		useServerAction(getMunicipiosByUf);
	const idUf = useId();
	const idCidade = useId();

	useEffect(() => {
		const fetchMunicipios = async () => {
			if (isUpdate) {
				await initialUpdateData();
			}
		};
		fetchMunicipios();
	}, [isUpdate]);

	async function initialUpdateData() {
		if (defaultValueUf) {
			const ufItem = itemsUf?.find((uf) => uf.label === defaultValueUf);

			refUf?.current.setValue(ufItem);

			if (defaultValueMunicipio) {
				const [data, err] = await execute({
					uf: defaultValueUf,
				});
				if (err) console.log(err);
				if (data) {
					const municipioItem = data.find(
						(m) => m.label === defaultValueMunicipio,
					);
					if (municipioItem) {
						setMunicipios([]);
						setMunicipios(data);
						refMunicipio?.current.setValue(municipioItem);
					}
				}
			}
		}
	}

	async function buscarMunicipios(uf: string) {
		setMunicipios([]);
		const [data, err] = await execute({ uf: uf });
		if (err) console.log(err);
		if (data) setMunicipios(data);
	}

	function onChangeMunicipio(val: SelectItemProps | any) {
		setItem(val);
		setValue(nameMunicipio, val?.label);
	}

	return (
		<div>
			{/* <QueryStatus
				isLoading={isPending}
				loadingNode={<span>Buscando...</span>}
				isError={isError}
				error={{
					message: error?.message ?? "",
					name: error?.name ?? "",
					code: error?.code ?? "ERROR",
					data: error?.data ?? "",
				}}
			/> */}
			{label && <LabelField label={label} />}
			<div className="flex flex-row gap-2">
				<Controller
					name={nameUf}
					control={control}
					render={({ field: { onChange, value, ref } }) => (
						<Select
							{...props}
							ref={refUf}
							instanceId={idUf}
							placeholder="UF"
							unstyled
							components={{ DropdownIndicator }}
							options={itemsUf}
							value={itemsUf?.find((c) => c.value === value)}
							onChange={(val) => {
								onChange(val?.label);
								setItem(null);
								setValue(nameMunicipio, undefined);
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
										"dark:text-sm dark:text-gray-400 w-16",
									),
								placeholder: () =>
									"text-blue-500 pl-1 py-0.5 text-sm",
								input: () => "pl-1 py-0.5",
								valueContainer: () => "gap-1",
								singleValue: () => "leading-7 ml-1",
								//indicatorsContainer: () => "p-1 gap-1",
								clearIndicator: () =>
									"text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800",
								//indicatorSeparator: () => "bg-gray-300",
								dropdownIndicator: () =>
									"p-1 hover:text-blue-500 rounded-md hover:text-black",
								menu: () =>
									cn(
										"p-1 mt-1 border border-gray-200 bg-white rounded-md text-sm",
										"dark:bg-zinc-950 dark:border-zinc-800 dark:text-gray-400",
										"overflow-x-hidden overflow-y-hidden no-scrollbar mb-6",
									),
								menuList: () => cn("no-scrollbar"),
								menuPortal: () => "",
								group: () =>
									cn("bg-green-500 overflow-y-hidden"),
								groupHeading: () =>
									"ml-3 mt-2 mb-1 text-gray-500 text-sm",

								option: ({ isFocused, isSelected }) =>
									cn(
										isFocused &&
											"bg-gray-100 dark:bg-zinc-900",
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
					render={({ field }) => (
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
							onChange={(newValue) => onChangeMunicipio(newValue)}
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
										"dark:text-sm dark:text-gray-400",
									),
								// componente raiz
								container: () => "w-full",
								// componente contendo a descrição do controle quando nenhuma opção foi selecionada
								placeholder: () =>
									"text-blue-500 pl-1 py-0.5 text-sm",
								// componente contendo o input
								input: () => "pl-1 py-0.5",
								// componente entorno do valor do controle, fica atrás do input
								valueContainer: () => "gap-1",
								// componente renderizado para conter valores únicos
								singleValue: () => "leading-7 ml-1",
								//indicatorsContainer: () => "p-1 gap-1",
								clearIndicator: () =>
									"text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800",
								//indicatorSeparator: () => "bg-gray-300",
								dropdownIndicator: () =>
									"p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black",
								menu: () =>
									cn(
										"p-1 mt-1 border border-gray-200 bg-white rounded-md text-sm",
										"dark:bg-zinc-950 dark:border-zinc-800 dark:text-gray-400 mb-6",
									),
								groupHeading: () =>
									"ml-3 mt-2 mb-1 text-gray-500 text-sm",
								option: ({ isFocused, isSelected }) =>
									cn(
										isFocused &&
											"bg-gray-100 dark:bg-zinc-900",
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

			{fieldErrors && <ErrorField field={nameUf} errors={fieldErrors} />}
			{fieldErrors && (
				<ErrorField field={nameMunicipio} errors={fieldErrors} />
			)}
		</div>
	);
}
