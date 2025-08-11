import React, {useContext, useState} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Input} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

export const FormCaptcha: React.FC<FormTypeProps> = (props) => {
    const [captchaImg, setCaptchaImg] = useState<string>('');
    const formContext = useContext(FormContext) || undefined;

    const reloadCaptcha = () => {
        props.onCaptchaRefresh && props.onCaptchaRefresh().then((res) => {
            if(res) {
                setCaptchaImg(res.url);
                props.onCaptchaChange && props.onCaptchaChange(res.code);
            }
        });
    }

    return (
            <div className={"form-captcha"}>
                <Input
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={(value) => {
                        props.onChange && props.onChange(value,formContext);
                    }}
                    {...props.itemProps}
                />
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
            </div>
    )
}

FormCaptcha.displayName = "captcha";
