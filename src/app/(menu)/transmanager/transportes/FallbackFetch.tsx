"use client";

import type FetchFailedError from "@/utils/apiErrors";

interface FallbackFetchProps {
	error: FetchFailedError;
	resetErrorBoundary: () => void;
}

export function FallbackFetch({
	error,
	resetErrorBoundary,
}: FallbackFetchProps) {
	return (
		<div role="alert">
			<pre style={{ color: "red" }}>{error.message}</pre>
			<button onClick={resetErrorBoundary}>reset</button>
		</div>
	);
}
