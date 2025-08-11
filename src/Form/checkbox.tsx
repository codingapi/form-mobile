import React, {useContext, useEffect} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Checkbox, Space} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

const valueToForm = (value: string) => {
    if (value && value.length > 0) {
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

export const FormCheckbox: React.FC<FormTypeProps> = (props) => {
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
    }, []);

    return (
            <Checkbox.Group
                value={value}
                onChange={(e) => {
                    const currentValue = formToValue(e as string[]);
                    props.onChange && props.onChange(currentValue, formContext)
                }}
                {...props.itemProps}
            >
                <Space direction={props.checkboxDirection}>
                    {options?.map(item => {
                        return (
                            <Checkbox
                                disabled={item.disable}
                                value={item.value}
                            >{item.label}</Checkbox>
                        )
                    })}
                </Space>
            </Checkbox.Group>
    )
}

FormCheckbox.displayName = "checkbox";
