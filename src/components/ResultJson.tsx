import { FormFieldType } from "../types";

const ResultJson = ({ result }: { result: FormFieldType[] }) => {
  return (
    <pre className="result">
      <strong>JSON Output:</strong>
      {result.length > 0 && JSON.stringify(result, null, 2)}
    </pre>
  );
};

export { ResultJson };
