import { CartProducts } from "./CartProducts";
import { CartSummary } from "./CartSummary";

export const CartContent = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
				{/* Cart Products */}
				<div className="flex-[3_3_0%]">
					<CartProducts />
				</div>

				{/* Cart Summary */}
				<div className="flex-[2_2_0%]">
					<CartSummary />
				</div>
    </div>
  );
}
