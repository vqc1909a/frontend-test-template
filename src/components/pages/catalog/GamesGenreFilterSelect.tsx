'use client';
import { availableFilters } from '@/utils/endpoint';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';


export const GamesGenreFilterSelect = () => {
  const searchParams = useSearchParams();
	const pathname = usePathname();
	const {replace} = useRouter();

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    const params = new URLSearchParams(searchParams);
    params.delete("page");
		params.set("genre", genre);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
		<select
			id="genre-filter"
			className="genre-select flex-1 text-xl leading-6 tracking-[0.4px] bg-custom-bg-primary border-none text-custom-text-primary px-2 py-2 rounded-md focus:outline-none cursor-pointer"
			onChange={onChange}
			defaultValue={searchParams.get("genre") || ""}
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
