"use client";
import type { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import type { SelectItemProps } from "@/utils/types";
import {
	Controller,
	type Control,
	type UseFormSetValue,
} from "react-hook-form";

import { ErrorField } from "./ErrorField";
import { cn } from "@/lib/utils";
import {
	type KeyboardEventHandler,
	type ReactNode,
	useId,
	useState,
} from "react";
import { LabelField } from "./LabelField";
import { components } from "react-select";

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

interface ReactSelectProps {
	label?: string;
	name: string;
	control: Control<any, any>;
	placeholder?: ReactNode;
	setValue: UseFormSetValue<any>;
	fieldErrors: any;
}

const createOption = (label: string) => ({
	label: label,
	value: label,
});

const CustomInput = (props: any) => (
	<components.Input {...props} inputMode="decimal" />
);

const CustomDropdownIndicator = (props: any) => (
	<components.DropdownIndicator {...props}>
		<button />
	</components.DropdownIndicator>
);

export function ReactSelectInputMulti({
	label,
	name,
	control,
	placeholder,
	setValue,
	fieldErrors,
	...props
}: ReactSelectProps) {
	const id = useId();
	const [inputValue, setInputValue] = useState("");
	const [multiValue, setMultiValue] = useState<MultiValue<SelectItemProps>>([]);
	const [localError, setLocalError] = useState("");

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
		"Enter",
	];

	const handleKeyDown: KeyboardEventHandler = (e) => {
		if (!keysPermitidas.includes(e.key)) {
			e.preventDefault();
		}
		if (!inputValue) return;

		switch (e.key) {
			case "Enter":
			case "Tab":
				e.preventDefault();
				// se o valor atual de inputValue já existe no estado, não adiciona novamente
				if (multiValue.some((item) => item.value === inputValue)) {
					setLocalError("Item já adicionado");
					return;
				}
				setLocalError("");
				setRealMultiValues();
				setMultiValue((prev) => [...prev, createOption(inputValue)]);
				setInputValue("");
				break;
		}
	};

	function setRealMultiValues() {
		/**
		 * Chamar a função setMultiValue não altera o estado do código em execução
		 * somente os componentes no DOM, por isso essa função foi criada para prever o
		 * estado atual de multiValue e usa-lo para setar o campo "notas" no formState
		 */

		// pega valor "atual" do estado
		const prevNotas = multiValue.map((item) => item.value);

		// faz merge com o valor atual de inputValue
		const atualNotas = [...prevNotas, inputValue];

		// atualiza o campo "notas" no formState
		setValue("notas", atualNotas);
	}

	function onChangeValues(newValue: MultiValue<SelectItemProps>) {
		const atualNotas = newValue.map((item) => item.value);
		setValue("notas", atualNotas);
		setMultiValue(newValue);
	}

	return (
		<div>
			{label && <LabelField label={label} />}
			<Controller
				name={name}
				control={control}
				render={({ field: { ref } }) => (
					<CreatableSelect
						{...props}
						ref={ref}
						instanceId={id}
						placeholder={placeholder}
						unstyled
						components={{
							DropdownIndicator: CustomDropdownIndicator,
							Input: CustomInput,
						}}
						inputValue={inputValue}
						isClearable={false}
						isMulti
						menuIsOpen={false}
						onChange={(newValue) => onChangeValues(newValue)}
						onInputChange={(newValue) => setInputValue(newValue)}
						onKeyDown={handleKeyDown}
						value={multiValue}
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
									"border rounded-md bg-white hover:cursor-pointer px-2",
									"dark:bg-zinc-950 dark:border-zinc-800",
									"dark:text-sm dark:text-gray-400 ",
								),
							placeholder: () => "text-blue-500 pl-1 py-0.5 text-sm truncate",
							input: () => cn("pl-1 py-0.5 truncate"),
							valueContainer: () => "gap-1",
							singleValue: () => "leading-7 ml-1",
							multiValue: () =>
								cn(
									"rounded-full border p-0.5 border-gray-700 pl-2 pr-1 gap-1.5 py-[0.05rem] items-center",
									"cursor-default",
								),
							// componente contendo o rótulo de cada item em um componente multiValue
							multiValueLabel: () => "text-gray-400",
							// componente contendo o botão que remove o item em um componente multiValue
							multiValueRemove: () =>
								cn(
									// "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800",
									// "text-gray-500 hover:border-red-300 rounded-md",
									"text-red-500 hover:text-red-600 ",
								),
							//indicatorsContainer: () => "p-1 gap-1",
							clearIndicator: () =>
								"text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800",
							//indicatorSeparator: () => "bg-gray-300",
							dropdownIndicator: () =>
								"p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black",
							menu: () =>
								cn(
									"p-1 mt-1 border border-gray-200 bg-white rounded-md text-sm",
									"dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50",
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
								"text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm",
						}}
					/>
				)}
			/>

			{fieldErrors && <ErrorField field={name} errors={fieldErrors} />}
			{localError && (
				<p className="text-[#f02424] ml-1 text-xs">{localError}</p>
			)}
		</div>
	);
}
