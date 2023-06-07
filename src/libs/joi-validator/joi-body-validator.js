import Joi from "joi"
import { EndpointRequestValidator } from "../../classes/index.js"
import { ValidationException } from "./validation-errors.js"

export class JoiRequestBodyValidator extends EndpointRequestValidator {
    constructor(joiSchema) {
        super()
        if (!Joi.isSchema(joiSchema)) throw new Error("Invalid Joi Schema")
        this.schema = joiSchema
    }

    validate(req) {
        const { value, error } = this.schema.validate(req.body)
        if (error) {
            throw new ValidationException(error)
        }
        req.body = value
    }
}