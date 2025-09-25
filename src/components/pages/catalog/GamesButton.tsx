import Link from "next/link";

interface GamesButtonProps {
  hasMorePages: boolean;
}

export const GamesButton = ({hasMorePages}: GamesButtonProps) => {
	if (!hasMorePages) return;
	return (
		<div className="flex justify-start items-center">
			<Link href="/" className="btn-primary">
				See More
			</Link>
		</div>
	);
};
