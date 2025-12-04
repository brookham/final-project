'use client'

import { MapContainer, Circle, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { LatLngExpression } from "leaflet"
import { useEffect, useState } from "react"
import { FireInfo } from "@/type/fireInfo"

export default function Map(props: {fires: FireInfo}) {
  const { position = [39, -98], zoom = 4 } = props as {
    position?: LatLngExpression
    zoom?: number
  }

  const [fires, setFires] = useState<FireInfo[]>([])

  useEffect(()=>{
    fetch("/api/fire")
      .then(r => r.json())
      .then(data => setFires(data))
  }, [])

  useEffect(()=>{
    console.log(fires)
  },[fires])

  return (
    <div style={{ height: "650px", width: "100%" }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fires.map((fire: FireInfo, i: number) => (
          <Circle
            key={i}
            center={[fire.latitude, fire.longitude]}
            pathOptions={{ color: "red", fillColor: "#f03", fillOpacity: 0.5 }}
            radius={1000}
          />
        ))}
      </MapContainer>
    </div>
  )
}