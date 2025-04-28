import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Stepper} from "antd-mobile";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormStepper: React.FC<FormItemProps> = (props) => {

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
            <Stepper
                value={props.value}
                max={props.stepperMaxNumber}
                min={props.stepperMinNumber}
                digits={props.stepperDecimalLength}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            />
        </Form.Item>
    )
}

