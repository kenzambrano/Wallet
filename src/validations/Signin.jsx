import validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function ValidateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.email)) errors.email = 'FieldRequired';
    if(validator.isEmpty(data.password)) errors.password = 'FieldRequired';

    return {
        errors,
        isValid: isEmpty(errors)
    };
}