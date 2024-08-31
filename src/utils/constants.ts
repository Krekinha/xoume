import type { Sidemenu } from "./types";
import { SvgConfiguracoes } from "@/components/svg/SvgConfiguracoes";

/**
 * Neste arquivo serão criadas as constantes que ficarão
 * diponíveis de forma global em toddo app
 * @author Krekinha
 * @version 1.0
 */
export function baseUrl(url?: string) {
	if (process.env.NODE_ENV === "development")
		return `${process.env.API_TRANSMANAGER_URL}${url}`;
	return `${process.env.API_TRANSMANAGER_URL}${url}`;
}

export const estadosBrasil = [
	{ label: "AC", value: 12 },
	{ label: "AL", value: 27 },
	{ label: "AP", value: 16 },
	{ label: "AM", value: 13 },
	{ label: "BA", value: 29 },
	{ label: "CE", value: 23 },
	{ label: "DF", value: 53 },
	{ label: "ES", value: 32 },
	{ label: "GO", value: 52 },
	{ label: "MA", value: 21 },
	{ label: "MT", value: 51 },
	{ label: "MS", value: 50 },
	{ label: "MG", value: 31 },
	{ label: "PA", value: 15 },
	{ label: "PB", value: 25 },
	{ label: "PR", value: 41 },
	{ label: "PE", value: 26 },
	{ label: "PI", value: 22 },
	{ label: "RJ", value: 33 },
	{ label: "RN", value: 24 },
	{ label: "RS", value: 43 },
	{ label: "RO", value: 11 },
	{ label: "RR", value: 14 },
	{ label: "SC", value: 42 },
	{ label: "SP", value: 35 },
	{ label: "SE", value: 28 },
	{ label: "TO", value: 17 },
];
