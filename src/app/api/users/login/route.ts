import { prisma } from "@/utils/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    // Se o usuário não existir, retorna uma mensagem de erro
    if (!user) {
      return new Response("Usuário e/ou senha inválidos", {
        status: 401,
        headers: { erro: "Usuário e/ou senha inválidos" },
      });
    }

    // Se o usuário existir, verifica se a senha é válida
    const isValidPassword = bcrypt.compareSync(data.senha, user.senha);

    // Se a senha for inválida, retorna uma mensagem de erro
    if (!isValidPassword) {
      return new Response("Usuário e/ou senha inválidos", {
        status: 401,
        headers: { erro: "Usuário e/ou senha inválidos" },
      });
    }

    // Se a senha for válida, usa a chave secreta armazenada no arquivo .env
    // para gerar um token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // Usando a desestruturação para criar um novo objeto "userSemSenha" excluindo a propriedade "senha"
    // para que não seja retornada na API por questão de segurança
    const { senha, ...userSemSenha } = user;

    // Retorna o usuário e o token JWT
    return new Response(JSON.stringify({ user: userSemSenha, token: token }));
  } catch (error: PrismaClientValidationError | any) {
    return new Response(error, { status: 500 });
  }
}
