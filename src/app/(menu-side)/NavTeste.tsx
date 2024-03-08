"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { useSidemenuContext } from "@/context/SidemenuContext";
/**
 * Esse Navbar é o menu principal do site. Estará visível em
 * todas as rotas que necessite de login
 * @author Krekinha
 * @version 1.0
 */

export default function NavTeste({ modulo }: any) {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-end justify-between">
          <div className="bg-red-400 gap-2 flex items-end justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <div className="bg-green-400">
              <Link href={"/"}>
                <div className="flex gap-2">
                  <div className="flex-none">
                    <Image
                      src="/images/logo-aya.png"
                      width={32}
                      height={32}
                      alt="makit"
                      priority
                    />
                  </div>
                  <div>
                    <span
                      className="text-2xl
                      font-bold align-bottom text-violet-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]"
                    >
                      xoume
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex bg-yellow-400">
              <span className="align-bottom text-sm font-semibold text-blue-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] uppercase">
                {modulo}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                }
              >
                <DropdownHeader>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">
                    name@flowbite.com
                  </span>
                </DropdownHeader>
                <DropdownItem>Dashboard</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>Earnings</DropdownItem>
                <DropdownDivider />
                <DropdownItem>Sign out</DropdownItem>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
