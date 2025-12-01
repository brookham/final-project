'use client'

import { MapContainer, Marker, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css" // safe to import CSS at module scope
import type { LatLngExpression } from "leaflet"
import { useEffect, useState } from "react"

export default function Map(props: any) {
  const { position = [39, -98], zoom = 4 } = props as {
    position?: LatLngExpression
    zoom?: number
  }

  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const L = await import("leaflet")

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      })
      if (mounted) setReady(true)
    })()
    return () => {
      mounted = false
    }
  }, [])

  if (!ready) {
    return <div style={{ height: "400px", width: "100%", background: "#f5f5f5" }} />
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
      </MapContainer>
    </div>
  )
}