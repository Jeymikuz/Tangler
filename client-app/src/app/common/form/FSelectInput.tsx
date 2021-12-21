import { useField } from "formik";
import React from "react";
import { DropdownItemProps, Form, Select } from "semantic-ui-react";

interface Props {
    name: string,
    label?: string,
    type?: string,
    options: DropdownItemProps[],
    placeholder?: string,
    defaultValue?: string | number,
}

export default function FSelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);


    function handleChange(value: any) {
        helpers.setValue(value);
    }

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} hidden/>
            <Select 
                options={props.options}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                onChange={(event, data ) => {
                    handleChange(data.value);
                }}
            />
            {/* <HexColorPicker
                color={field.value} onChange={(value) => handleChange(value)} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null} */}
        </Form.Field>
    )
}