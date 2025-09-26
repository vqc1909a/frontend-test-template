import { GamesButton } from "@/components/pages/catalog/GamesButton";
import { GamesList } from "@/components/pages/catalog/GamesList";
import { GenreFilter } from "@/components/pages/catalog/GenreFilter";
import { Suspense } from "react";
import { GamesListSkeleton } from "../ui/skeletons";

export default async function Catalog(props: {searchParams?: {genre?: string, page?: string}}) {
	const searchParams = props.searchParams;
	const genre = searchParams?.genre || "";
	const page = Number(searchParams?.page || 1);

	return (
		<div className="container-custom py-8 xs:py-10 md:py-12 flex flex-col gap-12">
			<h2 className="uppercase md:normal-case text-2xl leading-7 md:text-4xl md:leading-10 font-bold text-left tracking-[0.4px]">
				Top Sellers
			</h2>
			{/* Genre Filter Select */}
			<GenreFilter />

			{/* Product Grid */}
			<Suspense key={genre + page} fallback={<GamesListSkeleton count={6} />}>
				<GamesList genre={genre} page={page} />
			</Suspense>

			<GamesButton genre={genre} page={page} />
		</div>
	);
}
