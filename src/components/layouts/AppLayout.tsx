import {Header} from "./Header";
import {Footer} from "./Footer";

interface AppLayoutProps {
	children: React.ReactNode;
}

export const AppLayout = ({children}: AppLayoutProps) => {
	return (
		<>
			<Header />
			<main className="min-h-screen md:overflow-hidden">{children}</main>
			<Footer />
		</>
	);
};
