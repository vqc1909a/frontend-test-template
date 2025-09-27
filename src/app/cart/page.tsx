import { CartContent } from "@/components/pages/cart/CartContent";
import { CartTitle } from "@/components/pages/cart/CartTitle";
import { CartBackButton } from "@/components/pages/cart/CartBackButton";

export default async function Cart() {

	return (
		<div className="container-custom py-5 xs:py-7 md:py-8 flex flex-col gap-12">
			<CartBackButton />
			<CartTitle />
			<CartContent />
		</div>
	);
}
