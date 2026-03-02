"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { AUTHORIZE } from "@/graphql/mutations";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [authorize, { loading }] = useMutation(AUTHORIZE);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorInfo("");
    try {
      const { data } = await authorize({
        variables: { email, password },
      });
      if (data?.authorize) {
        const { accessToken, expiresAt, user } = data.authorize;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("expirationTime", expiresAt);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        router.push("/");
        router.refresh();
      }
    } catch (e: unknown) {
      setErrorInfo(e instanceof Error ? e.message : "Sign in failed");
      setTimeout(() => setErrorInfo(""), 3000);
    }
  };

  return (
    <div className="container-col-login">
      <div className="container-profile">
        <div className="profile-item">
          <h1>Login</h1>
        </div>
        <div className="profile-item">
          <Image src="/img/logo/logo2.svg" width={150} height={150} alt="logo" className="rounded-circle" />
        </div>
      </div>

      {errorInfo && <Alert variant="danger">{errorInfo}</Alert>}

      <Form onSubmit={handleSubmit}>
        <div className="col-item-1">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <div className="col-item-1">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>
        <div className="col-item-1 margin-tb-2rem">
          {!loading && (
            <Button variant="dark" id="login-button" type="submit">
              Login
            </Button>
          )}
          {loading && (
            <Button variant="dark" id="login-button-loading" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </Button>
          )}
        </div>
      </Form>

      <div className="login-info flex-center">
        Don&apos;t have an account?
        <Link href="/signup">Join</Link>
      </div>
    </div>
  );
}
