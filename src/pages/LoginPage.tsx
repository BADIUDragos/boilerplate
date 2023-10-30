import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import FormContainer from "../components/FormContainer";

import { useLoginMutation } from "../store/store";
import { setCredentials } from "../store/slices/authSlice";
import { decodeTokenAndSetDecodedInfo } from "../functions/decoding";
import { getErrorDetails } from "../functions/apiErrorHandling";
import Loader from "../components/Loader";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const [triggerLogin, { data, error, isLoading }] = useLoginMutation();

  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const results = await triggerLogin({ username, password });
      const { status, detail } = getErrorDetails(results);
  
      if ('data' in results && results.data) {
        const { access, refresh } = results.data;
        const decodedInfo = decodeTokenAndSetDecodedInfo(access);
        
        dispatch(setCredentials({
          accessToken: access,
          refreshToken: refresh,
          decodedAccessTokenInfo: decodedInfo,
        }));
      }
  
      if (detail) {
        setErrorMessage(`${detail}`);
      }
  
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <FormContainer xs={12} md={6}>
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
        <Button
          type="submit"
          variant="primary"
          className="btn-block w-100 mt-3"
        >
          Sign In
        </Button>
      </Form>

      {isLoading && <Loader />}

      {errorMessage && (
        <Alert variant="danger" className="mt-3">
          {errorMessage}
        </Alert>
      )}
    </FormContainer>
  );
};

export default LoginPage;
