import { NextResponse } from "next/server";
import { mapSpeciesInfo } from "@/type/speciesInfo";

export async function GET(request: Request){

  const { searchParams } = new URL(request.url)
  
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")
  const radius = parseFloat(searchParams.get("radius") || "10");

  const url = `https://api.inaturalist.org/v1/observations?lat=${lat}&lng=${lon}&radius=${radius}`

  const res = await fetch(url)

  const data = await res.json()

  const species = mapSpeciesInfo(data)

  return NextResponse.json(species)

}