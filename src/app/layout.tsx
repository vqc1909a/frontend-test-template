import "./globals.css";
import type { Metadata } from "next";
import { archivo, inter } from "./ui/fonts";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export const metadata: Metadata = {
  title: "Apply Digital Test",
  description: "Frontend development test for Apply Digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<body className={`${archivo.className} ${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
		</html>
	);
}
