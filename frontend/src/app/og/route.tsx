import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || siteConfig.title;
  const tagline = searchParams.get("tagline") || siteConfig.tagline;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#030712",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: 60, fontWeight: "bold", textAlign: "center" }}>
        {title}
      </h1>
      <p style={{ fontSize: 28, color: "#a1a1aa", marginTop: 20 }}>{tagline}</p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
