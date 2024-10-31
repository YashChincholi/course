import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";

const piazzolla = localFont({
  src: "./fonts/Piazzolla-VariableFont_wght.woff",
  variable: "--font-piazzolla",
  weight: "100 900",
});

export const metadata = {
  title: "Alpha Wave",
  description:
    "It can generate the courses using gemini ai and provide youtube videos using youtube api integration with its minimal styling and interactive user interface.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <GoogleOneTap />
        <body className={`${piazzolla.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
