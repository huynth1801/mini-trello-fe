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
import AppConstants from "@/constants/AppConstants";

interface AuthEmailFormProps {
  apiUrl: string;
  title: string;
  buttonText: string;
  redirectUrl: string;
  bottomText: React.ReactNode;
}

export default function AuthEmailForm({
  apiUrl,
  title,
  buttonText,
  redirectUrl,
  bottomText,
}: AuthEmailFormProps) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await axiosClient.post<ISendCodeResponse>(apiUrl, {
          email,
        });
        const res = response.data;
        if (res.success) {
          router.push(
            `${
              AppConstants.HOME_PATH
            }/${redirectUrl}?email=${encodeURIComponent(email)}`
          );
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
        {title}
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
            buttonText
          )}
        </Button>
      </form>
      {error && (
        <Typography color="error" align="center" mt={2}>
          {error}
        </Typography>
      )}
      <Typography variant="body2" align="center" mt={2}>
        {bottomText}
      </Typography>
    </Paper>
  );
}
