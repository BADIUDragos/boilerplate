interface TokenInvalidError {
  status: number;
  data: {
    detail: string;
    code: string;
    messages: Array<{
      message: string;
      token_class: string;
      token_type: string;
    }>;
  };
}

interface TokenInvalidErrorMessage {
  message: string;
  token_class: string;
  token_type: string;
}

export function isTokenInvalidError(error: any): error is TokenInvalidError {
  return (
    typeof error === 'object' &&
    error !== null &&
    error.status === 401 &&
    'data' in error &&
    'detail' in error.data &&
    error.data.detail === "Given token not valid for any token type" &&
    Array.isArray(error.data.messages) &&
    error.data.messages.some((message: TokenInvalidErrorMessage) => message.token_type === 'access')
  );
}