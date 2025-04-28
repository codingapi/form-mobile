import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Input} from "antd-mobile";
import {EyeInvisibleOutline, EyeOutline} from "antd-mobile-icons";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormPassword: React.FC<FormItemProps> = (props) => {

    const [visible, setVisible] = React.useState(false);

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
            <div className={"form-password"}>
                <Input
                    type={visible ? "text" : "password"}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={(value) => {
                        formContext?.setFieldValue(props.name, value);
                        props.onChange && props.onChange(value, formContext);
                    }}
                />
                <div className={"form-password-eye"}>
                    {!visible ? (
                        <EyeInvisibleOutline onClick={() => setVisible(true)}/>
                    ) : (
                        <EyeOutline onClick={() => setVisible(false)}/>
                    )}
                </div>
            </div>
        </Form.Item>
    )
}
