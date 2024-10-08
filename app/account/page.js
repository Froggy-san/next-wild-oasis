import React from "react";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

const page = async () => {
  const sesstion = await auth();
  const firstName = sesstion.user.name.split(" ").at(0);

  return (
    <h2 className=" font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
};

export default page;
