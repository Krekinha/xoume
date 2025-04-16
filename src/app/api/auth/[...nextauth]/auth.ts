import { login } from "@/server/UserActions";
import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {} from "zod";
// ==> !== 
export const config = {
	secret: process.env.NEXTAUTH_SECRET,
	// Log do sistema de autenticação
	logger: {
		error(code: string, metadata: Error | { error: Error }) {
			console.log(code, metadata);
		},
		debug(code: string, metadata: unknown) {
			console.log(code, metadata);
		},
	},
	// Lista de provedores de autenticação que irei utilizar
	providers: [
		CredentialsProvider({
			name: "credentials",
			// Campos que irei usar ao fazer login
			credentials: {
				email: {},
				senha: {},
			},
			// API que irei usar para validar os dados (poderia ser também uma função)
			async authorize(credentials) {
				// const url = `${process.env.API_TRANSMANAGER_URL}/users/login`;

				const [userLogin, error] = await login({
					email: credentials?.email as string,
					senha: credentials?.senha as string,
				});

				console.log("USER: ", userLogin);
				console.log("ERRO: ", error);

				if (error?.message) {
					throw new Error(error.message);
				}

				if (!userLogin) {
					throw new Error(error?.message || "erro ao consultar");
				}

				// Verifica se userLogin é um objeto Response (caso de erro)
				if (userLogin instanceof Response) {
					throw new Error("Erro na autenticação");
				}

				// Extrai os dados do usuário da estrutura aninhada
				const userModel = {
					id: userLogin.user.id,
					nome: userLogin.user.nome,
					email: userLogin.user.email,
					roles: userLogin.user.roles,
					avatar: userLogin.user.avatar
				};
				
				return userModel;
			}
		}),
	],

	pages: {
		signIn: "/login",
	},
	// Retorno das funções
	callbacks: {
		async jwt({ token, user }: any) {
			// Quando o usuário faz login, armazena os dados no token
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }: any) {
			// Aqui está o problema - você está substituindo todo o objeto session
			// em vez de apenas adicionar o user a ele
			session.user = token.user;
			return session;
		},
	},

	debug: true,
} satisfies NextAuthOptions;

// Função auxiliar para obter sessão sem passar configuração todas as vezes
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, config);
}
