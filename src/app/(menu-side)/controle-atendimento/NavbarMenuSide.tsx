"use client";
import Link from "next/link";
import Image from "next/image";
/**
 * Esse Navbar é o menu principal do site. Estará visível em
 * todas as rotas que necessite de login
 * @author Krekinha
 * @version 1.0
 */
export default function NavbarMenuSide({ modulo }: any) {
  return (
    <div className="border-b border-slate-300">
      <nav className="relative w-full flex flex-wrap py-2 bg-gray-200 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
        <div className="grid grid-cols-2 w-full items-center px-3">
          <div className="flex">
            <div>
              <Link href={"/"} className="font-medium">
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="justify-self-start">
            <div className="flex gap-2 items-center">
              <span className="text-gray-600 text-[0.75rem] font-bold">
                {modulo}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
