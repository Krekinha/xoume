"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsArrowDownCircleFill } from "react-icons/bs";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import { FaUserCog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
/**
 * Menu Avatar que ficará sempre visível na Navbar.
 * Os principais menus do site deverão estar aqui
 * como perfil, configurações, login, etc. Foi criado
 * com o auxilio da bibliotece de css radix
 * @author Krekinha
 * @version 1.0
 */

interface RadixMenuItem {
  label: string;
  shortcut?: string;
  icon?: ReactNode;
  link: string;
}

export default function AvatarMenuSide({ session }: any) {
  const generalMenuItems: RadixMenuItem[] = [
    {
      label: "Perfil",
      icon: <FaUserCog className=" text-sky-500 mr-2 h-3.5 w-3.5" />,
      link: "#",
    },
    {
      label: "Configurações",
      icon: <IoSettingsSharp className=" text-sky-500 mr-2 h-3.5 w-3.5" />,
      link: "#",
    },
  ];

  return (
    <>
      <div className="relative inline-block">
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger asChild>
            <button
              type="button"
              className="hover:bg-gray-100 py-1 px-2 active:bg-gray-500 mr-1 mb-1 ease-linear transition-all outline-none duration-150 rounded-full"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 py-1 px-1 active:bg-gray-100 border shadow-md hover:shadow-none outline-none rounded-full">
                  <Image
                    src="/images/user.png"
                    alt={""}
                    width={16}
                    height={16}
                  />
                </div>

                <span className="text-gray-900 text-[0.70rem] font-bold uppercase">
                  {session.user.nome}
                </span>
              </div>
            </button>
          </DropdownMenuPrimitive.Trigger>
          <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
              align="end"
              sideOffset={5}
              className={clsx(
                "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
                "w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
                "bg-zinc-900 ml-4 border border-zinc-600"
              )}
            >
              {/* Outros Menus */}

              {generalMenuItems.map(({ label, icon, shortcut, link }, i) => (
                <Link key={`${label}-${i}`} href={link} className="font-medium">
                  <DropdownMenuPrimitive.Item
                    className={clsx(
                      "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                      "text-gray-500 hover:bg-zinc-700 cursor-pointer"
                    )}
                  >
                    {icon}
                    <span className="flex-grow text-gray-300">{label}</span>
                    {shortcut && <span className="text-xs">{shortcut}</span>}
                  </DropdownMenuPrimitive.Item>
                </Link>
              ))}

              <DropdownMenuPrimitive.Separator className="my-1 h-px bg-gray-700" />

              {/* Menu Login/Logout*/}
              <DropdownMenuPrimitive.Item
                onClick={() => {
                  signOut();
                }}
                className={clsx(
                  "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                  "text-gray-500 cursor-pointer hover:bg-zinc-700"
                )}
              >
                <BsArrowDownCircleFill className="text-red-500 mr-2 h-3.5 w-3.5" />

                <span className="flex-grow text-gray-300">{"Sair"}</span>
              </DropdownMenuPrimitive.Item>
            </DropdownMenuPrimitive.Content>
          </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
      </div>
    </>
  );
}
