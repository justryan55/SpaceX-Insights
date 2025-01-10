"use client";

import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <title>SpaceX Mission Insights</title>
      <NavBar />
      <h1 className="text-white text-4xl font-semibold text-center mt-8">
        Welcome to SpaceX Mission Insights
      </h1>
      <h2 className="text-white text-xl font-semibold text-center mt-6">
        Please navigate using the menu options above to explore launches, ships,
        and rockets{" "}
      </h2>
    </>
  );
}
