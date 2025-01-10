"use client";

import Launches from "@/components/Launches";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <title>SpaceX Mission Insights</title>
      <NavBar />
      <Launches />
    </>
  );
}
