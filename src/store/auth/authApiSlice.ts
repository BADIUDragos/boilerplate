import { baseApi } from "../apis/baseApi";
import { LoginCredentials } from "../interfaces/authInterfaces";

export const authApiSlice = baseApi.injectEndpoints({
endpoints: (build:any) => ({
    login: build.query({
    query: (credentials: LoginCredentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
    })
    }),
  })
})
  
  export const { useLoginMutation } = authApiSlice;