const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const GamesListSkeleton = ({ count = 6 }: { count?: number } = {}) => {
  return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
			{Array.from({length: count}).map((_, i) => (
				<div key={i} className="game-card border-gray-200">
					{/* Game Image Skeleton */}
					<div
						className={`relative overflow-hidden rounded-t-2xl bg-gray-200 animate-pulse ${shimmer}`}
						style={{height: "240px"}}
					></div>

					{/* Genre Skeleton */}
					<div
						className={`h-4 bg-gray-200 rounded w-20 mt-4 mb-2 animate-pulse ${shimmer}`}
					></div>

					{/* Product Name and Price Skeleton */}
					<div className="flex items-center justify-between mb-4">
						<div
							className={`h-5 bg-gray-200 rounded flex-1 mr-3 animate-pulse ${shimmer}`}
						></div>
						<div
							className={`h-6 bg-gray-200 rounded w-16 animate-pulse ${shimmer}`}
						></div>
					</div>

					{/* Add to Cart Button Skeleton */}
					<div
						className={`h-12 bg-gray-200 rounded mt-2 animate-pulse ${shimmer}`}
					></div>
				</div>
			))}
		</div>
	);
};

export const GamesButtonSkeleton = () => {
	return (
		<div className="flex justify-start items-center">
			<div
				className={`relative h-12 bg-gray-200 rounded-lg w-full md:w-32 animate-pulse ${shimmer}`}
			>
				{/* Invisible text to maintain proper button proportions */}
				<div className="flex items-center justify-center h-full">
					<span className="opacity-0">See More</span>
				</div>
			</div>
		</div>
	);
};