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
import { CREATE_USER, AUTHORIZE } from "@/graphql/mutations";

export default function SignUpPage() {
  const router = useRouter();
  const [errorInfo, setErrorInfo] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [createUser, { loading: creatingUser }] = useMutation(CREATE_USER);
  const [authorize, { loading: authorizing }] = useMutation(AUTHORIZE);
  const loading = creatingUser || authorizing;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorInfo("");

    if (formData.password !== formData.confirmPassword) {
      setErrorInfo("Passwords must match");
      return;
    }

    try {
      await createUser({
        variables: {
          username: formData.username,
          email: formData.email,
          firstName: formData.username,
          password: formData.password,
        },
      });

      const { data } = await authorize({
        variables: {
          email: formData.email,
          password: formData.password,
        },
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
      setErrorInfo(e instanceof Error ? e.message : "Sign up failed");
      setTimeout(() => setErrorInfo(""), 3000);
    }
  };

  return (
    <div className="container-col-login">
      <div className="container-profile">
        <div className="profile-item">
          <h1>Sign up</h1>
        </div>
        <div className="profile-item">
          <Image src="/img/logo/logo2.svg" width={150} height={150} alt="logo" className="rounded-circle" />
        </div>
      </div>

      <div className="login-info flex-center">
        Already have an account?
        <Link href="/signin">Login</Link>
      </div>

      {errorInfo && <Alert variant="danger">{errorInfo}</Alert>}

      <Form onSubmit={handleSubmit}>
        <div className="col-item-1">
          <Form.Label>Username *</Form.Label>
          <Form.Control
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="col-item-1">
          <Form.Label>Email Address *</Form.Label>
          <Form.Control
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="col-item-1">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="col-item-1">
          <Form.Label>Password Confirm *</Form.Label>
          <Form.Control
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>

        <div className="col-item-1 margin-tb-2rem">
          {!loading && (
            <Button variant="dark" id="signup-button" type="submit">
              Sign up
            </Button>
          )}
          {loading && (
            <Button variant="dark" id="signup-button-loading" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
