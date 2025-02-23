// src/formValidator/index.js
// formValidator function to validate formData against a validation schema
export const formValidator = (formData, validationSchema) => {
    let errors = {};
    for (const field in validationSchema) {
        const rules = validationSchema[field];
        const value = formData[field];
        for (const rule of rules) {
            const { type, regex, message, length, matchTo } = rule;
            
            // Check if the field is required and if it has a value
            if (type === 'required' && !value) {
                errors[field] = message || 'Field is required.';
                break;
            }

            // Check if the field value matches the regex pattern
            if (type === 'regex' && value && !regex.test(value)) {
                errors[field] = message || 'Pattern is not valid.';
                break;
            }

            // Check if the field value meets the length requirements
            if (type === 'length' && (value.length < length.min || value.length > length.max)) {
                let msg = "";
                if (length.min && length.max && length.min === length.max) {
                    msg = `Value must be of length ${length.max}`;
                } else {
                    msg = `Value should be of length ${length.min && 'min ' + length.min + ' '}${length.max && 'max ' + length.max}`;
                }
                errors[field] = message || msg;
                break;
            }

            // Check if the field value matches another field's value
            if (type === 'match' && value !== formData[matchTo]) {
                errors[field] = message || "Value does not match.";
                errors[matchTo] = message || "Value does not match.";
                break;
            }
        }
    }
    return errors;
}
