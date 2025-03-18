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

				// const userModel: User = {userLogin} as User;
				// // userModel.id = userLogin.id;
				// // userModel.nome = userLogin.nome;

				return { ...userLogin };
				// return userModel;

				// try {
				// 	const [user, error] = await login({
				// 		email: credentials?.email as string,
				// 		senha: credentials?.senha as string,
				// 	});

				// 	console.log("RESPONSE: ", user);
				// 	console.log("ERRO: ", error);

				// 	if (!user)
				// 		throw new Error(error?.message || "erro ao consultar");

				// 	return {...user};
				// } catch (error: any) {
				// 	throw new Error(error?.message || "erro ao consultar");
				// }

				// process.env.NODE_ENV === "production"
				//   ? `${process.env.SITE_URL}/api/users/login`
				//   : `${process.env.NEXTAUTH_URL}/api/users/login`;

				// const response = await fetch(url, {
				// 	method: "POST",
				// 	headers: {
				// 		"Content-type": "application/json",
				// 	},
				// 	body: JSON.stringify({
				// 		email: credentials?.email,
				// 		senha: credentials?.senha,
				// 	}),
				// });

				// Se a resposta à API der algum erro, captura o erro personalizado no cabeçalho
				// da resposta e envia o mesmo erro para a função que chamou o Signin (o formulário de login)
			},
		}),
	],

	pages: {
		signIn: "/login",
	},
	// Retorno das funções
	callbacks: {
		async jwt({ token, user }: any) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }: any) {
			//sendLog(JSON.stringify("SESSION"), window.location.href);
			session = token.user as any;
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
