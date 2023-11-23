import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import authReducer from "../../../store/slices/authSlice";
import { renderHook, act, waitFor } from "@testing-library/react";

import { authApi, useLoginMutation } from "../../../store/apis/authApi";

import { Store, AnyAction } from "redux";
import { Provider } from "react-redux";

import { API_URL } from "../../../constants/urls";
import {
  AuthState,
  LoginCredentials,
  LoginResultData,
} from "../../../store/interfaces/authInterfaces";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../../store/combinedReducer";

enableFetchMocks();

function getWrapper(store: Store<any, AnyAction>): React.FC {
  return ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
}

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("Login User", () => {
  const tokenBody: LoginResultData = {
    access:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InVzZXIiLCJwZXJtaXNzaW9ucyI6WyJ2aWV3X2NvbnRlbnQiXSwiaXNTdGFmZiI6ZmFsc2V9.obYAd0EK9QcZLdX3cDRNSRf2bvo7sw_O0J3qsiJ1w_A",
    refresh: "refresh",
  };

  const failedBody = {
    detail: "Login Failed",
  };

  beforeEach(() => {
    fetchMock.mockIf(`${API_URL}/auth/token`, (req) => {
      if (req.body) {
        const username = JSON.parse(req.body.toString()).username;

        if (username === "success") {
          return Promise.resolve({
            status: 200,
            body: JSON.stringify(tokenBody),
          });
        }
      }

      return Promise.resolve({
        status: 400,
        body: JSON.stringify(failedBody),
      });
    });
  });

  it("runs the userLoginMutation successfully", async () => {
    const initialUserInfoState: AuthState = {
      tokens: {access: null, refresh: null},
      userInfo: null,
    };

    const expectedUserInfoState: AuthState = {
      tokens: { access: tokenBody.access, refresh: tokenBody.refresh },
      userInfo: {
        id: "1",
        username: "user",
        permissions: ["view_content"],
        isStaff: false,
      },
    };

    const store = configureStore({ 
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware) });

    const wrapper = getWrapper(store);

    const { result } = renderHook(() => useLoginMutation(undefined), {
      wrapper,
    });

    const [triggerLogin] = result.current;

    expect(result.current[1]).toMatchObject({
      status: "uninitialized",
      isLoading: false,
      isSuccess: false,
      isError: false,
      originalArgs: undefined,
    });

    const userArgs: LoginCredentials = {
      username: "success",
      password: "password",
    };

    const userInfoState = store.getState().auth;

    expect(userInfoState).toEqual(initialUserInfoState);

    act(() => {
      triggerLogin(userArgs);
    });

    expect(result.current[1]).toMatchObject({
      status: "pending",
      endpointName: "login",
      isLoading: true,
      isSuccess: false,
      isError: false,
      originalArgs: userArgs,
    });

    await waitFor(() => expect(result.current[1].isSuccess).toBe(true));

    expect(result.current[1]).toMatchObject({
      status: "fulfilled",
      endpointName: "login",
      isLoading: false,
      isSuccess: true,
      isError: false,
      originalArgs: userArgs,
      data: tokenBody,
    });

    const newUserInfoState = store.getState().auth;
    expect(newUserInfoState).toEqual(expectedUserInfoState);
  });

  // test("Failure", async () => {
  //   const initialUserInfo =  {
  //       userInfo: null,
  //       tokens: null
  //   }
  //   const store = setupStore({
  //       userInfo: initialUserInfo
  //   })
  //   const wrapper = getWrapper(store)

  //   const { result } = renderHook(() =>
  //       useLoginUserMutation(undefined),
  //       { wrapper }
  //   );

  //   const [loginUser] = result.current;

  //   expect(result.current[1]).toMatchObject({
  //       status: 'uninitialized',
  //       isLoading: false,
  //       isSuccess: false,
  //       isError: false,
  //       originalArgs: undefined
  //   });

  //   const userArgs = {
  //       username: "failure",
  //       password: "password"
  //   }

  //   const userInfoState = store.getState().userInfo
  //   expect(userInfoState).toEqual(initialUserInfo)

  //   act(() => {
  //     loginUser(userArgs);
  //   });

  //   expect(result.current[1]).toMatchObject({
  //       status: 'pending',
  //       endpointName: "loginUser",
  //       isLoading: true,
  //       isSuccess: false,
  //       isError: false,
  //       originalArgs: userArgs
  //   });

  //   await waitFor(() =>
  //       expect(result.current[1].status).toBe("rejected")
  //   );

  //   expect(result.current[1]).toMatchObject({
  //       status: 'rejected',
  //       endpointName: "loginUser",
  //       isLoading: false,
  //       isSuccess: false,
  //       isError: true,
  //       originalArgs: userArgs,
  //       error: {
  //           status: 400,
  //           data: failedBody
  //       }
  //   });

  //   const newUserInfoState = store.getState().userInfo
  //   expect(newUserInfoState).toEqual(initialUserInfo)

  // });
});
