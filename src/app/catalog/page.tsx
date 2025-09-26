import { GamesButton } from "@/components/pages/catalog/GamesButton";
import { GamesList } from "@/components/pages/catalog/GamesList";
import { GenreFilter } from "@/components/pages/catalog/GenreFilter";
import { getGames } from "@/services/getGames";
import { Suspense } from "react";

export default async function Catalog(props: {searchParams?: {genre?: string, page?: string}}) {
	const searchParams = props.searchParams;
	const genre = searchParams?.genre || "";
	const page = Number(searchParams?.page || 1);

	const {totalPages} = await getGames({genre, page});
	const hasMorePages = page < totalPages;

	return (
		<div className="container-custom py-8 xs:py-10 md:py-12 flex flex-col gap-12">
			<h2 className="uppercase md:normal-case text-2xl leading-7 md:text-4xl md:leading-10 font-bold text-left tracking-[0.4px]">
				Top Sellers
			</h2>
			{/* Genre Filter Select */}
			<GenreFilter />

			{/* Product Grid */}
			<Suspense key={genre + page} fallback={<h1>Loading Component</h1>}>
				<GamesList genre={genre} page={page} />
			</Suspense>

			{/* See More Button */}
			<GamesButton hasMorePages={hasMorePages} page={page} />
		</div>
	);
}
