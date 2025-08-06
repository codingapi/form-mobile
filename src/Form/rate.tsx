import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {Rate} from "antd-mobile";
import "./index.scss";
import {FormContext} from "./context";

export const FormRate: React.FC<FormTypeProps> = (props) => {
    const formContext = useContext(FormContext) || undefined;

    return (
        <Rate
            count={props.rateCount}
            allowHalf={props.rateAllowHalf}
            value={props.value}
            onChange={(value) => {
                props.onChange && props.onChange(value, formContext);
            }}
            {...props.itemProps}
        />
    )
}

