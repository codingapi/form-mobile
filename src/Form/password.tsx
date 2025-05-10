import React, {useEffect} from "react";
import {FormInstance, FormItemProps} from "@codingapi/ui-framework";
import {Form, Input} from "antd-mobile";
import {EyeInvisibleOutline, EyeOutline} from "antd-mobile-icons";
import {formFieldInit} from "./common";
import "./index.scss";

interface PasswordItemProps extends FormItemProps{
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
                    props.formInstance?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, props.formInstance);
                }}
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

export const FormPassword: React.FC<FormItemProps> = (props) => {

    const [visible, setVisible] = React.useState(false);

    const {formContext, rules} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'password',
                props: props
            }
        );
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
            <PasswordItem
                {...props}
                setVisible={setVisible}
                visible={visible}
                formInstance={formContext}
            />

        </Form.Item>
    )
}
