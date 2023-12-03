import React, { useState } from "react";

export function GlobalFilterBtn({
  setGlobalFilter,
}: {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [localSearchInput, setLocalSearchInput] = useState("");
  return (
    <>
      {" "}
      <input
        value={localSearchInput ?? ""}
        onKeyDown={(e) => {
          const targetEle = e;
          if (targetEle.key == "Enter") {
            setGlobalFilter(localSearchInput);
          }
        }}
        onChange={(e) => setLocalSearchInput(e.target.value)}
        className="p-1 text-base rounded-md w-96 shadow border border-block"
        placeholder="Press Enter to Search or Click on Icon" />
      <button
        className="ml-3 p-1 group"
        onClick={() => {
          setGlobalFilter(localSearchInput);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search group-hover:fill-blue-500 transition-all group-hover:transition-all "
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </>
  );
}
