
export default class FetchFailedError extends Error {
  
    constructor(message?: string) {
    //   super(`${message} | Code: ${statusCode} | Status: ${statusText}`);
        super(message);
        this.name = "FetchFailedError";
    }
}
