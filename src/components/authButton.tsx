"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function ButtonLogin() {
  return (
    <Button className="rounded bg-slate-400 px-3 py-2" onClick={() => signIn()}>
      Ingresar
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
