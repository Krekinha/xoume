import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { unstable_noStore as nostore } from "next/cache";

/**
 * API que busca exibe as todos os elementos na tabela Atendimento
 * @author Krekinha
 * @version 1.0
 */
export async function GET(req: Request) {
  nostore();
  try {
    /**
     * É necessário que o include seja feita em todos os relacionamentos
     * entre os objetos, do contrário, os elementos sem o include não
     * irão aparecer em componentes visuais como lista e tabelas
     */
    const atendimentos = await prisma.atendimento.findMany({
      include: {
        //escalaInversaConf: true,
      },
    });

    return new Response(JSON.stringify(atendimentos));
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
