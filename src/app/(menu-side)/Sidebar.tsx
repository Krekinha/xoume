"use client";

import { Sidemenu } from "@/utils/types";
import { useSidemenuContext } from "@/context/SidemenuContext";
import AvatarMenuSide from "./AvatarMenuSide";

//import { useSidemenuStore } from "@/store/useSidemenuStore";
interface ISidemenu {
  sidemenu?: Sidemenu;
  session?: any;
}

export default function Sidebar({ sidemenu, session }: ISidemenu) {
  /**
   * etc
   * @author Krekinha
   * @version 1.0
   */

  return (
      <aside
        className="sidebar w-64 bg-indigo-300 h-full md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in"
      >
        <div className="sidebar-header flex items-center justify-start pt-[0.25rem] ">
          <div className="inline-flex">
            <div className="flex items-start w-full px-2">
              <AvatarMenuSide session={session} />
            </div>
          </div>
        </div>
        <div className="sidebar-content px-4">
          {sidemenu?.menu &&
            sidemenu.menu.map((menu, i) => (
              <ul key={i} className="flex flex-col items-start w-full">
                <li className="my-px">
                  <a
                    className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                    href="#"
                  >
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
                    <span className="ml-2 text-sm font-medium">
                      {menu.nome}
                    </span>
                  </a>
                </li>
              </ul>
            ))}
        </div>
      </aside>
  );
}
