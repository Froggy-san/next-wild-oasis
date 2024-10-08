"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";

export default function Filter() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParam.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParam);

    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className=" border border-primary-800 flex">
      <Button
        onClick={() => handleFilter("all")}
        filter="all"
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        onClick={() => handleFilter("small")}
        filter="small"
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        onClick={() => handleFilter("medium")}
        filter="medium"
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        onClick={() => handleFilter("large")}
        filter="large"
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, onClick, activeFilter, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700  text-primary-200" : ""
      }`}
    >
      {children}
    </button>
  );
}
