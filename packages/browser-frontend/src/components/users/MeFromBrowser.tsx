import { useState } from "react";
import { fetchMeFromBrowser } from "../../services/UserGraphService";

export function MeFromBrowser() {
  const [result, setResult] = useState<string>("");
  const onClick = () => {
    fetchMeFromBrowser()
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
          Fetch Me from Browser
        </button>
      </div>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}
