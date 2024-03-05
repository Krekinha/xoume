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
  const { isOpen, setIsOpen } = useSidemenuContext();
  function test() {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-end justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            <Link href={"/"} className="flex ms-2 md:me-24">
              <Image
                src="/images/logo-aya.png"
                width={24}
                height={24}
                alt="makit"
                priority
                className="me-3 h-auto w-auto"
              />
              <span
                className="self-center text-xl sm:text-2xl whitespace-nowrap
              font-bold align-bottom text-violet-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
              >
                xoume
              </span>
            </Link>
          </div>
          <div>
            <span className="align-bottom text-sm font-semibold text-blue-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] uppercase">
              {modulo}
            </span>
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
