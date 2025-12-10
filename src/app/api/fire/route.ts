import { NextResponse } from "next/server"
import { parse } from "csv-parse/sync"

export async function GET() {
  try {
    const apiKey = process.env.FIRMS_API_KEY

    if (!apiKey) {
      console.error("FIRMS_API_KEY is not set")
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Try USA region instead of world - more likely to have data
    const FIRMS_URL = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${apiKey}/VIIRS_NOAA20_NRT/usa/2`

    console.log("Fetching FIRMS data from:", FIRMS_URL.replace(apiKey, "***"))
    const response = await fetch(FIRMS_URL)

    if (!response.ok) {
      console.error("FIRMS API error:", response.status, response.statusText)
      return NextResponse.json({ error: `FIRMS API error: ${response.status}` }, { status: 500 })
    }

    const csv = await response.text()
    console.log("CSV response length:", csv.length)
    console.log("First 500 chars:", csv.substring(0, 500))

    const parsed = parse(csv, { columns: true })
    console.log("Parsed rows:", parsed.length)
    
    if (parsed.length > 0) {
      console.log("First row sample:", parsed[0])
    }

    // Map FIRMS CSV columns to our FireInfo type
    const data = parsed
      .filter((row: any) => row.latitude && row.longitude) // Filter out empty rows
      .map((row: any) => ({
        latitude: parseFloat(row.latitude),
        longitude: parseFloat(row.longitude),
        brightness: row.brightness ? parseFloat(row.brightness) : null,
        confidence: row.confidence,
        acq_date: row.acq_date,
      }))

    console.log(`Returning ${data.length} fires`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching fire data:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
