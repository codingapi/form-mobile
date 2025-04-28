import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Radio, Space} from "antd-mobile";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormRadio: React.FC<FormItemProps> = (props) => {
    const [options, setOptions] = React.useState(props.options);

    const {formContext, rules} = formFieldInit(props, () => {
        reloadOptions();
    });

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(res => {
                setOptions(res);
            });
        }
    }

    useEffect(() => {
        reloadOptions();
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
            <Radio.Group
                value={props.value}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            >
                <Space direction={props.radioDirection}>
                    {options?.map(item => {
                        return (
                            <Radio
                                value={item.value}
                                disabled={item.disable}
                            >{item.label}</Radio>
                        )
                    })}
                </Space>
            </Radio.Group>
        </Form.Item>
    )
}

