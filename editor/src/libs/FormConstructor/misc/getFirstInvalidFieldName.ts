import FCType from "../FCType"

/** The function returns a link with first field with error */
export default function getFirstInvalidFieldName(fields: FCType.FieldsState) {

    // Iterate all fields to find the first error
    for(let fieldName in fields) {
        const field = fields[fieldName]

        if (field.error) {
            return fieldName
        }
    }

    return null
}
