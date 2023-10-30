import { LoginResultData } from "../store/interfaces/authInterfaces";
import { ErrorDetails, ErrorObject } from "../store/interfaces/functionalInterfaces";


export function getErrorDetails(results: { error: ErrorObject } | { data: LoginResultData }): ErrorDetails {
  const error = 'error' in results ? results.error : undefined;
  if (error && 'status' in error && 'detail' in error) {
    const { status, detail } = error as { status: number; detail: string };
    return { status, detail };
  }
  return {};
}
