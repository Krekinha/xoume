import "@/globals.css";
import Providers from "@/providers/Providers";
import { ThemeProvider } from "@/providers/ThemeContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			{/* <body className="h-screen flex flex-col"> */}
			<body className="overflow-hidden">
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"

						//enableSystem
						//disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}
