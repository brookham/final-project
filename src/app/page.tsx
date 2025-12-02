"use client";

import { Box, Button, Stack, Typography, Paper } from "@mui/material";

import Map from "../components/map";

export default function HomePage() {
  
  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Map/>
    </Box>
  );
}