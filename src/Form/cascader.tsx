import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Cascader, Form} from "antd-mobile";
import {RightOutline} from "antd-mobile-icons";
import {formFieldInit} from "./common";
import "./index.scss";

const valueToForm = (value: string|string[]) => {
    if (value && value.length > 0) {
        if(Array.isArray(value)) {
            return value;
        }
        return value.split(",");
    }
    return value;
}

const formToValue = (value: string[]) => {
    if (value && value.length > 0) {
        return value.join(",")
    }
    return value;
}

export const FormCascader: React.FC<FormItemProps> = (props) => {


    const [visible, setVisible] = React.useState(false);
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
        formContext?.addFormField(
            {
                type: 'cascader',
                props: props
            }
        );
        reloadOptions();
    }, []);

    useEffect(() => {
        if (visible) {
            reloadOptions();
        }
    }, [visible]);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            rules={rules}
            hidden={props.hidden}
            help={props.help}
            disabled={props.disabled}
            extra={(
                <RightOutline
                    onClick={() => {
                        setVisible(true);
                    }}
                />
            )}
            getValueProps={(value) => {
                if (value) {
                    return {
                        value: valueToForm(value)
                    }
                }
                return value
            }}
        >
            <Cascader
                value={props.value}
                options={options || []}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
                onConfirm={(value) => {
                    formContext?.setFieldValue(props.name as string, formToValue(value as string[]));
                    props.onChange && props.onChange(value, formContext);
                    setVisible(false);
                }}
            >
                {items => {
                    if (items.every(item => item === null)) {
                        return (
                            <span
                                onClick={() => {
                                    setVisible(true)
                                }}
                                className={"placeholder-span"}
                            >{props.placeholder || '请选择数据'}</span>
                        )
                    } else {
                        const value = items.map(item => item?.label ?? '请选择数据').join('-')
                        return (
                            <span
                                onClick={() => {
                                    setVisible(true)
                                }}
                            >{value}</span>
                        )
                    }
                }}
            </Cascader>
        </Form.Item>
    )
}
