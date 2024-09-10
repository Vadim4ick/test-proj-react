/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, FormEvent, useState } from "react";
import { FieldVariant, FormFieldType } from "../types";
import { generateId } from "../helpers/lib";
import { FormField } from "./FormField";

interface Props {
  setJson: (json: FormFieldType[]) => void;
}

const DynamicForm = (props: Props) => {
  const { setJson } = props;

  const [fields, setFields] = useState<FormFieldType[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addTextField = () => {
    setFields([
      ...fields,
      {
        type: FieldVariant.TEXT,
        id: generateId(),
        label: "",
        value: "",
      },
    ]);
  };

  const addCheckbox = () => {
    setFields([
      ...fields,
      {
        type: FieldVariant.CHECKBOX,
        id: generateId(),
        label: "",
        value: false,
      },
    ]);
  };

  const addDropdown = () => {
    setFields([
      ...fields,
      {
        type: FieldVariant.DROPDOWN,
        id: generateId(),
        label: "",
        value: "",
      },
    ]);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { type, value } = e.target;

    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              // @ts-ignore
              value: type === FieldVariant.CHECKBOX ? e.target.checked : value,
            }
          : field
      )
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    fields.forEach((field) => {
      if (field.label.trim() === "") {
        newErrors[field.id] = "Требуется заполнение label-а";
        hasErrors = true;
      }
      // Add other validation checks here if needed
    });

    if (hasErrors) {
      setErrors(newErrors);
      return; // Prevent form submission if validation fails
    }

    const jsonData = fields.map((field) => ({
      id: field.id,
      type: field.type,
      label: field.label,
      value: field.value,
    })) as FormFieldType[];

    setJson(jsonData);
    setErrors({});

    console.log("Form Data:", JSON.stringify(jsonData, null, 2));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));

    setErrors((prevErrors) => {
      const { [id]: _, ...rest } = prevErrors;

      return rest;
    });
  };

  const handleLabelChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;

    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              label: value,
            }
          : field
      )
    );

    setErrors((prevErrors) => {
      const { [id]: _, ...rest } = prevErrors;

      return rest;
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__actions">
        <button type="button" onClick={addTextField}>
          Добавить текстовое поле
        </button>
        <button type="button" onClick={addCheckbox}>
          Добавить checkbox
        </button>
        <button type="button" onClick={addDropdown}>
          Добавить dropdown
        </button>
      </div>

      {fields.map((field) => (
        <FormField
          key={field.id}
          field={field}
          handleChange={handleChange}
          handleLabelChange={handleLabelChange}
          removeField={removeField}
          error={errors[field.id]}
        />
      ))}

      <button type="submit" className="form__submit">
        Отправить
      </button>
    </form>
  );
};

export { DynamicForm };
