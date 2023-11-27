import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MostrarTasks() {
  const session = await getServerAuthSession();
  if (!session) {
    return (
      <div className="mx-auto max-w-screen-xl px-4 py-24 text-center lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
          Administra eficientemente tus tareas!
        </h1>
        <p className="mb-8 text-lg font-normal text-black sm:px-16 lg:px-48 lg:text-xl">
          Inicia sesion o registrate para crear tareas pendientes y establecer recordatorios
        </p>
      </div>
    );
  }

  const tareas = await db.tarea.findMany({
    where: {
      createdById: session.user.id,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl">
          Aqui puedes ver tus tareas!
        </h1>
      <Button asChild className="p-4 mb-4">
        <Link href="/tasks">Agregar Nueva</Link>
      </Button>

      {tareas.map((tarea) => {
        return (
          <form key={tarea.id} className="p-4 mb-4 text-sm rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400">
            <div  className="text-blue-800 text-2xl" >{tarea.titulo}</div>
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
                revalidatePath("/");
                redirect("/");
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
