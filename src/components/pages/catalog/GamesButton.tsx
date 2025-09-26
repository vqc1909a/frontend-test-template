"use client";

import { GamesButtonSkeleton } from "@/app/ui/skeletons";
import {getGames} from "@/services/getGames";
import Link from "next/link";
import {
	ReadonlyURLSearchParams,
	usePathname,
	useSearchParams,
} from "next/navigation";
import {useEffect, useState} from "react";

interface GamesButtonProps {
	genre: string;
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

export const GamesButton = ({genre, page}: GamesButtonProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const hasMorePages = currentPage < totalPages;

	useEffect(() => {
		const getGamesService = async () => {
			setLoading(true);
			const {totalPages, currentPage} = await getGames({genre, page});
			setTotalPages(totalPages);
      setCurrentPage(currentPage);
			setLoading(false);
		};

		getGamesService();
	}, [genre, page]);
  
  if(loading) {
    return <GamesButtonSkeleton />
  }

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
