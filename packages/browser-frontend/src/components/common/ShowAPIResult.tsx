import { useState } from "react";

interface Props {
  buttonText: string;
  fetchData: () => Promise<any>;
}

export function ShowAPIResult({ buttonText, fetchData }: Props) {
  const [result, setResult] = useState<string>("");
  const onClick = () => {
    setResult("");
    fetchData()
      .then((data) => {
        setResult(JSON.stringify(data, null, 2));
      })
      .catch((err) => {
        setResult(err.toString());
      });
  };
  return (
    <div>
      <div>
        <button type="button" onClick={onClick}>
          {buttonText}
        </button>
      </div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
