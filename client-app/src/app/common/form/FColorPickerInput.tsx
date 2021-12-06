import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";
import { HexColorPicker } from 'react-colorful';

interface Props {
    placeholder: string,
    name: string,
    label?: string,
    type?: string,
}

export default function FColorPickerInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);


    function handleChange(value: any) {
        helpers.setValue(value);
    }

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            <HexColorPicker
                color={field.value} onChange={(value) => handleChange(value)} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}