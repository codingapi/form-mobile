import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Input} from "antd-mobile";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormInput: React.FC<FormItemProps> = (props) => {

    const inputType = props.inputType || "text";
    const {formContext, rules} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'input',
                props: props
            }
        );
    }, []);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            rules={rules}
            hidden={props.hidden}
            help={props.help}
            disabled={props.disabled}
        >
            <Input
                value={props.value}
                clearable={true}
                type={inputType}
                placeholder={props.placeholder}
                maxLength={props.inputMaxLength}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
                {...props.itemProps}
            />
        </Form.Item>
    )
}

