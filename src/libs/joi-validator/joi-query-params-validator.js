import Joi from "joi"
import { EndpointRequestValidator } from "../../classes/index.js"
import { ValidationException } from "./validation-errors.js"

export class JoiRequestQueryValidator extends EndpointRequestValidator {
    constructor(joiSchema) {
        super()
        if (!Joi.isSchema(joiSchema)) throw new Error("Invalid Joi Schema")
        this.schema = joiSchema
    }

    validate(req) {
        const { value, error } = this.schema.validate(req.query)
        if (error) {
            throw new ValidationException(error)
        }
        req.query = value
    }
}