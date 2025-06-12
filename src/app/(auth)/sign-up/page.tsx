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
import AuthEmailForm from "@/components/auth-form/AuthEmailForm";

export default function SignUpPage() {
  return (
    <AuthEmailForm
      apiUrl={ResourceURL.SEND_TOKEN_SIGN_UP}
      title="Sign up to mini trello"
      buttonText="Send code"
      redirectUrl="/verify-sign-up-token"
      bottomText={
        <>
          Already have account,{" "}
          <a href="/sign-in" style={{ color: "blue", textDecoration: "none" }}>
            click here to sign in
          </a>
        </>
      }
    />
  );
}
