'use client';
import { availableFilters } from '@/utils/endpoint';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';


export const GenreFilterSelect = () => {
  const searchParams = useSearchParams();
	const pathname = usePathname();
	const {replace} = useRouter();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    const params = new URLSearchParams(searchParams);

    !!genre ? params.set("genre", genre) : params.delete("genre");

    replace(`${pathname}?${params.toString()}`);
  }
  return (
		<select
			id="genre-filter"
			className="genre-select flex-auto text-xl leading-6 tracking-[0.4px] bg-custom-bg-primary border-none text-custom-text-primary px-2 py-2 rounded-md focus:outline-none cursor-pointer"
      onChange={onChange}
		>
			<option value="">All</option>
			{availableFilters.map((genre) => (
				<option key={genre} value={genre}>
					{genre}
				</option>
			))}
		</select>
	);
}
