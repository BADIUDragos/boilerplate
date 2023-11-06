import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import FormContainer from "../components/FormContainer";

import { useLoginMutation } from "../store";
import { setCredentials } from "../store/slices/authSlice";
import { decodeTokenAndSetDecodedInfo } from "../functions/decoding";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null
  );

  const [triggerLogin, { isLoading }] = useLoginMutation();

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await triggerLogin({ username, password }).unwrap();

      if (result) {
        const { access, refresh } = result;
        const decodedInfo = decodeTokenAndSetDecodedInfo(access);

        dispatch(
          setCredentials({
            accessToken: access,
            refreshToken: refresh,
            userInfo: decodedInfo,
          })
        );

        setErrorMessage(null);
        navigate("/")
      }
    } catch (error: any) {
      setErrorMessage(`${error.data.detail}`);
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

      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </FormContainer>
  );
};

export default LoginPage;
