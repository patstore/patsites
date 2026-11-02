import React from 'react'
import { FormField } from '../types'

const generateFieldType: (T: FormField) => string = (field: FormField) => {
    if (field.type === 'text' || field.type === 'email') {
        return 'input'
    } else if (field.type === 'number') {
        return 'input'
    } else if (field.type === 'textarea') {
        return 'textarea'
    } else return 'input'
    
}

export default generateFieldType