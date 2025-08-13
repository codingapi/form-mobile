import React, {useEffect} from "react";
import {Form as MobileForm} from "antd-mobile";
import {
    AntdForm,
    AntdFormInstance,
    FormField,
    FormInstance,
    FormProps,
    FormRule,
    loadRules,
    NamePath,
    ThemeConfig,
    ThemeProvider,
    ThemeProviderContext
} from "@codingapi/ui-framework";
import {FormContext} from "./context";
import "./index.scss";
import {registerDefaultFormItems} from "./register";
import {FormItem} from "./item";
import {formFieldInit} from "./common";

const FormComponent: React.FC<FormProps> = (props) => {
    registerDefaultFormItems();
    props.registerFormItems && props.registerFormItems();

    const formInstance = props.form ? props.form : new FormInstance();

    const themeContext = React.useContext(ThemeProviderContext);

    const theme = themeContext?.getTheme() || {} as ThemeConfig;

    const [fields, setFields] = React.useState<FormField[]>([]);
    formInstance.setFieldsUpdateDispatch(setFields);

    const formControl = formInstance.getFormControlInstance() as any;

    const reloadFields = () => {
        if (props.loadFields) {
            props.loadFields().then(fields => {
                setFields(fields);
                formInstance.resetFields(fields);
            })
        }
    }

    useEffect(() => {
        reloadFields();
    }, [props.loadFields]);


    return (
        <ThemeProvider theme={theme}>
            <FormContext.Provider
                value={formInstance}
            >
                <MobileForm
                    form={formControl}
                    onFinish={(values) => {
                        props.onFinish && props.onFinish(values);
                    }}
                    initialValues={props.initialValues}
                    layout={props.layout}
                    footer={props.footer}
                >
                    {fields.length > 0 && fields.map((field) => {
                        const itemRenderProps = {
                            type: field.type,
                            ...field.props,
                        }
                        return (
                            <FormItem {...itemRenderProps}/>
                        )
                    })}

                    {props.children}

                </MobileForm>
            </FormContext.Provider>
        </ThemeProvider>

    )
}

interface $FormItemProps {
    children: React.ReactNode;
    name?: NamePath;
    hidden?: boolean;
    label?: React.ReactNode;
    required?: boolean;
    style?: React.CSSProperties;
    rules?: FormRule[];
}

const $FormItem: React.FC<$FormItemProps> = (props) => {

    const rules = loadRules(props);
    const child = props.children;
    const {formContext,optionVersion} = formFieldInit(props.name);
    const children = React.cloneElement(child as any,{
        optionVersion: optionVersion
    })

    if (React.isValidElement(child)) {
        // @ts-ignore
        const type = child.type.displayName;


        useEffect(() => {
            formContext?.addFormField({
                type: type,
                props: {
                    ...child.props,
                    ...props,
                }
            })
        }, []);
    }

    return (
        <MobileForm.Item
            name={props.name}
            hidden={props.hidden}
            label={props.label}
            required={props.required}
            style={props.style}
            rules={rules}
        >
            {children}
        </MobileForm.Item>
    )
}

type FormType = typeof FormComponent;
type FormComponentType = FormType & {
    useForm: () => FormInstance;
    Item: typeof $FormItem;
};

export const Form = FormComponent as FormComponentType;
Form.useForm = () => {
    AntdForm.getInstance().registerForm({
        useForm(): AntdFormInstance {
            const [formInstance] = MobileForm.useForm();
            return formInstance;
        }
    })
    return new FormInstance();
};

Form.Item = $FormItem;


