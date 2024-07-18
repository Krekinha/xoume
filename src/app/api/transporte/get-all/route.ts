import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { unstable_noStore as nostore } from "next/cache";

export const dynamic = "force-dynamic";
/**
 * API que busca exibe as todos os elementos na tabela Transporte
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
    const transportes = await prisma.transporte.findMany({
      include: {
        empresa: true,
      },
    });

    console.log("GET-ALL OK: ", transportes);
    return new Response(JSON.stringify(transportes));
  } catch (error: PrismaClientValidationError | any) {
    console.log("GET-ALL ERRO: ", error);
    return new Response(error, { status: 500 });
  }
}
