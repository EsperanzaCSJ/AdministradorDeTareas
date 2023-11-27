import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { ButtonLogin, ButtonLogout, ButtonRegister } from "./authButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <nav className="flex items-center justify-between bg-slate-900 px-40 py-3 text-white">
      <a href="./" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://solucionescontables.net.ve/wp-content/uploads/2023/09/azul_rojo.png" className="h-10" alt="" /></a>
      <div className="flex items-center gap-x-2">
        <p>{session?.user.name}</p>
        {session?.user ? (
        <Avatar>
          <AvatarImage src={session?.user.image ?? ""} />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
        ): (
          <ButtonRegister />
        )}        
        {session && session.user ? <ButtonLogout /> : <ButtonLogin /> }
        
      </div>
    </nav>
  );
}
