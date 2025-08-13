import React, {useContext, useEffect} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Cascader} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

const valueToForm = (value: string | string[]) => {
    if (value && value.length > 0) {
        if (Array.isArray(value)) {
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

export const FormCascader: React.FC<FormTypeProps> = (props) => {

    const [visible, setVisible] = React.useState(false);
    const [options, setOptions] = React.useState(props.options);

    const formContext = useContext(FormContext) || undefined;

    const value = props.value ? valueToForm(props.value) : undefined;

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(res => {
                setOptions(res);
            });
        }
    }

    useEffect(() => {
        reloadOptions();
    }, [props.optionVersion]);

    useEffect(() => {
        if (visible) {
            reloadOptions();
        }
    }, [visible]);

    return (

        <Cascader
            value={value}
            options={options || []}
            visible={visible}
            onClick={() => {
                setVisible(true);
            }}
            onClose={() => {
                setVisible(false)
            }}
            onConfirm={(value) => {
                const currentValue = formToValue(value as string[]);
                props.onChange && props.onChange(currentValue, formContext);
                setVisible(false);
            }}
            {...props.itemProps}
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
    )
}

FormCascader.displayName = "cascader";
