export const createMockSearchParams = (params: Record<string, string> = {}) => {
	const searchParams = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		searchParams.set(key, value);
	});

	return searchParams;
};
