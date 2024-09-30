import { Prisma } from "@prisma/client";
import { ZSAError } from "zsa";

export class ServerActionError extends Error {
	code: string | undefined;
	data: unknown;
	inputParseErrors: unknown;
	outputParseErrors: unknown;

	constructor(error: unknown) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError ||
			error instanceof Prisma.PrismaClientUnknownRequestError
		) {
			super(error.message);
			this.name = "PrismaError";
		} else if (error instanceof ZSAError) {
			super(error.message);
			this.name = "ZSAError";
			this.cause = error.cause;
			this.code = error.code;
			this.data = error.data;
			this.inputParseErrors = error.inputParseErrors;
			this.outputParseErrors = error.outputParseErrors;
		} else {
			super(String(error));
			this.name = "UnknownError";
		}
	}
}
