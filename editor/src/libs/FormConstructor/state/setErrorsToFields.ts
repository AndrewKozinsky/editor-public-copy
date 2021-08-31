import FCType from '../FCType'

/**
 * The function checks fields and set error if it is invalid
 * @param {Object} fields — fields data from Store
 * @param {Object} config — configuration form object
 */
export default function setErrorsToFields(
    fields: FCType.FieldsState,
    config: FCType.Config,
) {
    let isFormValid = true

    const fieldsCopy: FCType.FieldsState = {...fields}

    // Check up all fields
    for(let fieldName in fields) {
        const field = fields[fieldName]
        const fieldCopy = {...field}

        // Ignore all beside text inputs
        if (field.type !== 'text') continue

        // Iterable field value
        const fieldValue = field.value[0]

        // Try to check up field. Set or clear error depends on the result
        try {
            const schema = config.fields[fieldName].schema

            if (schema) {
                schema(fields).validateSync(fieldValue)
                fieldCopy.error = null
                fieldsCopy[fieldName] = fieldCopy
            }
        }
        catch (err) {
            isFormValid = false
            fieldCopy.error = err.message
            fieldsCopy[fieldName] = fieldCopy
        }
    }

    return {
        fieldsCopy,
        isFormValid
    }
}
