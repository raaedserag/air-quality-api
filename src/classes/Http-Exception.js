export class HttpException extends Error{
    constructor(message, httpMessage, httpcode) {
        super(message);
        this.httpMessage = httpMessage;
        this.httpcode = httpcode;
      }
}

