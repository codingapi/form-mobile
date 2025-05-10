import React, {useEffect, useState} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Input} from "antd-mobile";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormCaptcha: React.FC<FormItemProps> = (props) => {
    const [captchaImg, setCaptchaImg] = useState<string>('');
    const {formContext,rules} = formFieldInit(props);

    const reloadCaptcha = () => {
        props.onCaptchaRefresh && props.onCaptchaRefresh().then((res) => {
            if(res) {
                setCaptchaImg(res.url);
                props.onCaptchaChange && props.onCaptchaChange(res.code);
            }
        });
    }

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'captcha',
                props: props
            }
        );
        reloadCaptcha();
    }, [])

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            rules={rules}
            hidden={props.hidden}
            help={props.help}
            disabled={props.disabled}
            extra={(
                <img
                    onClick={() => {
                        reloadCaptcha();
                    }}
                    style={{
                        height: 40
                    }}
                    src={captchaImg}
                    alt="点击重置"
                />
            )}
        >
            <Input
                value={props.value}
                placeholder={props.placeholder}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value,formContext);
                }}
            />
        </Form.Item>
    )
}
