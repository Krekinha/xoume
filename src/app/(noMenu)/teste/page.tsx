"use client";
import { TransportesList } from "@/app/(menu)/transmanager/transportes/TransportesList";
import MainSidebar, { MenuSidebar } from "@/components/main/MainSidebar";
import TransporteNavbar from "@/components/transmanager/TransporteNavbar";
import { cn } from "@/lib/utils";
import { useState, type CSSProperties, type StyleHTMLAttributes } from "react";

export default function Page() {
	return (
		<div className="flex flex-col gap-1 h-screen bg-red-500 p-2 max-h-screen">
			<Header />
			<Body />
		</div>
	);
}

function Body() {
	return (
		<div className="flex h-full w-full max-h-screen bg-blue-700 p-2 overflow-hidden">
			{/* <MainSidebar /> */}
			<Aside />
			{/* <MainSidebar /> */}
			{/* <Article /> */}
			<main className="flex w-full overflow-auto h-full max-h-screen flex-col bg-pink-700 p-2">
				<div className="flex h-full max-h-screen flex-col items-center gap-1 overflow-y-auto bg-yellow-400 p-2">
					<TransporteNavbar />
					<TransportesList />
					{/* <div className="h-full max-h-screen w-full space-y-2 overflow-y-auto rounded-lg bg-violet-700 p-2">
						{fakeItems(items).map((item) => (
							<div
								key={item}
								className="inline-flex h-20 w-full items-center 
						justify-center rounded-xl bg-gray-950 text-white"
							>
								{item}
							</div>
						))}
					</div> */}
				</div>
			</main>
		</div>
	);
}

function Header() {
	return (
		<header className="border-foreground/10 bg-background/50 h-16 border-b transition-colors w-full flex-none">
			<nav className="max-w-container mx-auto flex size-full flex-row items-center gap-6 px-4">
				<a className="inline-flex items-center gap-3 font-semibold" href="/">
					<div className="flex items-center gap-4">
						<span className="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-network size-5"
							>
								<title>svg</title>
								<rect x="16" y="16" width="6" height="6" rx="1" />
								<rect x="2" y="16" width="6" height="6" rx="1" />
								<rect x="9" y="2" width="6" height="6" rx="1" />
								<path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
								<path d="M12 12V8" />
							</svg>
							ZSA
						</span>
						<button className="ring-offset-background focus-visible:ring-ring bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-star h-4 w-4 text-yellow-500"
							>
								<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
									<title>svg</title>
								</polygon>
							</svg>
							Stars
							<span className="bg-background rounded-full border px-2 py-0.5 text-xs">
								711{" "}
							</span>
						</button>
					</div>
				</a>
				<div className="flex flex-1 flex-row items-center justify-end md:gap-2">
					<button
						type="button"
						className="hover:bg-accent hover:text-accent-foreground [&amp;_svg]:size-5 inline-flex items-center justify-center rounded-md p-1.5 text-sm font-medium transition-colors duration-100 md:hidden"
						aria-label="Open Search"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-search"
						>
							<title>svg</title> <circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
					</button>
					<button
						type="button"
						className="bg-secondary/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground inline-flex w-full max-w-[240px] items-center gap-2 rounded-full border p-1.5 text-sm transition-colors max-md:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-search ms-1 size-4"
						>
							<title>svg</title>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
						Search
						<div className="ms-auto inline-flex gap-0.5 text-xs">
							<kbd className="bg-background rounded-md border px-1.5">K</kbd>
							<kbd className="bg-background rounded-md border px-1.5">⌘</kbd>
						</div>
					</button>
					<button
						type="button"
						className="inline-flex items-center rounded-full border p-0.5 max-lg:hidden"
						aria-label="Toggle Theme"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-sun bg-accent text-accent-foreground dark:text-muted-foreground size-7 rounded-full p-1.5 dark:bg-transparent"
						>
							<title>svg</title>
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2" />
							<path d="M12 20v2" />
							<path d="m4.93 4.93 1.41 1.41" />
							<path d="m17.66 17.66 1.41 1.41" />
							<path d="M2 12h2" />
							<path d="M20 12h2" />
							<path d="m6.34 17.66-1.41 1.41" />
							<path d="m19.07 4.93-1.41 1.41" />
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-moon text-muted-foreground dark:bg-accent dark:text-accent-foreground size-7 rounded-full p-1.5"
						>
							<title>svg</title>
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
						</svg>
					</button>
					<button
						aria-label="Toggle Sidebar"
						data-open="false"
						className="hover:bg-accent hover:text-accent-foreground [&amp;_svg]:size-5 group inline-flex items-center justify-center rounded-md p-1.5 text-sm font-medium transition-colors duration-100 md:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-menu group-data-[open=true]:hidden"
						>
							<title>svg</title>
							<line x1="4" x2="20" y1="12" y2="12" />
							<line x1="4" x2="20" y1="6" y2="6" />
							<line x1="4" x2="20" y1="18" y2="18" />
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-x hidden group-data-[open=true]:block"
						>
							<title>svg</title>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
					<button
						type="button"
						aria-haspopup="dialog"
						aria-expanded="false"
						aria-controls="radix-:R92v6ja:"
						data-state="closed"
						className="hover:bg-accent hover:text-accent-foreground [&amp;_svg]:size-5 inline-flex items-center justify-center rounded-md p-1.5 text-sm font-medium transition-colors duration-100 max-md:hidden lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-ellipsis-vertical"
						>
							<title>svg</title>
							<circle cx="12" cy="12" r="1" />
							<circle cx="12" cy="5" r="1" />
							<circle cx="12" cy="19" r="1" />
						</svg>
					</button>
					<a
						href="https://github.com/IdoPesok/zsa"
						rel="noreferrer noopener"
						target="_blank"
						aria-label="Github"
						className="hover:bg-accent hover:text-accent-foreground [&amp;_svg]:size-5 inline-flex items-center justify-center rounded-md p-1.5 text-sm font-medium transition-colors duration-100 max-lg:hidden"
					>
						<svg role="img" viewBox="0 0 24 24" fill="currentColor">
							<title>svg</title>
							<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
					</a>
				</div>
			</nav>
		</header>
	);
}

function Aside() {
	return (
		<div
			id="dynamic-sidebar"
			data-open="true"
			data-hover="false"
			aria-hidden="false"
			className="z-40 transition-transform max-md:absolute border-r border-gray-700 bg-gray-900"
		>
			<aside
				data-open="false"
				className={cn(
					"md:h-body flex w-full flex-col text-[15px] max-md:fixed",
					"max-md:inset-0 max-md:z-40 max-md:pt-16 max-md:data-[open=false]:hidden",
					"md:sticky md:top-16 md:w-[240px] md:text-sm xl:w-[260px] pt-4",
				)}
			>
				<MenuSidebar />
				{/* <div
					id="sidebar-background"
					className="max-md:bg-background/80 absolute z-[-1] size-full max-md:backdrop-blur-md"
				/>
				<div
					dir="ltr"
					className="flex-1 overflow-hidden"
					style={{ ...customStyle }}
				>
					<div
						data-radix-scroll-area-viewport=""
						className="size-full rounded-[inherit] overflow-hidden"
					>
						<div className=" table min-w-full">
							<div className="flex flex-col gap-8 p-4 pb-10 md:px-3 md:pt-10">
								<div className="flex flex-col md:hidden">
									<a
										href="https://github.com/IdoPesok/zsa"
										rel="noreferrer noopener"
										target="_blank"
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent inline-flex items-center gap-1.5 rounded-lg p-2 text-[15px] transition-colors"
									>
										<svg role="img" viewBox="0 0 24 24" fill="currentColor">
											<title>svg</title>
											<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
										</svg>
										Github
									</a>
								</div>
								<div>
									<p className="mb-2 mt-8 px-2 font-medium first:mt-0">
										Getting Started
									</p>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/introduction"
									>
										Introduction
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/inputs"
									>
										Inputs
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/procedures"
									>
										Procedures
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/outputs"
									>
										Outputs
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/callbacks"
									>
										Callbacks
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/timeouts"
									>
										Timeouts
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/retries"
									>
										Retries
									</a>
									<p className="mb-2 mt-8 px-2 font-medium first:mt-0">
										Client Side Usage
									</p>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/calling-directly"
									>
										Calling Directly
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/use-server-action"
									>
										useServerAction
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/forms"
									>
										Forms
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/react-query"
									>
										React Query
									</a>
									<a
										className="[&amp;_svg]:size-4 bg-primary/10 text-primary flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 font-medium transition-colors duration-100"
										href="/docs/refetching-queries"
									>
										Refetching Queries
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/additional-information"
									>
										Additional Information
									</a>
									<p className="mb-2 mt-8 px-2 font-medium first:mt-0">
										Errors
									</p>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/error-handling"
									>
										Error Handling
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/shape-errors"
									>
										Custom Errors (experimental)
									</a>
									<p className="mb-2 mt-8 px-2 font-medium first:mt-0">
										REST API
									</p>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/configuring-openapi"
									>
										Configuring OpenAPI
									</a>
									<p className="mb-2 mt-8 px-2 font-medium first:mt-0">
										Goodies
									</p>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/best-practices"
									>
										Best Practices
									</a>
									<a
										className="text-muted-foreground [&amp;_svg]:size-4 hover:bg-accent/50 hover:text-accent-foreground/80 flex w-full flex-row items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-100 hover:transition-none"
										href="/docs/infer-types"
									>
										Infer Types
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-row items-center gap-2 border-t p-3 md:p-2">
					<button
						type="button"
						aria-label="Collapse Sidebar"
						className="hover:bg-accent hover:text-accent-foreground [&amp;_svg]:size-5 ms-auto inline-flex items-center justify-center rounded-md p-1.5 text-sm font-medium transition-colors duration-100 max-md:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-panel-left"
						>
							<title>svg</title>
							<rect width="18" height="18" x="3" y="3" rx="2" />
							<path d="M9 3v18" />
						</svg>
					</button>
					<button
						type="button"
						className="inline-flex items-center rounded-full border p-0.5 md:hidden"
						aria-label="Toggle Theme"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-sun bg-accent text-accent-foreground dark:text-muted-foreground size-7 rounded-full p-1.5 dark:bg-transparent"
						>
							<title>svg</title>
							<circle cx="12" cy="12" r="4" />
							<path d="M12 2v2" />
							<path d="M12 20v2" />
							<path d="m4.93 4.93 1.41 1.41" />
							<path d="m17.66 17.66 1.41 1.41" />
							<path d="M2 12h2" />
							<path d="M20 12h2" />
							<path d="m6.34 17.66-1.41 1.41" />
							<path d="m19.07 4.93-1.41 1.41" />
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-moon text-muted-foreground dark:bg-accent dark:text-accent-foreground size-7 rounded-full p-1.5"
						>
							<title>svg</title>
							<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
						</svg>
					</button>
				</div> */}
			</aside>
		</div>
	);
}
