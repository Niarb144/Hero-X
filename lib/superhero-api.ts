import "server-only";
import { Hero, SuperheroApiSearchResponse } from "@/types/hero";

const API_BASE_URL = "https://superheroapi.com/api";
const ACCESS_TOKEN = process.env.SUPERHERO_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error("Missing SUPERHERO_ACCESS_TOKEN environment variable");
}

export class SuperheroApiError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "SuperheroApiError";
    this.status = status;
  }
}

async function fetchFromSuperheroApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/${ACCESS_TOKEN}${path}`, {
    next: { revalidate: 3600 }, // cache each unique query for 1 hour
  });

  if (!res.ok) {
    throw new SuperheroApiError(
      `Superhero API responded with ${res.status}`,
      res.status
    );
  }

  return res.json() as Promise<T>;
}

export async function searchHeroesByName(name: string): Promise<Hero[]> {
  const data = await fetchFromSuperheroApi<SuperheroApiSearchResponse>(
    `/search/${encodeURIComponent(name)}`
  );

  // The upstream API returns { response: "error" } rather than a 404
  if (data.response === "error") return [];

  return data.results ?? [];
}

export async function getHeroById(id: string): Promise<Hero | null> {
  const data = await fetchFromSuperheroApi<{ response: string } & Hero>(
    `/${id}`
  );

  if (data.response === "error") return null;
  return data as unknown as Hero;
}