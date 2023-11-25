import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { createTransport } from "nodemailer";

export const dynamic = "force-dynamic"; // defaults to force-static
export async function GET() {
  const tareasPorRecordar = await db.tarea.findMany({
    where: {
      recordado: false,
      vencimiento: {
        lte: new Date(),
      },
    },
    select: {
      createdBy: {
        select: {
          email: true,
        },
      },
      id: true,
      titulo: true,
      descripcion: true,
    },
  });

  const transport = createTransport({
    auth: {
      user: env.USER_EMAIL,
      pass: env.PASSWORD_EMAIL,
    },
    host: "smtp.gmail.com",
    port: 465,
  });

  for (const recordatorio of tareasPorRecordar) {
    const result = await transport.sendMail({
      to: recordatorio.createdBy.email ?? undefined,
      from: "esperanzasj2012@gmail.com",
      subject: `Recordatorio ${recordatorio.titulo}`,
      text: `Hola! Tu tarea ${recordatorio.titulo}
      con la descripcion: ${recordatorio.descripcion}
      expiro.
      `,
      headers: {
        "X-Entity-Ref-ID": new Date().getTime().toString(),
      },
    });

    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
      throw new Error();
    }
  }

  return new Response("Hola, se vencio una de tus tarea, revisa la pagina", {
    status: 200,
  });
}
