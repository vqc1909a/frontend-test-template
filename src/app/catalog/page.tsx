import {availableFilters} from "@/utils/endpoint";
import { GenreFilterSelect } from "@/components/GenreFilterSelect";

export default async function Catalog() {

	return (
		<div className="container-custom py-8">
			<h2 className="uppercase md:normal-case text-2xl leading-7 md:text-4xl md:leading-10 font-bold text-left mb-8 tracking-[0.4px]">
				Top Sellers
			</h2>
			{/* Genre Filter Select */}
			<GenreFilterSelect availableFilters={availableFilters} />

		</div>
	);
}
