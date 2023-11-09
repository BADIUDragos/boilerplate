import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

import { useLoginMutation } from "../store";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [triggerLogin, { isLoading, isError, isSuccess, error }] = useLoginMutation();

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerLogin({ username, password });
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <FormContainer xs={12} md={6} className="justify-content-md-center">
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading ? (
          <Loader className="mt-3" style={{ height: "40px", width: "40px" }} />
        ) : (
          <Button
            type="submit"
            variant="primary"
            className="btn-block w-100 mt-3"
          >
            Sign In
          </Button>
        )}
      </Form>

      {isError &&
        error &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data &&
        "detail" in error.data && (
          <Alert variant="danger" className="mt-3">
            {(error.data as { detail: string }).detail}
          </Alert>
        )}
    </FormContainer>
  );
};

export default LoginPage;
