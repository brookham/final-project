"use client";

import { Box } from "@mui/material";

import Map from "@/components/map/page";

export default function Home() {

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box>
        <Map />
      </Box>
    </Box>
  );
}