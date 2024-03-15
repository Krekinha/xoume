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
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="px-3 pt-2 lg:px-5 lg:pl-3">
        <div className="flex w-full gap-2 justify-between">
          <div className="flex gap-2 ">
            <div className="menu">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none"
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
            </div>
            <div className="logo self-end flex-none mb-[0.15rem]">
              <Image
                src="/images/logo-aya.png"
                width={32}
                height={32}
                alt="makit"
                priority
              />
            </div>
            <div className="flex items-baseline gap-2 self-end mb-1 sm:mb-0">
              <div className="xoume">
                <span
                  className="text-[1.5rem] font-bold text-violet-900 
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] hidden sm:flex"
                >
                  xoume
                </span>
              </div>
              <div className="divide">
                <span
                  className="text-[0.8rem] sm:text-sm text-gray-800 sm:flex hidden
                   font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] uppercase"
                >
                  -
                </span>
              </div>
              <div className="controle">
                <span
                  className="text-[0.8rem] sm:text-sm text-gray-800 flex 
                  font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] uppercase"
                >
                  {modulo}
                </span>
              </div>
            </div>
          </div>

          <div className="avatar flex flex-none self-end mb-[0.15rem]">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  size={"sm"}
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
    </nav>
  );
}
