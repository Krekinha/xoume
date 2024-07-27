"use client";
import Link from "next/link";
import Image from "next/image";
import AvatarDropDownMenu from "./AvatarDownMenu";
import { ToggleTheme } from "./ui/toggle-theme";
/**
 * Esse Navbar é o menu principal do site. Estará visível em
 * todas as rotas que necessite de login
 * @author Krekinha
 * @version 1.0
 */
export default function Navbar({ user }: any) {
  return (
    <div className="border-b border-slate-600">
      <nav className="relative w-full flex flex-wrap py-2 bg-gray-900 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div className="grid grid-cols-2 w-full items-center px-3">
          <div className="flex">
            <div>
              <Link href={"/"} className="font-medium">
                <Image
                  src="/images/logo-aya.png"
                  width={40}
                  height={40}
                  alt="makit"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="justify-self-end">
            <div className="flex gap-2 items-center">
              <ToggleTheme/>
              <span className="text-sky-600 text-[0.75rem] font-bold">
                {user?.nome}
              </span>
              <AvatarDropDownMenu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
