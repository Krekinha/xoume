"use client"

import FetchFailedError from "@/utils/apiErrors";

interface FallbackFetchProps {
    error: FetchFailedError
    resetErrorBoundary: ()=> void
}

interface ErrorCustom {
    message?: string;
    statusCode?: number;
    statusText?: string;
}

export function FallbackFetch({ error, resetErrorBoundary }: FallbackFetchProps) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    const err: ErrorCustom = JSON.parse(error.message)
    console.log(err);

  
    return (
      <div role="alert">
        <pre style={{ color: "red" }}>{err.message}</pre>
        <pre style={{ color: "red" }}>Code: {err.statusCode}</pre>
        <pre style={{ color: "red" }}>Response: {err.statusText}</pre>
      </div>
    );
  }