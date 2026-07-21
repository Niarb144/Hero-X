import { NextRequest, NextResponse } from "next/server";

// Only allow proxying from the known image host — prevents this becoming an open proxy
const ALLOWED_HOSTS = new Set(["www.superherodb.com", "superherodb.com"]);

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(imageUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      next: { revalidate: 86400 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Referer: "https://www.superherodb.com/",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
    });

    if (!upstream.ok) {
      const bodyText = await upstream.text().catch(() => "");
      console.error("Image proxy upstream failure:", {
        url: parsed.toString(),
        status: upstream.status,
        statusText: upstream.statusText,
        body: bodyText.slice(0, 300),
      });
      return NextResponse.json({ error: "Failed to fetch image" }, { status: upstream.status || 502 });
    }

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: upstream.status || 502 }
      );
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "Failed to proxy image" }, { status: 500 });
  }
}