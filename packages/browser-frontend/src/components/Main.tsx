import { MeFromBackend } from "./users/MeFromBackend";
import { MeFromBrowser } from "./users/MeFromBrowser";
import { PingBackend } from "./users/PingBackend";

export function Main() {
  return (
    <>
      <PingBackend />
      <MeFromBrowser />
      <MeFromBackend />
    </>
  );
}
