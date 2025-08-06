import React, {useContext, useEffect} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Selector} from "antd-mobile";
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


export const FormSelector: React.FC<FormTypeProps> = (props) => {

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
        <Selector
            multiple={props.selectorMultiple}
            columns={props.selectorColumn}
            options={options || []}
            value={value}
            onChange={(e) => {
                const currentValue = formToValue(e as string[]);
                props.onChange && props.onChange(currentValue, formContext);
            }}
            {...props.itemProps}
        />
    )
}

