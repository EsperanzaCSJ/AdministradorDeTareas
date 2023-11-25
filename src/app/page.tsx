import { Button } from "@/components/ui/button";
import Formulario from "./form";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div>
        <div>Por favor, inicia sesion</div>
        <Link href="/login">
          <Button>Inciar sesion</Button>
        </Link>
      </div>
    );
  }

  const tareas = await db.tarea.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  to-[#2e026d]">
      <Formulario />
      {tareas.map((tarea) => {
        return (
        <div key={tarea.id}>
          <div>{tarea.titulo}</div>
          <div>{tarea.descripcion}</div>
          <div>{tarea.vencimiento.toString()}</div>
        </div>
        )
      })}
    </main>
  );
}
