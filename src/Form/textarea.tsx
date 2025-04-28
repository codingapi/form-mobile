import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, TextArea} from "antd-mobile";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormTextArea: React.FC<FormItemProps> = (props) => {

    const {formContext, rules} = formFieldInit(props);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            rules={rules}
            hidden={props.hidden}
            help={props.help}
            disabled={props.disabled}
        >
            <TextArea
                value={props.value}
                showCount={true}
                placeholder={props.placeholder}
                maxLength={props.textAreaMaxLength}
                rows={props.textAreaRows}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            />
        </Form.Item>
    )
}

