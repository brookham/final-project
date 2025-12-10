import type { Metadata } from "next";
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

import { AppThemeProvider } from "./theme/themeProvider";

export const metadata: Metadata = {
  title: "Global Wildfire Tracker",
  description: "interactive wildfire map",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppThemeProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppThemeProvider>
  );
}

export async function GET() {
  try {
    const apiKey = process.env.FIRMS_API_KEY;

    if (!apiKey) {
      console.error("FIRMS_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const FIRMS_URL = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${apiKey}/VIIRS_NOAA20_NRT/world/2`;

    console.log("Fetching from FIRMS API...");
    const response = await fetch(FIRMS_URL);

    if (!response.ok) {
      console.error("FIRMS API error:", response.status, response.statusText);
      const text = await response.text();
      console.error("Response:", text);
      return NextResponse.json(
        { error: `FIRMS API error: ${response.status}` },
        { status: 500 }
      );
    }

    const csv = await response.text();
    console.log("CSV length:", csv.length);

    const parsed = parse(csv, { columns: true });
    console.log("Parsed fires:", parsed.length);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error fetching fire data:", error);
    return NextResponse.json(
      { error: "Failed to fetch fire data" },
      { status: 500 }
    );
  }
}