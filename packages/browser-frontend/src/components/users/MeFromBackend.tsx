import { fetchMeFromBackend } from "../../services/UserGraphService";
import { ShowAPIResult } from "../common/ShowAPIResult";

export function MeFromBackend() {
  return (
    <ShowAPIResult
      buttonText="'Me' (from Backend)"
      fetchData={fetchMeFromBackend}
    />
  );
}
