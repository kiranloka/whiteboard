"use client";

import React from "react";
import { Button, TextField, Typography, Paper, Stack } from "@mui/material";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600} textAlign="center" mb={3}>
        {isSignin ? "Sign In to Your Account" : "Create an Account"}
      </Typography>

      <Stack spacing={3}>
        {!isSignin && (
          <TextField label="Username" variant="outlined" fullWidth required />
        )}

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </Button>
      </Stack>

      <Typography variant="body2" textAlign="center" mt={3}>
        {isSignin ? (
          <>
            Don’t have an account?{" "}
            <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>
              Sign in
            </a>
          </>
        )}
      </Typography>
    </Paper>
  );
}
