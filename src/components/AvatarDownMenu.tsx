"use client";
import React, { type ReactNode } from "react";
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

export default function AvatarDropDownMenu() {
	const { status } = useSession();
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
			<div className="relative inline-block text-left ml-3">
				<DropdownMenuPrimitive.Root>
					<DropdownMenuPrimitive.Trigger asChild>
						<button
							type="button"
							className="bg-gray-100 text-white active:bg-gray-100 hover:bg-gray-100 py-1 px-1 border font-bold uppercase shadow-md hover:shadow-lg outline-none focus:shadow-lg focus:bg-gray-100 mr-1 mb-1 ease-linear transition-all duration-150 rounded-full"
						>
							<Image src="/images/user.png" alt={""} width={25} height={25} />
						</button>
					</DropdownMenuPrimitive.Trigger>
					<DropdownMenuPrimitive.Portal>
						<DropdownMenuPrimitive.Content
							align="end"
							sideOffset={5}
							className={clsx(
								"radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
								"w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56",
								"bg-zinc-900 ml-4 border border-zinc-600",
							)}
						>
							{/* Outros Menus */}

							{generalMenuItems.map(({ label, icon, shortcut, link }, i) => (
								<Link key={link} href={link} className="font-medium">
									<DropdownMenuPrimitive.Item
										className={clsx(
											"flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
											"text-gray-500 hover:bg-zinc-700 cursor-pointer",
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
									"text-gray-500 cursor-pointer hover:bg-zinc-700",
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
