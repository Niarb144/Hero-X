import { NextRequest, NextResponse } from "next/server";
import { searchHeroesByName, SuperheroApiError } from "@/lib/superhero-api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ query: string }> } // Next 15; use a plain object, not a Promise, on Next 14
) {
  const { query } = await params;

  if (!query?.trim()) {
    return NextResponse.json(
      { error: "A search query is required" },
      { status: 400 }
    );
  }

  try {
    const heroes = await searchHeroesByName(query);
    return NextResponse.json(heroes);
  } catch (error) {
    console.error("Error fetching heroes:", error);
    const status = error instanceof SuperheroApiError ? error.status : 500;
    return NextResponse.json(
      { error: "Failed to fetch heroes from the Superhero API" },
      { status }
    );
  }
}