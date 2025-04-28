import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Rate} from "antd-mobile";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormRate: React.FC<FormItemProps> = (props) => {
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
            <Rate
                count={props.rateCount}
                allowHalf={props.rateAllowHalf}
                value={props.value}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            />
        </Form.Item>
    )
}

