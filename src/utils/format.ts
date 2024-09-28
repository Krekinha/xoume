import moment from "moment";
import "moment/locale/pt-br";
import {
	type EventoEvolucaoAtendimento,
	SituacaoEventoEvolucaoAtendimento,
} from "./types";
/**
 * O objetivo desse arquivo é agrupar utilitários referentes
 * a dormatção de dados como data, moeda, porcentagem, etc.
 * @author Krekinha
 * @version 1.0
 */
export function formatarData(data: Date | undefined) {
	if (data !== null && data !== undefined) {
		return moment(data).format("DD/MM/YYYY");
	}
	return undefined;
}

export function formatarDataHora(data: Date | undefined) {
	if (data !== null && data !== undefined) {
		return moment(data).locale("pt-br").format("DD/MM/YY HH:mm");
	}
	return undefined;
}

export function formatarDataByMY(data: Date | undefined) {
	if (data !== null && data !== undefined) {
		return moment(data).locale("pt-br").format("MMMM/YYYY");
	}
	return undefined;
}

export function formatarDataByDM(data: Date | undefined) {
	if (data !== null && data !== undefined) {
		return moment(data).locale("pt-br").format("DD [de] MMMM");
	}
	return undefined;
}

export function formatarDataByWDM(data: Date | undefined) {
	if (data !== null && data !== undefined) {
		return moment(data)
			.locale("pt-br")
			.format("ddd, DD/MM/YY")
			.replace(/^./, (match) => match.toUpperCase());
	}
	return undefined;
}

export function formatarDataByDMAndAddDays(
	data: Date | undefined,
	dias: number,
) {
	if (data !== null && data !== undefined) {
		return moment(data)
			.add(dias, "days")
			.locale("pt-br")
			.format("DD [de] MMMM");
	}
	return undefined;
}

export function formatPercent(valor?: string) {
	const val = valor?.toString().replace(",", ".") || "0";
	const conv = Number.parseFloat(val).toLocaleString("pt-BR", {
		style: "decimal",
		maximumFractionDigits: 2,
	});

	return `${conv}%`;
}

export function formatCurrency(valor?: string) {
	if (valor) {
		return Number.parseFloat(valor).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
		});
	}
	return valor;
}

export function formatDecimal(valor?: string) {
	if (valor) {
		return Number.parseFloat(valor).toLocaleString("pt-BR", {
			style: "decimal",
			maximumFractionDigits: 2,
			minimumFractionDigits: 2,
		});
	}
	return valor;
}

export function anteciparSeFimDeSemana(data: any) {
	const diaDaSemana = moment(data).isoWeekday();

	if (diaDaSemana === 6) {
		return "sabado"; // É sábado ou domingo
	}

	if (diaDaSemana === 7) {
		return "domingo"; // É sábado ou domingo
	}

	return "nem sabado nem domingo"; // É sábado ou domingo
}

export function initialDate(data: Date) {
	if (data !== null) {
		return new Date(data);
	}
	return undefined;
}

export function formatarEvolucao(eventos: EventoEvolucaoAtendimento[]) {
	const total = eventos.length;
	const concluidos = eventos.filter(
		(evento) => evento.situacao.toString() === "CONCLUIDO",
	).length;
	return `${concluidos}/${total}`;
}
