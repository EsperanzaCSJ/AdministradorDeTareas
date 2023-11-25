import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout(props: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  if (session && session.user) {
    return redirect("/");
  }
  return <>{props.children}</>;
}
