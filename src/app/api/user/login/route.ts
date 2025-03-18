
fastify.post("/users/login", async (request: UserRequest) => {
    try {
        const user = await prisma.$transaction(async (tx) => {
            const data = request.body;

            // verifica se o email já existe
            const user = await tx.user.findUnique({
                where: {
                    email: data.email,
                },
            });

            // retorna um erro genérico se o usuário não for encontrado
            if (!user) {
                throw new Error("Usuário e/ou senha inválidos");
            }

            // verifica se a senha é válida
            const isValidPassword = bcrypt.compareSync(data.senha, user.senha);

            // retorna um erro genérico se a senha for inválida
            if (!isValidPassword) {
                throw new Error("Usuário e/ou senha inválidos");
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

            return { user: userSemSenha, token: token };
        });
        return user;
    } catch (error: unknown) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError ||
            error instanceof Prisma.PrismaClientUnknownRequestError
        ) {
            console.log("Erro conhecido do Prisma:", error.message);
            return new Response(error.message, { status: 500 });
        }
        throw error;
    }
});