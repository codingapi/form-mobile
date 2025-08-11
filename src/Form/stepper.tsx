import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Stepper} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

export const FormStepper: React.FC<FormTypeProps> = (props) => {

    const formContext = useContext(FormContext) || undefined;

    return (
        <Stepper
            value={props.value}
            max={props.stepperMaxNumber}
            min={props.stepperMinNumber}
            digits={props.stepperDecimalLength}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

FormStepper.displayName = "stepper";
