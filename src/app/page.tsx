import {GamesList} from "@/components/pages/catalog/GamesList";
import {GamesGenreFilter} from "@/components/pages/catalog/GamesGenreFilter";
import {Suspense} from "react";
import {GamesTitle} from "@/components/pages/catalog/GamesTitle";
import { GamesListSkeleton } from "./ui/skeletons";

export default async function Catalog(props: {
	searchParams?: {genre?: string; page?: string};
}) {
	const searchParams = props.searchParams;
	const genre = searchParams?.genre || "";
	const page = Number(searchParams?.page || 1);

	return (
		<div className="container-custom py-8 xs:py-10 md:py-12 flex flex-col gap-12">
			{/* Games Title */}
			<GamesTitle />
			{/* Genre Filter Select */}
			<GamesGenreFilter />
			{/* Games List */}
			<Suspense key={genre + page} fallback={<GamesListSkeleton count={6} />}>
				<GamesList genre={genre} page={page} />
			</Suspense>
		</div>
	);
}
