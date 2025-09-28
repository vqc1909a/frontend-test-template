"use client";

import Link from "next/link";
import {
	ReadonlyURLSearchParams,
	usePathname,
	useSearchParams,
} from "next/navigation";

interface GamesButtonProps {
	totalPages: number;
	currentPage: number;
}

const createPageURL = (
	page: number,
	pathname: string,
	searchParams: ReadonlyURLSearchParams
) => {
	const params = new URLSearchParams(searchParams);
	params.set("page", String(page));
	return `${pathname}?${params.toString()}`;
};

export const GamesButton = ({totalPages, currentPage}: GamesButtonProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();


	const hasMorePages = currentPage < totalPages;

	if (!hasMorePages) {
		return null;
	}

	return (
		<div className="flex justify-start items-center">
			<Link
				href={createPageURL(currentPage + 1, pathname, searchParams)}
				className="btn-primary w-full md:w-auto"
			>
				See More
			</Link>
		</div>
	);
};
