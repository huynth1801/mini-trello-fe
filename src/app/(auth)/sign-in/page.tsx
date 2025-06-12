"use client";
import AuthEmailForm from "@/components/auth-form/AuthEmailForm";
import ResourceURL from "@/constants/ResourceURL";

export default function SignInPage() {
  return (
    <AuthEmailForm
      apiUrl={ResourceURL.SEND_TOKEN_SIGN_IN}
      title="Log in to mini trello"
      buttonText="Send code"
      redirectUrl="/verify-token"
      bottomText={
        <>
          If you don't have account,{" "}
          <a href="/sign-up" style={{ color: "blue", textDecoration: "none" }}>
            click here to create account
          </a>
        </>
      }
    />
  );
}
