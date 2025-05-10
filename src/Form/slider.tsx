import React, {useEffect} from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {Form, Slider} from "antd-mobile";
import {formFieldInit} from "./common";
import "./index.scss";

export const FormSlider: React.FC<FormItemProps> = (props) => {

    const {formContext, rules} = formFieldInit(props);

    useEffect(() => {
        formContext?.addFormField(
            {
                type: 'slider',
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
            <Slider
                value={props.value}
                max={props.sliderMaxNumber}
                min={props.sliderMinNumber}
                step={props.sliderStep}
                range={props.sliderRange}
                ticks={props.sliderTicks}
                popover={props.sliderPopover}
                marks={props.sliderMarks}
                onChange={(value) => {
                    formContext?.setFieldValue(props.name, value);
                    props.onChange && props.onChange(value, formContext);
                }}
            />
        </Form.Item>
    )
}

