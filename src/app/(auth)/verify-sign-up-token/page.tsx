"use client";

import Paper from "@mui/material/Paper";
import { useState, useTransition } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axiosClient from "@/lib/axios";
import ResourceURL from "@/constants/ResourceURL";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter, useSearchParams } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function VerifySignUpTokenPage() {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await axiosClient.post<void>(
          ResourceURL.VERIFY_TOKEN_SIGN_UP,
          { email, verificationCode }
        );
        if (response.status === 201) {
          router.push("/sign-in");
        }
      } catch (error) {
        console.error("Error when sending email", error);
      }
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, minWidth: 320 }}>
      <Typography variant="h5" mb={2} align="center">
        Verify your token
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Token"
          type="string"
          fullWidth
          required
          margin="normal"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
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
              <span>Signing in ...</span>
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Sign up successfully ! Redirect to log in page ...
        </Alert>
      </Snackbar>
    </Paper>
  );
}
