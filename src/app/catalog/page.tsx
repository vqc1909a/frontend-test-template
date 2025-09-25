import { GamesList } from "@/components/GamesList";
import { GenreFilter } from "@/components/GenreFilter";
import { getGames } from "@/services/getGames";
import Image from "next/image";

export default async function Catalog() {
	const {games, availableFilters, totalPages, currentPage} = await getGames({});
	return (
		<div className="container-custom py-8">
			<h2 className="uppercase md:normal-case text-2xl leading-7 md:text-4xl md:leading-10 font-bold text-left mb-10 tracking-[0.4px]">
				Top Sellers
			</h2>
			{/* Genre Filter Select */}
			<GenreFilter availableFilters={availableFilters} />

    	{/* Product Grid */}
			<GamesList games={games} />
			
		</div>
	);
}
