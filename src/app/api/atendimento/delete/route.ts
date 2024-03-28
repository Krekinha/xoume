import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import "moment/locale/pt-br";

export async function DELETE(req: Request, res: Response) {
  try {
    const data = await req.json();
    console.log("data: ", data);

    // Excluir o atendimento com o id informado
    const novoAtendimento = await prisma.atendimento.delete({
      where: {
        id: data,
      },
    });

    return new Response(JSON.stringify(novoAtendimento));
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
