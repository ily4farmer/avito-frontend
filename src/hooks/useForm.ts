import { useEffect, useState } from 'react';

type Form = Record<string, unknown>;

type ValidationSchema<T> = Partial<
  Record<
    keyof T,
    {
      regex?: RegExp;
      required?: boolean;
    }
  >
>;

type FormErrors<T> = Partial<Record<keyof T, boolean>>;

type UseFormProps<T> = {
  data: T;
  validationSchema?: ValidationSchema<T>;
  errors?: FormErrors<T>;
};

export const useForm = <TypeForm extends Form>({
  data,
  validationSchema,
}: UseFormProps<TypeForm>) => {
  const [form, setForm] = useState<TypeForm>({ ...data });

  const [formFieldsError, setFormFieldsError] = useState<FormErrors<TypeForm>>({});

  useEffect(() => {
    setDataForm(data);
    setFormFieldsError({});
  }, [JSON.stringify(data)]);

  const setDataForm = (newData: TypeForm) => {
    setForm(newData);
  };

  const updateFormItem = (value: TypeForm[keyof TypeForm], name: keyof TypeForm) => {
    setForm(prevState => {
      const newData = { ...prevState };

      if (value === null || value === undefined || value === '') {
        delete newData?.[name];

        return { ...newData };
      }

      return { ...newData, [name]: value };
    });

    if (validationSchema) {
      setFormFieldsError(prevState => ({
        ...prevState,
        ...formValidation<TypeForm>({ validationSchema, name, value }),
      }));
    }
  };

  const setDataFormError = (errors: FormErrors<TypeForm>) => {
    setFormFieldsError(errors);
  };

  const formReset = (newData: TypeForm) => {
    setForm(newData);
    setDataFormError({});
  };

  const formSubmit = () => {
    const newErrors: FormErrors<TypeForm> = {};
    const formItems = Object.entries(form) as [keyof TypeForm, TypeForm[keyof TypeForm]][];

    if (validationSchema) {
      formItems.forEach(([name, value]) => {
        newErrors[name] = formValidation<TypeForm>({
          validationSchema,
          name,
          value,
        })[name];
      });
    }

    setFormFieldsError(prevState => ({ ...prevState, ...newErrors }));

    return { isError: Object.values(newErrors).includes(true) };
  };

  return {
    form,
    formSubmit,
    formReset,
    formError: Object.values(formFieldsError).includes(true),
    formFieldsError,
    updateFormItem,
    setDataForm,
    setDataFormError,
  };
};

type FormValidationProps<T> = {
  validationSchema: ValidationSchema<T>;
  name: keyof T;
  value: T[keyof T];
};

const formValidation = <T>({ validationSchema, name, value }: FormValidationProps<T>) => {
  const errors: FormErrors<T> = {};

  errors[name] = false;

  const itemSchema = validationSchema?.[name];

  const isRequiredAndValue = itemSchema?.required && value;
  const isRequiredAndNotValue = itemSchema?.required && !value;
  const isNotRequiredValue = !itemSchema?.required && value;

  if (itemSchema?.required && Array.isArray(value) && !value.length) {
    errors[name] = !value.length;
  }

  if (isRequiredAndNotValue) {
    errors[name] = !String(value).length;

    return errors;
  }

  if ((isRequiredAndValue || isNotRequiredValue) && itemSchema?.regex) {
    errors[name] = !itemSchema?.regex?.test(String(value));

    return errors;
  }

  return errors;
};
