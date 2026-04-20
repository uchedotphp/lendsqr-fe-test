import { Work_Sans } from "next/font/google";
import type { Metadata } from "next";
import "@/app/styles/globals.scss";
import { AppProviders } from "@/app/_providers/app-providers";

export const metadata: Metadata = {
  title: "Lendsqr Dashboard",
  description: "Lendsqr frontend assessment implementation",
};

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
