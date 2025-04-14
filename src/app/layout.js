import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css"; // ✅ Import styles
import Header from "./components/Header";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <ClerkProvider>
          <Header />
          <main className="flex-grow">{children}</main>
        </ClerkProvider>
      </body>
    </html>
  );
}
