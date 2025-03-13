import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "../globals.css"; // Ensure global styles are applied

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-gray-100">
          {/* Authentication Header */}
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white shadow">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          {/* Main Content */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
