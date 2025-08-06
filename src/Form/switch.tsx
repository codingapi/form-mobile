import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Switch as AntSwitch} from "antd-mobile";
import {SwitchProps as AntdSwitchProps} from "antd-mobile/es/components/switch/switch";
import "./index.scss";
import {FormContext} from "./context";

interface SwitchProps extends AntdSwitchProps {
    value?: boolean;
}

const Switch: React.FC<SwitchProps> = ({value, ...props}) => {
    return (
        <AntSwitch checked={value} {...props}/>
    )
}

export const FormSwitch: React.FC<FormTypeProps> = (props) => {

    const formContext = useContext(FormContext) || undefined;

    return (
        <Switch
            value={props.value}
            checkedText={props.switchCheckText}
            uncheckedText={props.switchUnCheckText}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

