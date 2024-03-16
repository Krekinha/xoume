"use client";

import { Sidemenu } from "@/utils/types";

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
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-900 border-r border-gray-200 sm:translate-x-0"
      aria-label="Sidebar"
      aria-hidden="true"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        {sidemenu?.menu &&
          sidemenu.menu.map((menu, i) => (
            <ul key={i} className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-800 group"
                >
                  <div className="border rounded-lg border-gray-700 p-1 shadow-sm">
                    {menu.icon}
                  </div>

                  <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">
                    {menu.label}
                  </span>
                  {menu.notificacao && (
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {menu.notificacao}
                    </span>
                  )}
                </a>
              </li>
            </ul>
          ))}
      </div>
    </aside>
  );
}
