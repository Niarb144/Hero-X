"use client";

import { useState } from "react";
import HeroLoader from "../components/HeroLoader";
import { useHeroSearch } from "@/hooks/useHeroSearch";
import { proxiedImageUrl } from "@/lib/image-proxy";
import Image from "next/image";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const { heroes, loading, error, searchHero } = useHeroSearch();

  return (
    <main
      className="relative min-h-screen md:w-full bg-gray-900 text-white p- bg-cover bg-center"
      style={{ backgroundImage: "url('/images/comics-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 rounded-lg"></div>

      <div className="flex gap-4 pt-30 pl-8 z-10 relative">
        <input
          className="p-2 rounded text-white bg-gray-700"
          placeholder="Search hero..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchHero(query)}
        />
        <button
          onClick={() => searchHero(query)}
          disabled={loading}
          className={`px-4 py-2 rounded transition-all duration-300 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {loading && <HeroLoader />}
      {!loading && error && (
        <p className="relative z-10 pl-8 mt-4 text-red-400">{error}</p>
      )}

      {!loading && heroes.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mt-10 p-4 z-10 relative">
          {heroes.map((hero) => (
            <div
              key={hero.id}
              className="relative bg-gray-800 md:h-[64dvh] p-4 rounded-lg hover:scale-[1.02] transition-transform duration-300"
              style={{
                backgroundImage: `url(${proxiedImageUrl(hero.image.url)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-bl from-black/0 via-black/40 to-black/80" />

              <h2 className="absolute text-4xl font-bold mt-2 z-10 bottom-10 md:w-[50%]">
                {hero.name}
              </h2>
              <h3 className="absolute text-xl bottom-2 md:w-[50%]">
                {hero.biography["full-name"]}
              </h3>
              <h3 className="absolute text-xl bottom-2 md:w-[50%]">
                {hero.biography["full-name"]}
              </h3>

              <ul className="absolute bottom-4 right-4 mt-2 text-sm z-10">
                <li>Gender: {hero.appearance.gender}</li>
                <li>Race: {hero.appearance.race}</li>
                <li>
                  Height: {hero.appearance.height[1]}/{hero.appearance.height[0]}
                </li>
                <li>Weight: {hero.appearance.weight[1]}</li>
                <li>Eye Color: {hero.appearance["eye-color"]}</li>
                <li>Hair Color: {hero.appearance["hair-color"]}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}