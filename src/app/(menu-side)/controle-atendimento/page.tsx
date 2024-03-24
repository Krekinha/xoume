import Home from "./atendimentos/Home";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Page() {
  return (
    <>
      <Home />
    </>
  );
}
