import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function camposAlterados<T>(
	original: T,
	newValues: Partial<T>,
): Partial<T> {
	const camposAlterados: Partial<T> = {};

	for (const chave in newValues) {
		if (Object.prototype.hasOwnProperty.call(original, chave)) {
			const valorAntigo = original[chave as keyof T];
			const valorNovo = newValues[chave as keyof T];

			if (Array.isArray(valorNovo) && Array.isArray(valorAntigo)) {
				if (!arraysAreEqual(valorNovo as any[], valorAntigo as any[])) {
					camposAlterados[chave as keyof T] = valorNovo as any;
				}
			} else if (
				valorAntigo instanceof Date &&
				valorNovo instanceof Date
			) {
				if (valorAntigo.getTime() !== valorNovo.getTime()) {
					camposAlterados[chave as keyof T] = valorNovo as any;
				}
			} else if (valorNovo !== valorAntigo) {
				camposAlterados[chave as keyof T] = valorNovo as any;
			}
		}
	}

	return camposAlterados;
}

function arraysAreEqual(arr1: any[], arr2: any[]): boolean {
	if (arr1.length !== arr2.length) return false;
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}
