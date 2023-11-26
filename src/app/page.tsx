import Formulario from "./form";
import { getServerAuthSession } from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div>Por favor, inicia sesion</div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Formulario />
    </main>
  );
}
