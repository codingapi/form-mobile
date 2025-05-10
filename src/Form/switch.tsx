import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Switch as AntSwitch} from "antd-mobile";
import {SwitchProps as AntdSwitchProps} from "antd-mobile/es/components/switch/switch";
import {formFieldInit} from "./common";
import "./index.scss";

interface SwitchProps extends AntdSwitchProps {
    value?: boolean;
}

const Switch: React.FC<SwitchProps> = ({value, ...props}) => {
    return (
        <AntSwitch checked={value} {...props}/>
    )
}

export const FormSwitch: React.FC<FormItemProps> = (props) => {

    const {formContext, rules} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'switch',
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
            <Switch
                value={props.value}
                checkedText={props.switchCheckText}
                uncheckedText={props.switchUnCheckText}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
                {...props.itemProps}
            />
        </Form.Item>
    )
}

