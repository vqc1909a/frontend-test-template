'use client';
import { CartContext } from '@/utils/context/CartContext';
import Image from 'next/image';
import React, { useContext } from 'react'

interface CartProductButtonProps {
  productId: string;
}

export const CartProductButton = ({productId}: CartProductButtonProps) => {
	const {removeFromCart} = useContext(CartContext);

  return (
		<div className="h-full col-start-12 col-end-13 row-start-1 row-end-3 md:col-start-12 md:col-end-13 md:row-start-1 md:row-end-2 flex items-start justify-end md:py-2">
			<button
				className="py-2 px-0 md:px-2 md:py-0"
				onClick={() => removeFromCart(productId)}
			>
				<Image
					src="/icons/delete-icon.svg"
					alt="Delete"
					width={12}
					height={12}
				/>
			</button>
		</div>
	);
}
