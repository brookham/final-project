import { NextResponse } from "next/server"

import { parse } from "csv-parse/sync"


export async function GET() {

  const apiKey = process.env.FIRMS_API_KEY

  const FIRMS_URL = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${apiKey}/VIIRS_NOAA20_NRT/world/2`

  const response = await fetch(FIRMS_URL)

  const csv = await response.text()

  const parsed = parse(csv, { columns: true })

  const data: any[] = []

  parsed.forEach(element => {
    data.push(element)
  });

  return NextResponse.json(data)

}
