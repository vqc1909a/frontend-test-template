import {GamesGenreFilterSelect} from "./GamesGenreFilterSelect";

export const GamesGenreFilter = () => {
	return (
		<>
			<div className="flex">
				<div className="flex items-center gap-6 w-full md:w-auto ml-auto">
					<label
						htmlFor="genre-filter"
						className="font-bold text-xl leading-6 tracking-wide"
					>
						Genre
					</label>

					<div className="w-0.5 h-[22px] bg-custom-text-primary"></div>

					<GamesGenreFilterSelect />
				</div>
			</div>

			{/* Border General */}
			<div className="border-b border-custom-border-primary w-screen left-1/2 right-1/2 -translate-x-1/2 relative"></div>
		</>
	);
};
