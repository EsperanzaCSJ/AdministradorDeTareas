import { Button } from "@/components/ui/button";
import Formulario from "./form";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div>Por favor, inicia sesion</div>
    );
  }

  const tareas = await db.tarea.findMany({
    where: {
      createdById: session.user.id,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b  to-[#2e026d]">
      <Formulario />
      {tareas.map((tarea) => {
        return (
          <form key={tarea.id}>
            <div>{tarea.titulo}</div>
            <div>{tarea.descripcion}</div>
            <div>{tarea.vencimiento.toString()}</div>
            <Button>Editar</Button>
            <Button
              variant="destructive"
              formAction={async function () {
                "use server";
                await db.tarea.delete({
                  where: {
                    id: tarea.id,
                  },
                });
                revalidatePath("/")
                redirect('/')
              }}
            >
              Realizada
            </Button>
          </form>
        );
      })}
    </main>
  );
}
