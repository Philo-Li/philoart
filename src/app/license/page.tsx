import { Metadata } from "next";
import LicenseLegacyClient from "./LicenseLegacyClient";

export const metadata: Metadata = {
  title: "License",
  description: "About CC licenses",
};

export default function LicensePage() {
  return <LicenseLegacyClient />;
}
