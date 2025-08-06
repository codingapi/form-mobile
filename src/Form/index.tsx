import React, {useEffect} from "react";
import {Form as MobileForm} from "antd-mobile";
import {
    AntdForm,
    AntdFormInstance,
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
import {FormItem} from "./item";
import FormDisplayRender from "./display";


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
                    {fields.length > 0 && !props.display && fields.map((field) => {
                        return (
                            <FormItem {...field}/>
                        )
                    })}

                    {fields.length> 0 && props.display && (
                        <FormDisplayRender display={props.display} fields={fields} />
                    )}

                    {props.children}

                </MobileForm>
            </FormContext.Provider>
        </ThemeProvider>

    )
}

type FormType = typeof FormComponent;
type FormComponentType = FormType & {
    useForm: () => FormInstance;
    Item: typeof MobileForm.Item;
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

Form.Item = MobileForm.Item;


