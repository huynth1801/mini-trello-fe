"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" color="primary" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6">My Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
}
