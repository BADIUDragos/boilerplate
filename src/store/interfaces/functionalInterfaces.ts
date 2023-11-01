import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export type ErrorObject = FetchBaseQueryError | SerializedError | undefined;

export interface ErrorDetails {
  status?: number;
  detail?: string;
}
