import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable}  h-full antialiased font-public`}
    >
      <body className="min-h-full flex flex-col font-public antialiased">
        <Toaster position="top-center" reverseOrder={false} />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
