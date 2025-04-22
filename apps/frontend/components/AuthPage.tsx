"use client";

import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleAuth = async () => {
    try {
      setError("");
      setSuccess("");

      const Endpoint = isSignin
        ? "http://localhost:3001/api/v1/user/signin"
        : "http://localhost:3001/api/v1/user/signup";

      const payload = isSignin
        ? { email, password }
        : { email, password, name };

      const response = await axios.post(Endpoint, payload);
      if (isSignin) {
        localStorage.setItem("token", response.data.token);
      }
      console.log(response);
      setSuccess(response.data.message || "success");
      router.push("/canvas/1");
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Request failed");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
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
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ textTransform: "none", fontWeight: 600 }}
          onClick={handleAuth}
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
