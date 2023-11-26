"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function ButtonLogin() {
  return (
    <Button className="rounded bg-green-700 px-3 py-2" onClick={() => signIn("google")}>
      Ingresar
    </Button>
  );
}

export function ButtonRegister() {
  return (
    <Button className="rounded bg-slate-400 px-3 py-2" onClick={() => signIn("google")}>
      Registrarme
    </Button>
  );
}

export function ButtonLogout() {
  return (
    <Button
      className="rounded bg-slate-400 px-3 py-2" onClick={() => signOut()}>
      Salir
    </Button>
  );
}
