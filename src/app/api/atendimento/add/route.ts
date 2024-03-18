import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import moment from "moment";
import "moment/locale/pt-br";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    var novaOrdem = 0;

    // Obter o ano atual
    const anoAtual = moment(data).format("YY");

    // Obter o últmo Atendimento cadastrado
    const ultimoAtendimento = await prisma.atendimento.findFirst({
      orderBy: {
        criadoEm: "desc",
      },
    });
    // Se o Atendimento existir atribui o numero de ordem à novaOrdem
    if (ultimoAtendimento) {
      novaOrdem = parseInt(ultimoAtendimento.ordem.toString().slice(-3));
    }

    // Gerar o próximo número de ordem com base no ano atual e no número sequencial da ordem
    novaOrdem = parseInt(
      anoAtual + (novaOrdem + 1).toString().padStart(3, "0")
    );

    // Criar o novo Atendimento com o valor de ordem gerado
    const novoAtendimento = await prisma.atendimento.create({
      data: {
        ordem: novaOrdem,
        descricao: data.descricao,
        /*responsavel: {
      connect: responsavelIds.map(id => ({ id })),
    },*/
      },
    });

    return new Response(JSON.stringify(novoAtendimento));
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
