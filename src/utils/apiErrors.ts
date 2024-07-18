
export class FetchFailedError extends Error {
    statusText?: string;
  
    constructor(message?: string, statusCode?: number, statusText?: string) {
      super(`${message} | Code: ${statusCode} | Status: ${statusText}`);
      this.name = "FetchFailedError";
      this.statusText = statusText;
    }
}

export interface ErrorTest{
    message?: string;
    statusCode?: number;
    statusText?: string;
}