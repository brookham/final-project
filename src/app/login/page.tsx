"use client"

import { theme } from '../theme/theme';
import { login, signup } from './actions'
import { Box, Button, Stack, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("https://www.fs.usda.gov/sites/default/files/media_wysiwyg/ca_14-08-23_0326.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 16px",
          color: "#fff",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: "26px",
            color: "#fff",
          }}
        >
          Global Wildfire Tracker
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: "12px",
            color: "#fff",
          }}
        >
          Interact With Fires to See Effected Wildlife
        </Typography>
      </Box>

      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        padding: "20px",
      }}>
        <Paper sx={{
          p: 4,
          background: "rgba(255,255,255,0.92)",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "400px"
        }}>
          <Typography sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 3,
            fontSize: "28px",
            fontWeight: "700",
            color: "#333"
          }}>
            Welcome
          </Typography>

          <form style={{ width: "100%" }}>
            <Stack spacing={2}>
              <Box>
                <label htmlFor="email" style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333"
                }}>Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "2px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                />
              </Box>

              <Box>
                <label htmlFor="password" style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#333"
                }}>Password:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "2px solid #ddd",
                    borderRadius: "6px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                    transition: "border-color 0.3s",
                    fontFamily: "inherit"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#ddd"}
                />
              </Box>

              <Stack spacing={1.5} sx={{ marginTop: 2 }}>
                <Button
                  type="submit"
                  formAction={login}
                  color="success"
                  variant="contained"
                  sx={{
                    padding: "10px 16px",
                    fontSize: "15px",
                    fontWeight: "600",
                    textTransform: "none",
                    borderRadius: "6px",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)"
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  type="submit"
                  formAction={signup}
                  color="success"
                  variant="outlined"
                  sx={{
                    padding: "10px 16px",
                    fontSize: "15px",
                    fontWeight: "600",
                    textTransform: "none",
                    borderRadius: "6px",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      background: "rgba(76, 175, 80, 0.08)"
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  )
}