
export default class FetchFailedError extends Error {
    statusCode?: number;
    statusText?: string;
  
    constructor(message?: string, statusCode?: number, statusText?: string) {
    //   super(`${message} | Code: ${statusCode} | Status: ${statusText}`);
    super(message);
      this.name = "FetchFailedError";
      this.statusCode = statusCode;
      this.statusText = statusText;
    }
}
