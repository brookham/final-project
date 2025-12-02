import { theme } from '../theme/theme';
import { login, signup } from './actions'
import { Box, Button, Stack, Typography, Paper } from "@mui/material";

export default function LoginPage() {
  return (
    <Paper sx={{ p: 2, background: theme.palette.secondary.main}}>
      <Typography sx={{display: "flex", justifyContent: "center"}} variant="h6" mb={1}>
        Welcome
      </Typography>

      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <Button type="submit" formAction={login} color="success" variant="contained">Login</Button>
        <Button type="submit" formAction={signup} color="success" variant="contained">sign up</Button>
      </form>
    </Paper>
  )
}