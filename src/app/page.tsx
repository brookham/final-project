"use client";

import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Map from "@/components/map/page";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  async function signOut(){
    await fetch("api/signout")
    router.push("/login")
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url("https://www.fs.usda.gov/sites/default/files/media_wysiwyg/ca_14-08-23_0326.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "20px 16px",
          color: "#fff",
          position: "relative",
          background: "rgba(0, 0, 0, 0.4)", // semi-transparent dark background
          backdropFilter: "blur(4px)", // optional: adds subtle blur effect
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: 700,
            fontSize: "26px",
            color: "#fff",
          }}
        >
          Global Wildfire Tracker
        </Typography>
        <Box sx={{ marginLeft: "auto" }}>
          <IconButton
            aria-label="logout"
            size="large"
            sx={{ color: "#fff" }}
            onClick={signOut}
          >
            <LogoutIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Map />
      </Box>
    </Box>
  );
}