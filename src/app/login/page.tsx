import { type Metadata } from "next";

import Login from "@/components/Login";

export const metadata: Metadata = {
  title: "IConsole | Login",
};

export default function LoginPage() {
  return <Login />;
}
