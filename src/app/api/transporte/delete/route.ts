import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import "moment/locale/pt-br";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request, res: Response) {
  try {
    const data = await req.json();
    console.log("data: ", data);

    // Excluir o transporte com o id informado
    const novoTransporte = await prisma.transporte.delete({
      where: {
        id: data.id,
      },
    });

    return new Response(JSON.stringify(novoTransporte));
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
