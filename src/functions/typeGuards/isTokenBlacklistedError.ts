interface TokenBlacklistedError {
  status: number;
  data: {
    message: string;
  };
}

export function isTokenBlacklistedError(error: any): error is TokenBlacklistedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    error.status === 400 &&
    error.data &&
    typeof error.data === 'object' &&
    error.data.message === "Token is blacklisted"
  );
}