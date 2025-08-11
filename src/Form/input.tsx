import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Input} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

export const FormInput: React.FC<FormTypeProps> = (props) => {

    const inputType = props.inputType || "text";
    const formContext = useContext(FormContext) || undefined;

    return (
            <Input
                value={props.value}
                clearable={true}
                type={inputType}
                placeholder={props.placeholder}
                maxLength={props.inputMaxLength}
                onChange={(value) => {
                    props.onChange && props.onChange(value, formContext);
                }}
                {...props.itemProps}
            />
    )
}

FormInput.displayName = "input";
