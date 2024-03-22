/**
 * Neste arquivo serão criadas as constantes que ficarão
 * diponíveis de forma global em toddo app
 * @author Krekinha
 * @version 1.0
 */
export function baseUrl(url?: string) {

  if (process.env.NODE_ENV === "development")return `${process.env.NEXTAUTH_URL}${url}`; 
  return `${process.env.SITE_URL}${url}`;
}
