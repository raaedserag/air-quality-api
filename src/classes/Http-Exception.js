export class HttpException extends Error{
    constructor(message, httpMessage, httpcode) {
        super(message);
        this.httpcode = httpMessage;
        this.httpMessage = httpcode;
      }
}

