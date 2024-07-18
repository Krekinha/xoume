"use client"

export function FallbackFetch({ error, resetErrorBoundary }: any) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    console.log(error)
  
    return (
      <div role="alert">
        <p>Algo deu errado:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <pre style={{ color: "red" }}>{error.statusText}</pre>
      </div>
    );
  }