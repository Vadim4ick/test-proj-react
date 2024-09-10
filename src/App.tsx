import { useState } from "react";
import { DynamicForm } from "./components/DynamicForm";
import { FormFieldType } from "./types";
import { ResultJson } from "./components/ResultJson";

function App() {
  const [result, setResult] = useState<FormFieldType[]>([]);

  const setJson = (json: FormFieldType[]) => {
    setResult(json);
  };

  return (
    <section>
      <div className="container">
        <div className="body">
          <h1>Dynamic Form Builder</h1>

          <DynamicForm setJson={setJson} />

          <ResultJson result={result} />
        </div>
      </div>
    </section>
  );
}

export default App;
