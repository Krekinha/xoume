import "@/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-600 h-screen flex flex-col">
      {children}
      </body>
    </html>
  );
}
