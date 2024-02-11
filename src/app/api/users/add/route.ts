import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();

    // Verifica se o email já existe
    const existUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      return new Response("Email já cadastrado");
    } else {
      // Caso o email não exista, criptografa a senha
      data.senha = bcrypt.hashSync(data.senha, 8);

      // e cria um novo usuário, armazenando nele os demais dados e a senha criptografada
      const user = await prisma.user.create({
        data,
      });

      // Usando a desestruturação para criar um novo objeto "userSemSenha" excluindo a propriedade "senha"
      // para que não seja retornada na API por questão de segurança
      const { senha, ...userSemSenha } = user;

      return new Response(JSON.stringify(userSemSenha));
    }
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
