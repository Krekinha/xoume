import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import moment from "moment";
import "moment/locale/pt-br";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();

    // Criar o novo Transporte com o valor de ordem gerado
    const novoTransporte = await prisma.transporte.create({
      data: {
        motorista: data.motorista,
        val_frete: data.val_frete,
        empresa: {
          connect: {
            id: "clym4dc6f0000otviopje6rxn",
          },
        },
      },
    });

    return new Response(JSON.stringify(novoTransporte));
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
