import React, {useContext} from "react";
import {FormTypeProps} from "@codingapi/ui-framework";
import {DatePicker} from "antd-mobile";
import dayjs from "dayjs";
import "./index.scss";
import {FormContext} from "./context";

export const dateLabelRenderer = (type: string, data: number) => {
    switch (type) {
        case 'year':
            return data + '年'
        case 'month':
            return data + '月'
        case 'day':
            return data + '日'
        case 'hour':
            return data + '时'
        case 'minute':
            return data + '分'
        case 'second':
            return data + '秒'
        default:
            return data
    }
}

export const FormDate: React.FC<FormTypeProps> = (props) => {

    const formContext = useContext(FormContext) || undefined;
    const value = props.value ? dayjs(props.value).toDate() : undefined;

    const format = props.dateFormat || 'YYYY-MM-DD';
    const precision = props.datePrecision || "day";
    const [visible, setVisible] = React.useState(false);


    return (
            <DatePicker
                value={value}
                visible={visible}
                precision={precision}
                renderLabel={dateLabelRenderer}
                onClose={() => {
                    setVisible(false)
                }}
                onClick={()=>{
                    setVisible(true)
                }}
                onConfirm={value => {
                    const currentDate = dayjs(value).format(format);
                    props.onChange && props.onChange(currentDate, formContext);
                    setVisible(false)
                }}
                {...props.itemProps}
            >
                {value => {
                    if (value) {
                        const currentValue = dayjs(value).format(format);
                        return (
                            <span
                                onClick={() => {
                                    setVisible(true)
                                }}
                            >{currentValue}</span>
                        )
                    }
                    return (
                        <span
                            onClick={() => {
                                setVisible(true)
                            }}
                            className={"placeholder-span"}
                        >{props.placeholder || '请选择日期'}
                        </span>
                    )
                }}
            </DatePicker>
    )
}
