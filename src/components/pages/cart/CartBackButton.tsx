import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const CartBackButton = () => {
  return (
		<Link
			href="/"
			className="flex items-center gap-3 transition-colors duration-200 w-fit"
		>
			<Image
				src="/icons/back-icon.svg"
				alt="Back to Catalog"
				width={12}
				height={12}
				className="transition-transform duration-200 group-hover:-translate-x-1"
			/>
			<span className="text-base leading-4 font-medium tracking-normal">
				Back to Catalog
			</span>
		</Link>
	);
}
