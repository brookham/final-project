export type SpeciesInfo = {
  name: string,
  preferred_common_name?: string,
  photo?: string
}

export type iNaturalistResponse = {
  total_results: number
  page: number
  per_page: number
  results: Array<{
    taxon?: {
      name: string
      preferred_common_name?: string
      default_photo?: {
        square_url?: string
        medium_url?: string
      }
    }
  }>
}

export function mapSpeciesInfo(data: iNaturalistResponse): SpeciesInfo[] {
  return data.results
    .filter(r => r.taxon)
    .map(r => ({
      name: r.taxon!.name,
      preferred_common_name: r.taxon!.preferred_common_name,
      photo: r.taxon!.default_photo?.square_url || r.taxon!.default_photo?.medium_url,
    }))
}