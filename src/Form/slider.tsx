import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Slider} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

export const FormSlider: React.FC<FormTypeProps> = (props) => {

    const formContext = useContext(FormContext) || undefined;

    return (
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
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

