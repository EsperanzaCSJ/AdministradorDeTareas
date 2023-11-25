import { env } from "@/env.mjs";
import { createTransport } from "nodemailer";

export const dynamic = "force-dynamic"; // defaults to force-static
export async function GET(){
  const transport = createTransport({
    auth: {
      user: env.USER_EMAIL,
      pass: env.PASSWORD_EMAIL,
    },
    host: "smtp.gmail.com",
    port: 465,
  });

  const result = await transport.sendMail({
    to: "esperanzasj2012@gmail.com",
    from: "esperanzasj2012@gmail.com",
    subject: "prueba",
    text: "hola",
    headers: {
      "X-Entity-Ref-ID": new Date().getTime().toString(),
    },
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error();
  }
}
