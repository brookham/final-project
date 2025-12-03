import { NextResponse } from "next/server"

import { parse } from "csv-parse/sync"


export async function GET() {

  const apiKey = process.env.FIRMS_API_KEY

  const FIRMS_URL = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${apiKey}/VIIRS_NOAA20_NRT/world/1`

  const response = await fetch(FIRMS_URL)

  const csv = await response.text()

  const parsed = parse(csv, { columns: true })


  return NextResponse.json({ csv: parsed })

}
