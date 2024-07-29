import type { User } from "@/utils/types";
import NextAuth from "next-auth";
/**
 * Esse arquivo adiciona tipos/interfaces ao módulo next-auth.
 * Neste caso, estou subscrevendo o objeto "user" na interface Session do next-auth e adicionando
 * algumas propriedades personalizadas a esse objeto (nome, role, etc)
 * @author Krekinha
 * @version 1.0
 */

declare module "next-auth" {
	interface Session {
		// user: {
		// 	id: string
		// 	email: string
		// 	nome: string
		//     role: string
		// }
		user: User;
		token: string;
	}
}
