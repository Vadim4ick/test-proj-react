import { useState, ChangeEvent, FormEvent } from "react";
import { FieldVariant, FormFieldType } from "../types";
import { generateId } from "../helpers/lib";

export const useFormFields = () => {
  const [fields, setFields] = useState<FormFieldType[]>([]);
  const [formData, setFormData] = useState<FormFieldType[]>([]);

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
              value: type === FieldVariant.CHECKBOX ? e.target.checked : value,
            }
          : field
      )
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const jsonData = fields.map((field) => ({
      id: field.id,
      type: field.type,
      label: field.label,
      value: field.value,
    }));
    setFormData(jsonData);
    console.log("Form Data:", JSON.stringify(jsonData, null, 2));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
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
  };

  return {
    fields,
    formData,
    addTextField,
    addCheckbox,
    addDropdown,
    handleChange,
    handleSubmit,
    removeField,
    handleLabelChange,
  };
};
