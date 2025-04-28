import React from "react";
import {FormItemProps} from "@codingapi/ui-framework";
import {DatePicker, Form} from "antd-mobile";
import {RightOutline} from "antd-mobile-icons";
import dayjs from "dayjs";
import {formFieldInit} from "./common";
import "./index.scss";

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

export const FormDate: React.FC<FormItemProps> = (props) => {

    const {formContext, rules} = formFieldInit(props);

    const format = props.dateFormat || 'YYYY-MM-DD';
    const precision = props.datePrecision || "day";
    const [visible, setVisible] = React.useState(false);

    return (
        <Form.Item
            name={props.name}
            label={props.label}
            rules={rules}
            hidden={props.hidden}
            help={props.help}
            disabled={props.disabled}
            extra={(
                <RightOutline
                    onClick={() => {
                        setVisible(true);
                    }}
                />
            )}
            getValueProps={(value) => {
                if (value) {
                    return {
                        value: dayjs(value).toDate()
                    }
                }
                return value;
            }}
        >
            <DatePicker
                title={props.label}
                value={props.value}
                visible={visible}
                precision={precision}
                renderLabel={dateLabelRenderer}
                onClose={() => {
                    setVisible(false)
                }}
                onConfirm={value => {
                    const currentDate = dayjs(value).format(format);
                    formContext?.setFieldValue(props.name as string, currentDate);
                    props.onChange && props.onChange(currentDate, formContext);
                    setVisible(false)
                }}
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
        </Form.Item>
    )
}
