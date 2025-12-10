'use client'

import { MapContainer, Circle, TileLayer, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { LatLngExpression } from "leaflet"
import { useEffect, useState } from "react"
import { FireInfo } from "@/type/fireInfo"
import { SpeciesInfo } from "@/type/speciesInfo"
import { CircularProgress, Box } from "@mui/material"

export default function Map() {
  const { position = [39, -98], zoom = 4 } = {
    position: [39, -98] as LatLngExpression,
    zoom: 3,
  }

  const [fires, setFires] = useState<FireInfo[]>([])
  const [species, setSpecies] = useState<SpeciesInfo[]>([])
  const [selectedFire, setSelectedFire] = useState<FireInfo | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchSpecies(lat: number, lon: number) {
    const res = await fetch(`/api/wildlife?lat=${lat}&lon=${lon}&radius=10`)
    const data = await res.json()
    setSpecies(data)
  }

  useEffect(() => {
    setLoading(true)
    fetch("/api/fire")
      .then((r) => r.json())
      .then((data) => {
        setFires(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress size={60} />
        <p style={{ fontSize: "16px", color: "#fff" }}>Loading fire data...</p>
      </Box>
    )
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          height: "90vh",
          width: "95%",
          maxWidth: "1400px",
          border: "3px solid #474545ff",
          // borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <MapContainer
          center={position}
          zoom={zoom}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
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
              eventHandlers={{
                click: async () => {
                  setSelectedFire(fire)
                  await fetchSpecies(fire.latitude, fire.longitude)
                },
              }}
            >
              {selectedFire === fire && (
                <Popup>
                  <div style={{ fontSize: "12px" }}>
                    <h4 style={{ margin: "0 0 8px 0" }}>Fire Info</h4>
                    <p>
                      <strong>Lat:</strong> {fire.latitude}
                    </p>
                    <p>
                      <strong>Lon:</strong> {fire.longitude}
                    </p>
                    <hr />
                    <h4 style={{ margin: "8px 0" }}>Species</h4>
                    {species.length > 0 ? (
                      <ul style={{ margin: "0", paddingLeft: "20px" }}>
                        {species.map((s, i) => (
                          <li key={i}>{s.preferred_common_name || s.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No species found</p>
                    )}
                  </div>
                </Popup>
              )}
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}