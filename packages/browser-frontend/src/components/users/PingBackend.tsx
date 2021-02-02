import { useState } from "react";
import { pingBackend } from "../../services/PingService";

export function PingBackend() {
  const [result, setResult] = useState<string>("");
  const onClick = () => {
    pingBackend()
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
          Ping Backend
        </button>
      </div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
