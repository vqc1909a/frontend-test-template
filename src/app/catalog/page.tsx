import {availableFilters} from "@/utils/endpoint";

export default function Catalog() {
	return (
		<div className="container-custom py-8">
			<h2 className="uppercase md:normal-case text-2xl leading-7 md:text-4xl md:leading-10 font-bold text-left mb-8 tracking-[0.4px]">
				Top Sellers
			</h2>
			{/* Genre Filter Select */}
			<div className="flex mb-8">
				<div className="flex items-center gap-5 w-full md:w-auto ml-auto">
					<label
						htmlFor="genre-filter"
						className="font-bold text-xl leading-6 tracking-[0.4px]"
					>
						Genre
					</label>

					<div className="w-0.5 h-[22px] bg-custom-text-primary"></div>

					<select
						id="genre-filter"
						className="flex-auto text-xl leading-6 tracking-[0.4px] bg-custom-bg-primary border-none text-custom-text-primary px-2 py-2 rounded-md focus:outline-none cursor-pointer"
					>
						<option value="">All</option>
						{availableFilters.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
