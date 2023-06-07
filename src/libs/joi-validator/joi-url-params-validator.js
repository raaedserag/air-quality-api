import Joi from "joi"
import { EndpointRequestValidator } from "../../classes/index.js"
import { ValidationException } from "./validation-errors.js"

export class JoiRequestParamsValidator extends EndpointRequestValidator {
    constructor(joiSchema) {
        super()
        if (!Joi.isSchema(joiSchema)) throw new Error("Invalid Joi Schema")
        this.schema = joiSchema
    }

    validate(req) {
        const { value, error } = this.schema.validate(req.params)
        if (error) {
            throw new ValidationException(error)
        }
        req.params = value
    }
}