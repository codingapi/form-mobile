import React, {useEffect} from "react";
import {Form as AntForm} from "antd-mobile";
import {FormFactory, FormField, FormItemProps, loadRules} from "@codingapi/ui-framework";
import {formFieldInit} from "./common";


interface FormItemRenderProps extends FormItemProps{
    type: string;
}


export const FormItem:React.FC<FormItemRenderProps> = (props)=>{

    const rules = loadRules(props);
    const formItem =  FormFactory.getInstance().create({
        type: props.type,
        props: {
            ...props,
        }
    }) as React.ReactElement;

    const {formContext,optionVersion} = formFieldInit(props.name);

    const children = React.cloneElement(formItem,{
        optionVersion:optionVersion
    });

    useEffect(() => {
        formContext?.addFormField({
            type:props.type,
            props:{
                ...props,
            }
        } as FormField);
    }, []);

    return (
        <AntForm.Item
            name={props.name}
            label={props.label}
            required={props.required}
            help={props.help}
            rules={rules}
            hidden={props.hidden}
        >
            {children}
        </AntForm.Item>
    )
}
