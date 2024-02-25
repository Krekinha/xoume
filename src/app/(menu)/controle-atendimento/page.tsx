"use client"
import { useState } from "react";

export default function Page() {
  /**
   * etc
   * @author Krekinha
   * @version 1.0
   */
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className="flex overflow-x-hidden h-screen">
        <aside
          className={`base-class ${
            sidebarOpen
              ? "flex-shrink-0 w-64 flex flex-col border-r transition-all duration-300"
              : "ml-64"
          }`}
        >
          {/*:className="{ '-ml-64': !sidebarOpen }">*/}
          <div className="h-64 bg-gray-900"></div>
          <nav className="flex-1 flex flex-col bg-white">
            <a href="#" className="p-2">
              Nav Link 1
            </a>
            <a href="#" className="p-2">
              Nav Link 2
            </a>
            <a href="#" className="p-2">
              Nav Link 3
            </a>
          </nav>
        </aside>
        <div className="flex-1">
          <header className="flex items-center p-4 text-semibold text-gray-100 bg-gray-900">
            <button
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
              }}
              className="p-1 mr-4"
            >
              {/* @onClick={"sidebarOpen = !sidebarOpen"}>*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            Header
          </header>
          <main className="p-4">Main Content</main>
        </div>
      </div>
    </>
  );
}
