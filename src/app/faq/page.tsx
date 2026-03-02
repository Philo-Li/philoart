import { Metadata } from "next";
import LicensePage from "@/app/license/page";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions and license information",
};

export default function FaqPage() {
  // Keep backward compatibility with the old app where /faq renders license content.
  return <LicensePage />;
}
