import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import "moment/locale/pt-br";

export const dynamic = "force-dynamic";

export async function PUT(req: Request, res: Response) {
  try {
    const data = await req.json();
    console.log("data: ", data);
    // Cria uma nova data e hora atual
    let agora = new Date();

    // Ajusta para o fuso horário de Brasília (UTC-3)
    // Subtraindo 3 horas da data UTC
    agora.setHours(agora.getHours() - 3);

    // Converte para ISO-8601
    const dataISO = agora.toISOString();

    // Atualiza o transporte com o id informado
    const transporteAtualizado = await prisma.transporte.update({
      where: {
        id: data.id,
      },
      data: {
        motorista: data.motorista,
        val_frete: data.val_frete,
        atualizadoEm: dataISO,
      },
    });

    return new Response(JSON.stringify(transporteAtualizado));
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
