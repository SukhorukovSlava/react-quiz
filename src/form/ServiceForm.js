export function createControl(config, validationParams) {
    return {
        ...config,
        validationParams,
        valid: !validationParams,
        touched: false,
        value: ''
    };
}

export function validatingControl(value, validationParams = null) {
    if (!validationParams) {
        return true;
    }

    let isValid = true;
    if (validationParams.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

export function validatingForm(formControls) {
    let isFormValid = true;
    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid;
        }
    }
    return isFormValid;
}