"use client"

import { useForm, type SubmitHandler } from "react-hook-form";
import { crear } from "./accion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Inputs = {
  titulo: string;
  descripcion: string;
  vencimiento: Date;
};

export default function Formulario() {
  const form = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await crear(data)
    form.reset();
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <Input defaultValue="test" {...form.register("titulo")} />

      {/* include validation with required or other standard HTML validation rules */}
      <Input {...form.register("descripcion", { required: true })} />

      {/* errors will return when field validation fails  */}
      {form.formState.errors.descripcion && <span>Este campo es obligatorio</span>}

      <Input type="datetime-local" {...form.register("vencimiento")} />
      <Button type="submit">Guardar</Button>
    </form>
  );
}
