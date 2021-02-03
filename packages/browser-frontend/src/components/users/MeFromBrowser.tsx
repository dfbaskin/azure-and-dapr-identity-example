import { fetchMeFromBrowser } from "../../services/UserGraphService";
import { ShowAPIResult } from "../common/ShowAPIResult";

export function MeFromBrowser() {
  return (
    <ShowAPIResult
      buttonText="'Me' (from Browser)"
      fetchData={fetchMeFromBrowser}
    />
  );
}
