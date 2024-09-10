// import { useState } from "react";

// function App() {
//   const [fields, setFields] = useState([]);

//   const addTextField = () => {
//     setFields([...fields, { type: "text", id: Date.now() }]);
//   };

//   const addCheckbox = () => {
//     setFields([...fields, { type: "checkbox", id: Date.now() }]);
//   };

//   const addDropdown = () => {
//     setFields([...fields, { type: "dropdown", id: Date.now() }]);
//   };

//   return (
//     <section>
//       <div className="container">
//         <form className="form">
//           <h1>Dynamic Form Builder</h1>

//           <div className="form__action">
//             <button type="button">Добавить текстовое поле</button>
//             <button type="button">Добавить checkbox</button>
//             <button type="button">Добавить dropdown</button>
//           </div>

//           <button className="form__submit">Отправить</button>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default App;
import { useState, ChangeEvent, FormEvent } from "react";

// Define interfaces
interface FormFieldBase {
  id: string;
  type: string;
  label: string;
}

interface TextField extends FormFieldBase {
  type: "text";
  value: string;
}

interface CheckboxField extends FormFieldBase {
  type: "checkbox";
  value: boolean;
}

interface DropdownField extends FormFieldBase {
  type: "dropdown";
  value: string;
}

type FormField = TextField | CheckboxField | DropdownField;

function App() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<FormField[]>([]);

  const addTextField = () => {
    setFields([
      ...fields,
      {
        type: "text",
        id: Date.now().toString(),
        label: "Text Field",
        value: "",
      },
    ]);
  };

  const addCheckbox = () => {
    setFields([
      ...fields,
      {
        type: "checkbox",
        id: Date.now().toString(),
        label: "Checkbox",
        value: false,
      },
    ]);
  };

  const addDropdown = () => {
    setFields([
      ...fields,
      {
        type: "dropdown",
        id: Date.now().toString(),
        label: "Dropdown",
        value: "",
      },
    ]);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string
  ) => {
    const { type, value, checked } = e.target;
    setFields(
      fields.map((field) =>
        field.id === id
          ? {
              ...field,
              value: type === "checkbox" ? checked : value,
            }
          : field
      )
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Convert fields to desired JSON format
    const jsonData = fields.map((field) => ({
      id: field.id,
      type: field.type,
      label: field.label,
      value: field.value,
    }));
    setFormData(jsonData);
    console.log("Form Data:", JSON.stringify(jsonData, null, 2));
  };

  return (
    <section>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Dynamic Form Builder</h1>

          <div className="form__action">
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

          {fields.map((field) => {
            switch (field.type) {
              case "text":
                return (
                  <div key={field.id} className="form__field">
                    <label>{field.label}</label>
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleChange(e, field.id)}
                    />
                  </div>
                );
              case "checkbox":
                return (
                  <div key={field.id} className="form__field">
                    <label>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => handleChange(e, field.id)}
                      />
                      {field.label}
                    </label>
                  </div>
                );
              case "dropdown":
                return (
                  <div key={field.id} className="form__field">
                    <label>{field.label}</label>
                    <select
                      value={field.value}
                      onChange={(e) => handleChange(e, field.id)}
                    >
                      <option value="">Выберите</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                      <option value="Option 3">Option 3</option>
                    </select>
                  </div>
                );
              default:
                return null;
            }
          })}

          <button type="submit" className="form__submit">
            Отправить
          </button>
        </form>

        <pre>
          <strong>JSON Output:</strong>
          {formData.length > 0 && JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </section>
  );
}

export default App;
