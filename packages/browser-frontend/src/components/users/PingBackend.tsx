import { pingBackend } from "../../services/PingService";
import { ShowAPIResult } from "../common/ShowAPIResult";

export function PingBackend() {
  return <ShowAPIResult buttonText="Ping" fetchData={pingBackend} />;
}
