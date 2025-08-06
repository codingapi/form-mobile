import React, {useContext, useEffect} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Radio, Space} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

export const FormRadio: React.FC<FormTypeProps> = (props) => {
    const [options, setOptions] = React.useState(props.options);

    const formContext = useContext(FormContext) || undefined;

    const reloadOptions = () => {
        if (props.loadOptions) {
            props.loadOptions(formContext).then(res => {
                setOptions(res);
            });
        }
    }

    useEffect(() => {
        reloadOptions();
    }, []);

    return (

        <Radio.Group
            value={props.value}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        >
            <Space direction={props.radioDirection}>
                {options?.map(item => {
                    return (
                        <Radio
                            value={item.value}
                            disabled={item.disable}
                        >{item.label}</Radio>
                    )
                })}
            </Space>
        </Radio.Group>
    )
}

