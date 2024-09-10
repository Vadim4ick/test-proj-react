// // Define interfaces

export enum FieldVariant {
  TEXT = "text",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
}
interface FormFieldBase {
  id: string;
  type: string;
  label: string;
}

interface TextField extends FormFieldBase {
  type: FieldVariant.TEXT;
  value: string;
}

interface CheckboxField extends FormFieldBase {
  type: FieldVariant.CHECKBOX;
  value: boolean;
}

interface DropdownField extends FormFieldBase {
  type: FieldVariant.DROPDOWN;
  value: string;
}

export type FormFieldType = TextField | CheckboxField | DropdownField;
