import { fakerPT_BR } from "@faker-js/faker";
import type { Transporte } from "./types";

export const empresas = Array.from({ length: 10 }).map(() => ({
	razaoNome: fakerPT_BR.helpers.arrayElements([
		"TRANSPORTADORA F & R",
		"EXPRESSO DIESEL TRANSPORTES",
	]),
}));

export const transportes = Array.from({ length: 10 }).map(() => {
	//id: fakerPT_BR.number.int({ min: 1, max: 10 });
});
