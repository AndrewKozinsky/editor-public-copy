import FCType from '../FCType'
import setErrorsToFields from '../state/setErrorsToFields'


export default function fieldChangeHandler(
    e: React.BaseSyntheticEvent, // Event object
    fields: FCType.FieldsState, // Fields data from Store
    setFields: FCType.SetFields, // Fields data setting function
    submitCounter: number, // How many time form was submitted
    formConfig: FCType.Config, // Outer configure object
    setSubmitBtnDisabled: FCType.SetSubmitBtnDisabled, // Submit button
    setCommonError: FCType.SetCommonError, // Common error setting function
) {
    const fieldName = e.target.name

    const field = fields[fieldName]
    let fieldCopy = {...field}

    const value = e.target.value
    fieldCopy.value = getNewValue(fieldCopy, value)

    // Set the field with a new value to a fields set
    let updatedFields = {...fields, [fieldName]: fieldCopy}

    // Set errors to fields if form sent at once
    if (submitCounter) {
        const { fieldsCopy, isFormValid } = setErrorsToFields(updatedFields, formConfig)
        updatedFields = fieldsCopy
        setSubmitBtnDisabled(!isFormValid)
    }

    setFields(updatedFields)
    setCommonError(null)
}

/**
 * The function gets the new field's value and depends on field's type return the new field values array
 * @param {Object} inputData — field's data
 * @param {String} newValue — new field's value
 */
function getNewValue(inputData: FCType.StateFieldsObj, newValue: string) {
    if (inputData.valueCount === 'one') {
        return [newValue]
    }
    else {
        // Is passed value exist in a values array?
        const isPassedValueExists = !!(inputData.value.find(val => val === newValue))

        // If it is exists, then delete it, otherwise add the passed value
        let valuesNewArr = [...inputData.value]
        if (isPassedValueExists) {
            valuesNewArr = valuesNewArr.filter(val => val !== newValue)
        } else {
            valuesNewArr.push(newValue)
        }

        valuesNewArr = valuesNewArr.filter(value => !!value)

        return valuesNewArr
    }
}
