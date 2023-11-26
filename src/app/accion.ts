"use server";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function crear(tarea: {
  titulo: string;
  descripcion: string;
  vencimiento: Date;
}) {
  const session = await getServerAuthSession();
  if (!session?.user.id) throw new Error("No ha iniciado sesion");

  tarea.vencimiento = new Date(tarea.vencimiento);
  await db.tarea.create({
    data: { 
      ...tarea,
      createdById: session.user.id
    },
  });
  revalidatePath("/")
  redirect('/')
}
