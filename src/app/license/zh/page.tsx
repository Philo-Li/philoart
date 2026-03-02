import { Metadata } from "next";
import LicenseLegacyClient from "../LicenseLegacyClient";

export const metadata: Metadata = {
  title: "License (中文)",
  description: "About CC licenses",
};

export default function LicenseZhPage() {
  return <LicenseLegacyClient />;
}
