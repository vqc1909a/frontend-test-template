import Image from "next/image";

export const CartProducts = () => {
	return (
		<div className="flex flex-col gap-0">
			<div className="border-b-[.5px] border-custom-border-card p-4">
				{/* Cart item with fixed height */}
				<div className="grid grid-cols-12 grid-rows-[repeat(4,minmax(0,78px))] md:grid-rows-[repeat(1,minmax(0,156px))] gap-y-3 gap-x-0 md:gap-x-5 md:gap-y-5 items-center">
					{/* Image */}
					<div className="h-full relative col-start-1 col-end-12 row-start-1 row-end-3 md:col-start-1 md:col-end-6 md:row-start-1 md:row-end-2">
						<Image
							src="/game-images/ageofempiresII.jpeg"
							alt="Game"
							fill
							className="object-cover"
						/>
					</div>

					{/* Game Details */}
					<div className="h-full col-start-1 col-end-11 row-start-3 row-end-5 md:col-start-6 md:col-end-11 md:row-start-1 md:row-end-2 flex flex-col gap-3 py-2">
						<p className="text-custom-text-secondary text-base leading-4 font-bold uppercase tracking-normal">
							GENRE
						</p>
						<h3 className="text-custom-text-primary text-xl leading-6 font-bold tracking-wide">
							Product Name
						</h3>
						<p className="text-custom-text-secondary text-base leading-5 font-normal tracking-normal">
							Description if neccesary
						</p>
					</div>

					{/* Price */}
					<div className="h-full col-start-11 col-end-13 row-start-3 row-end-5 md:col-start-11 md:col-end-12 md:row-start-1 md:row-end-2 flex items-end justify-end py-2">
						<span className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide whitespace-nowrap">
							$199
						</span>
					</div>

					{/* Delete */}
					<div className="h-full col-start-12 col-end-13 row-start-1 row-end-3 md:col-start-12 md:col-end-13 md:row-start-1 md:row-end-2 flex items-start justify-end py-2">
						<button className="p-0 md:px-2">
							<Image
								src="/icons/delete-icon.svg"
								alt="Delete"
								width={12}
								height={12}
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
