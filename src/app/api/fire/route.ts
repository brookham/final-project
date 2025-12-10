import { NextResponse } from "next/server"
import { parse } from "csv-parse/sync"

export async function GET() {
  try {
    // Log all environment variables (mask the key)
    console.log("Environment variables available:", Object.keys(process.env).filter(key => key.includes('FIRMS') || key.includes('firms')))
    
    const apiKey = process.env.FIRMS_API_KEY
    
    console.log("API Key value:", apiKey ? "SET" : "NOT SET")
    console.log("API Key length:", apiKey?.length)

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json({ 
        error: "API key not configured",
        envKeys: Object.keys(process.env).filter(k => k.includes('FIRMS'))
      }, { status: 500 })
    }

    const FIRMS_URL = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${apiKey}/VIIRS_NOAA20_NRT/usa/2`

    console.log("Making request to FIRMS...")
    const response = await fetch(FIRMS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })

    console.log("Response status:", response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("FIRMS API error:", response.status, response.statusText)
      console.error("Error body:", errorText.substring(0, 200))
      return NextResponse.json({ 
        error: `FIRMS API error: ${response.status}`,
        details: errorText.substring(0, 200)
      }, { status: 500 })
    }

    const csv = await response.text()
    console.log("CSV response length:", csv.length)
    console.log("First 300 chars:", csv.substring(0, 300))

    const parsed = parse(csv, { columns: true })
    console.log("Parsed rows:", parsed.length)

    const data = parsed
      .filter((row: any) => row.latitude && row.longitude)
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
