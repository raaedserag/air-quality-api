import { HttpException } from "../../classes/index.js"

export class ValidationException extends HttpException {
    constructor(error) {
        const message = error.details.map((i) => i.message).join(", ")
        super(message, message, 400)
    }
}