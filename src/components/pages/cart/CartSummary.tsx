import Link from "next/link";

export const CartSummary = () => {
	return (
		<div className="flex flex-col gap-8 mt-4 md:mt-0">
			<div className="cart-summary">
				{/* Order Header */}
				<div className="flex flex-col gap-3">
					<h2 className="text-xl leading-6 md:text-2xl md:leading-7 font-bold text-left tracking-wide">
						Order Summary
					</h2>
					<p className="text-lg leading-6 tracking-wide font-normal">
						3 items
					</p>
				</div>
				{/* Order Items */}
				<div className="flex flex-col border-b border-custom-border-card py-6 gap-4">
					<div className="flex items-center justify-between">
						<h3 className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide flex-1 min-w-0 truncate">
							Product Name
						</h3>
						<span className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide whitespace-nowrap flex-shrink-0">
							$ 00.00
						</span>
					</div>
					<div className="flex items-center justify-between">
						<h3 className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide flex-1 min-w-0 truncate">
							Product Name
						</h3>
						<span className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide whitespace-nowrap flex-shrink-0">
							$ 00.00
						</span>
					</div>
					<div className="flex items-center justify-between">
						<h3 className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide flex-1 min-w-0 truncate">
							Product Name
						</h3>
						<span className="text-custom-text-primary font-normal text-lg leading-6 tracking-wide whitespace-nowrap flex-shrink-0">
							$ 00.00
						</span>
					</div>
				</div>
				{/* Order Total */}
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide flex-1 mr-3 truncate">
						Order Total
					</h3>
					<span className="text-custom-text-primary font-bold text-xl leading-6 tracking-wide whitespace-nowrap">
						$ 000.00
					</span>
				</div>
			</div>
			<div className="flex justify-start items-center">
				<Link
					href={"/checkout"}
					className="btn-primary w-full capitalize"
				>
					Checkout
				</Link>
			</div>
		</div>
	);
}
