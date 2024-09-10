import { ChangeEvent } from "react";
import { FormFieldType } from "../types";

interface Props {
  field: FormFieldType;
  handleLabelChange: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => void;
  removeField: (id: string) => void;
}

const FormField = (props: Props) => {
  const { field, handleChange, handleLabelChange, removeField } = props;

  return (
    <div className="form__field">
      <input
        type="text"
        placeholder="Label"
        value={field.label}
        onChange={(e) => handleLabelChange(e, field.id)}
      />

      {field.type === "text" && (
        <input
          placeholder="Text field"
          type="text"
          value={field.value}
          onChange={(e) => handleChange(e, field.id)}
        />
      )}

      {field.type === "checkbox" && (
        <input
          type="checkbox"
          checked={field.value as boolean}
          onChange={(e) => handleChange(e, field.id)}
        />
      )}

      {field.type === "dropdown" && (
        <select value={field.value} onChange={(e) => handleChange(e, field.id)}>
          <option value="">Выбери вариант</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
        </select>
      )}

      <button onClick={() => removeField(field.id)}>Удалить</button>
    </div>
  );
};

export { FormField };
