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
	// Call resetErrorBoundary() to reset the error boundary and retry the render.

	//const err: ErrorCustom = JSON.parse(error.message)
	console.log(error);

	return (
		<div role="alert">
			<pre style={{ color: "red" }}>{error.message}</pre>
			<button onClick={resetErrorBoundary}>reset</button>
			{/* <pre style={{ color: "red" }}>Code: {err.statusCode}</pre>
        <pre style={{ color: "red" }}>Response: {err.statusText}</pre> */}
		</div>
	);
}
