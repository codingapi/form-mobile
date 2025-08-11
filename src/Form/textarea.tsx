import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {TextArea} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

export const FormTextArea: React.FC<FormTypeProps> = (props) => {

    const formContext = useContext(FormContext) || undefined;

    return (
        <TextArea
            value={props.value}
            showCount={true}
            placeholder={props.placeholder}
            maxLength={props.textAreaMaxLength}
            rows={props.textAreaRows}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

FormTextArea.displayName = "textarea";
