import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore } from "next/cache";

export default async function CabinList({ filter }) {
  // unstable_noStore();
  const cabins = await getCabins();
  if (!cabins.length) return null;

  let displayedCabins = [];

  switch (filter) {
    case "all": // Only one case needed for "all"
      displayedCabins = cabins;
      break;
    case "small":
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 3);
      break;
    case "medium":
      displayedCabins = cabins.filter(
        (cabin) => cabin.maxCapacity <= 7 && cabin.maxCapacity >= 3
      );
      break;
    case "large":
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
      break;
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
