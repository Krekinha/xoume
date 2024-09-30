export const verifyRoles = (userRoles: string[], verifyRoles: string[]) => {
	return userRoles.some((role) => verifyRoles.includes(role));
};
