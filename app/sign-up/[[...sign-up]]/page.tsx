import { redirect } from "next/navigation";

export default function SignUpCatchAllPage() {
  redirect("/register");
}
