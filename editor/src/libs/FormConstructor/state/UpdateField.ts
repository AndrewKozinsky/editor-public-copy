import FCType from "../FCType"

/**
 * The function gets new field data and set it in fields object, then refresh Fields state
 * @param {Object} fields — fields data from Store
 * @param {Function} setFields — fields data setting function
 * @param {String} fieldName — the field name I want to replace data with
 * @param {Object} newFieldData — the new field data
 */
export default function updateFieldFn(
    fields: FCType.FieldsState,
    setFields: FCType.SetFields,
    fieldName: string,
    newFieldData: FCType.StateFieldsObj
) {
    const fieldsCopy = {...fields}
    fieldsCopy[fieldName] = newFieldData
    setFields( fieldsCopy )
}
