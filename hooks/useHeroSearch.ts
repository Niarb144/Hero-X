import { useState, useCallback } from "react";
import axios from "axios";
import { Hero } from "@/types/hero";

export function useHeroSearch() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchHero = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHeroes([]);

    try {
      const { data } = await axios.get<Hero[]>(
        `/api/heroes/search/${encodeURIComponent(query)}`
      );
      setHeroes(data);
      if (data.length === 0) setError("No hero found with that name.");
    } catch {
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
      // console.log("Search completed for query:", query); // Debugging log to confirm the search completion
    }
  }, []);

  return { heroes, loading, error, searchHero };
}