"use client";

import Link from "next/link";
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";


interface GamesButtonProps {
  hasMorePages: boolean;
	page: number;
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

export const GamesButton = ({hasMorePages, page}: GamesButtonProps) => {
  const pathname = usePathname();
	const searchParams = useSearchParams();

	if (!hasMorePages) return;
	return (
		<div className="flex justify-start items-center">
			<Link href={createPageURL(page + 1, pathname, searchParams)} className="btn-primary">
				See More
			</Link>
		</div>
	);
};
