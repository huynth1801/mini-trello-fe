"use client";

import Paper from "@mui/material/Paper";
import { useState, useTransition } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axiosClient from "@/lib/axios";
import ResourceURL from "@/constants/ResourceURL";
import { ISendCodeResponse } from "@/types/ClientUI";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { AxiosResponse } from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await axiosClient.post<ISendCodeResponse>(
          ResourceURL.SEND_TOKEN_SIGN_IN,
          { email }
        );
        const res = response.data;
        if (res.success) {
          router.push(`/verify-token?email=${encodeURIComponent(email)}`);
        } else {
          setError(res.message || "Invalid email");
        }
      } catch (error) {
        console.error("Error when sending email", error);
      }
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, minWidth: 320 }}>
      <Typography variant="h5" mb={2} align="center">
        Log in to mini trello
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isPending}
          sx={{ mt: 2 }}
        >
          {isPending ? (
            <div className="flex items-center space-x-2">
              <CircularProgress size={"20px"} />
              <span>Sending code ...</span>
            </div>
          ) : (
            "Send code"
          )}
        </Button>
      </form>
      <Typography variant="body2" align="center" mt={2}>
        If you don't have account,{" "}
        <a href="/sign-up" style={{ color: "#1976d2", textDecoration: "none" }}>
          click here to create account
        </a>
      </Typography>
    </Paper>
  );
}
