import "./globals.css";
import type { Metadata } from "next";
import { archivo, inter } from "./ui/fonts";
import { AppLayout } from "@/components/layouts/AppLayout";
import { CartProvider } from "@/utils/context/CartProvider";

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
				<CartProvider>
					<AppLayout>{children}</AppLayout>
				</CartProvider>
			</body>
		</html>
	);
}
