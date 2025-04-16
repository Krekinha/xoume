import { Prisma, PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // verifica se o email já existe
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        // retorna um erro genérico se o usuário não for encontrado
        if (!user) {
            return new Response(JSON.stringify({ error: "Usuário e/ou senha inválidos" }), { status: 401 });
        }

        // verifica se a senha é válida
        const isValidPassword = bcrypt.compareSync(data.senha, user.senha);

        // retorna um erro genérico se a senha for inválida
        if (!isValidPassword) {
            return new Response(JSON.stringify({ error: "Usuário e/ou senha inválidos" }), { status: 401 });
        }

        // Se a senha for válida, usa a chave secreta armazenada no arquivo .env
        // para gerar um token JWT
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1d",
            },
        );

        // Usando a desestruturação para criar um novo objeto "userSemSenha" excluindo a propriedade "senha"
        // para que não seja retornada na API por questão de segurança
        const { senha, ...userSemSenha } = user;

        return new Response(JSON.stringify({ user: userSemSenha, token: token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError ||
            error instanceof Prisma.PrismaClientUnknownRequestError
        ) {
            console.log("Erro conhecido do Prisma:", (error as Error).message);
            return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
        }
        return new Response(JSON.stringify({ error: "Erro interno do servidor" }), { status: 500 });
    }
}