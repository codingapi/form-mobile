import React, {useEffect} from "react";
import {FormContext} from "./context";
import {FormItemProps} from "@codingapi/ui-framework";

export const formFieldInit = (props: FormItemProps,reloadOption?:()=>void) => {
    const formContext = React.useContext(FormContext) || undefined;
    const validateContext = formContext?.getFormValidateContext();
    const [random, setRandom] = React.useState(0);

    const rules= props.required?[{required: true}]:[];

    useEffect(() => {
        if (props.validateFunction) {
            if (validateContext) {
                if (props.disabled || props.hidden) {
                    // do nothing
                } else {
                    validateContext.addValidateFunction(props.name, props.validateFunction);
                }
            }
        }
        const reloadContext = formContext?.getFormFieldReloadListenerContext();
        if (reloadContext) {
            reloadContext.addListener(props.name, () => {
                setRandom(Math.random);
            });
        }

        const optionContext = formContext?.getFormFieldOptionListenerContext();
        if (optionContext) {
            optionContext.addListener(props.name, () => {
                if(reloadOption){
                    reloadOption();
                }
            });
        }
    }, [formContext]);

    return {formContext, validateContext, rules};
}

