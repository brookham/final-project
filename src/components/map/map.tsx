'use client'

import { MapContainer, Circle, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { LatLngExpression } from "leaflet"
import { useEffect, useState } from "react"

export default function Map(props: any) {
  const { position = [39, -98], zoom = 4 } = props as {
    position?: LatLngExpression
    zoom?: number
  }


  return (
    <div style={{ height: "650px", width: "100%" }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={position}
          pathOptions={{ color: "red", fillColor: "#f03", fillOpacity: 0.5 }}
          radius={50000}
        />
      </MapContainer>
    </div>
  )
}