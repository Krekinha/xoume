"use client";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "@/components/ToggleTheme";
import { ToggleMainSidebar } from "./ToggleMainSidebar";
import Media from "./Media";
/**
 * Esse Navbar é o menu principal do site. Estará visível em
 * todas as rotas que necessite de login
 * @author Krekinha
 * @version 1.0
 */

interface MainHeaderProps {
	modulo?: string;
}

export default function MainHeader({ modulo }: MainHeaderProps) {
	return (
		// <header className="fixed top-0 z-50 w-full bg-gray-900 border-b border-gray-700">
		<header className="z-50 h-full w-full row-span-1 bg-gray-900 border-b border-gray-700">
			<div className="px-3 pt-2 lg:px-5 lg:pl-3">
				<div className="flex w-full gap-2 justify-between">
					<div className="flex gap-2 ">
						<div>
							<ToggleMainSidebar />
						</div>
						<div className="self-end flex-none mb-[0.15rem]">
							<Link href={"/"}>
								<Image
									src="/images/logo-aya.png"
									width={32}
									height={32}
									alt="makit"
									priority
								/>
							</Link>
						</div>
						<div className="flex items-baseline gap-2 self-end mb-1 sm:mb-0">
							<div className="xoume">
								<span
									className="text-[1.5rem] font-bold text-violet-800 
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] hidden sm:flex shadow-slate-300"
								>
									xoume
								</span>
							</div>
							<div className="divide">
								<span
									className="text-[0.8rem] sm:text-sm text-gray-500 sm:flex hidden
                   font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] uppercase"
								>
									-
								</span>
							</div>
							<div>
								<Media />
								<span
									className="text-[0.8rem] sm:text-sm text-violet-300 flex 
                  font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] shadow-slate-500 uppercase"
								>
									{modulo}
								</span>
							</div>
						</div>
					</div>

					<div className="flex gap-5 ">
						<div className="self-end">
							<ToggleTheme />
						</div>

						<div className="avatar flex flex-none mb-[0.15rem]">
							{/* <Dropdown
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
							</Dropdown> */}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
