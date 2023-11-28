import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface TokenInvalidError {
  status: number;
  data: {
    detail: string;
    code: string;
    messages: TokenInvalidErrorMessage
  };
}

interface TokenInvalidErrorMessage {
  message: string;
  token_class: string;
  token_type: string;
}

export function isTokenInvalidError(error: FetchBaseQueryError | SerializedError): boolean {
  return (
    typeof error === 'object' &&
    'status' in error &&
    error.status === 401 &&
    'data' in error &&
    error.data !== null &&
    typeof error.data === 'object' &&
    'detail' in error.data &&
    error.data.detail === "Given token not valid for any token type" &&
    'messages' in error.data &&
    Array.isArray(error.data.messages) &&
    error.data.messages.some(msg => msg.token_type === 'access')
  );
}