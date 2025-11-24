"use client";

import { Box, Button, Stack, Typography, Paper } from "@mui/material";

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
      <Typography variant="h4" fontWeight={700}>
        MUI Palette Demo
      </Typography>

      <Typography variant="body1">
        Below are the core theme palette colors demonstrated using Buttons and Paper.
      </Typography>

      <Stack direction="column" spacing={3} sx={{ maxWidth: 450 }}>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" mb={1}>
            Primary
          </Typography>
          <Button color="primary" variant="contained">Contained</Button>
          <Button color="primary" variant="outlined" sx={{ ml: 2 }}>Outlined</Button>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" mb={1}>
            Secondary
          </Typography>
          <Button color="secondary" variant="contained">Contained</Button>
          <Button color="secondary" variant="outlined" sx={{ ml: 2 }}>Outlined</Button>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" mb={1}>
            Success
          </Typography>
          <Button color="success" variant="contained">Contained</Button>
          <Button color="success" variant="outlined" sx={{ ml: 2 }}>Outlined</Button>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" mb={1}>
            Warning
          </Typography>
          <Button color="warning" variant="contained">Contained</Button>
          <Button color="warning" variant="outlined" sx={{ ml: 2 }}>Outlined</Button>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" mb={1}>
            Error
          </Typography>
          <Button color="error" variant="contained">Contained</Button>
          <Button color="error" variant="outlined" sx={{ ml: 2 }}>Outlined</Button>
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" mb={1}>
            Info
          </Typography>
          <Button color="info" variant="contained">Contained</Button>
          <Button color="info" variant="outlined" sx={{ ml: 2 }}>Outlined</Button>
        </Paper>

      </Stack>
    </Box>
  );
}