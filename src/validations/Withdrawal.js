import validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function ValidateInput(data) {
    let errors = {};

    if(validator.isEmpty(data.montoRetiro)) errors.montoRetiro = 'Campo requerido';

    return {
        errors,
        isValid: isEmpty(errors)
    };
}