import FCType from '../FCType'


/**
 * THe function composes fields' initial values object for set it in state
 * @param {Object} formConfig — outer configure object
 */
export default function getInitialFieldsState(formConfig: FCType.Config): FCType.FieldsState {

    // Fields data
    let fields: FCType.FieldsState = {}

    // Walk through form fields from a configuration object for filling fields with data.
    if (formConfig.fields) {
        Object.keys(formConfig.fields).forEach(fieldName => {
            const fieldConfig = formConfig.fields[fieldName]

            const fieldProps: FCType.StateFieldsObj = {
                value: fieldConfig.initialValue || [''],
                type: getFieldType(fieldConfig),
                valueCount: getValueCount(fieldConfig),
                disabled: false,
                loading: false
            }

            if (fieldConfig.fieldType === 'text') {
                fieldProps.error = null
            }

            fields[fieldName] = fieldProps
        })
    }

    return fields
}

function getFieldType(fieldConfig: FCType.ConfigField): FCType.FieldType {
    if (fieldConfig.fieldType === 'text') {
        return 'text'
    }
    else if (fieldConfig.fieldType === 'checkboxes') {
        return 'checkbox'
    }
    else if (fieldConfig.fieldType === 'radios') {
        return 'radio'
    }
    else if (fieldConfig.fieldType === 'select') {
        return 'select'
    }
}

function getValueCount(fieldConfig: FCType.ConfigField): FCType.ValueCount {
    if (fieldConfig.fieldType === 'checkboxes') {
        return 'many'
    }
    else {
        return 'one'
    }
}
