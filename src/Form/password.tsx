import React, {useContext} from "react";
import {FormInstance, FormTypeProps} from "@codingapi/ui-framework";
import {Input} from "antd-mobile";
import {EyeInvisibleOutline, EyeOutline} from "antd-mobile-icons";
import "./index.scss";
import {FormContext} from "./context";

interface PasswordItemProps extends FormTypeProps{
    formInstance:FormInstance|undefined;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const PasswordItem:React.FC<PasswordItemProps> = (props)=>{
    return (
        <div className={"form-password"}>
            <Input
                type={props.visible ? "text" : "password"}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(value) => {
                    props.onChange && props.onChange(value, props.formInstance);
                }}
                {...props.itemProps}
            />
            <div className={"form-password-eye"}>
                {!props.visible ? (
                    <EyeInvisibleOutline onClick={() => props.setVisible(true)}/>
                ) : (
                    <EyeOutline onClick={() => props.setVisible(false)}/>
                )}
            </div>
        </div>
    )
}

export const FormPassword: React.FC<FormTypeProps> = (props) => {

    const [visible, setVisible] = React.useState(false);

    const formContext = useContext(FormContext) || undefined;

    return (
        <PasswordItem
            {...props}
            setVisible={setVisible}
            visible={visible}
            formInstance={formContext}
        />
    )
}

FormPassword.displayName = "password";
