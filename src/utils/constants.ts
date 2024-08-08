/**
 * Neste arquivo serão criadas as constantes que ficarão
 * diponíveis de forma global em toddo app
 * @author Krekinha
 * @version 1.0
 */
export function baseUrl(url?: string) {
	if (process.env.NODE_ENV === "development")
		return `${process.env.API_TRANSMANAGER_URL}${url}`;
	return `${process.env.API_TRANSMANAGER_URL}${url}`;
}
