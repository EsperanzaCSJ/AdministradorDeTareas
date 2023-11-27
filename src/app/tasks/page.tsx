import { getServerAuthSession } from "@/server/auth";
import Formulario from "../form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-4xl">
          Agrega una nueva tarea
        </h1>
      <Formulario />
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">.</h1>
      
      <Button asChild>
        <Link href="./">Consultar mis tareas</Link>
      </Button>
    </main>
  );
}
