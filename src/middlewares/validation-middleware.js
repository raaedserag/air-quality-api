import { EndpointRequestValidator } from "../classes/index.js"

export class RequestValidatorMiddleware {
    constructor(validators = []) {
        this.validators = validators
        for (let validator of this.validators) {
            if (!(validator instanceof EndpointRequestValidator)) {
                throw new Error("Invalid validator")
            }
        }
        return this.validateRequest.bind(this)
    }
    validateRequest(req, res, next) {
        for (let validator of this.validators) {
            validator.validate(req)
        }
        next()
    }
}