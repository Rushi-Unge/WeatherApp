import React from "react";

export default function Loader() {
  return (
    <div className="mt-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-400 mx-auto"></div>
      <p className="text-center mt-2 text-blue-300">Loading...</p>
    </div>
  );
}
