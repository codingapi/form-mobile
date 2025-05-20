import React, {useEffect} from "react";
import {Form as MobileForm} from "antd-mobile";
import {
    AntdForm,
    AntdFormInstance,
    FormFactory,
    FormField,
    FormInstance,
    FormProps,
    ThemeConfig,
    ThemeProvider,
    ThemeProviderContext
} from "@codingapi/ui-framework";
import {FormContext} from "./context";
import "./index.scss";
import {registerDefaultFormItems} from "./register";


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
                        return FormFactory.getInstance().create(field) as React.ReactNode;
                    })}

                    {props.children}

                </MobileForm>
            </FormContext.Provider>
        </ThemeProvider>

    )
}

type FormType = typeof FormComponent;
type FormComponentType = FormType & {
    useForm: () => FormInstance;
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


