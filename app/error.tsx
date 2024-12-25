// app/error.tsx
"use client";

import { useEffect } from "react";
import Card from "@/app/components/shared/Card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-red-500">
            Something went wrong!
          </h2>
          <p className="mt-4">{error.message}</p>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Try again
          </button>
        </div>
      </Card>
    </div>
  );
}
