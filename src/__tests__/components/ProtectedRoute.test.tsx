
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { mockStoreAuth } from "../utils/mockStores";
import { MemoryRouter } from 'react-router-dom';
import { AuthState } from "../../store/interfaces/authInterfaces";
import ProtectedRoute from "../../components/ProtectedRoute";

describe('ProtectedRoute', () => {
  const setup = (authState: AuthState, requiredPermissions?: string[], loginRequired: boolean = true, redirectUrl?: string) => {
    const store = mockStoreAuth({ auth: authState });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute requiredPermissions={requiredPermissions} loginRequired={loginRequired} redirectUrl={redirectUrl}>
            <div>Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );
  };

  it("renders children for authorized users", () => {
    setup(
      {
        tokens: { access: "mock_access_token", refresh: "mock_refresh_token" },
        userInfo: {
          id: "1",
          username: "user",
          permissions: ["view_content"],
          isStaff: false,
        },
        isBlacklistingToken: false,
      },
      ["view_content"]
    ); 

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("does not render children for unauthorized users", () => {
    setup(
      {
        tokens: { access: "mock_access_token", refresh: "mock_refresh_token" },
        userInfo: {
          id: "1",
          username: "user",
          permissions: ["other_permission"],
          isStaff: false,
        },
        isBlacklistingToken: false,
      },
      ["view_content"]
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders children for staff users regardless of permissions", () => {
    setup({
      tokens: { access: "mock_access_token", refresh: "mock_refresh_token" },
      userInfo: {
        id: "1",
        username: "staff",
        permissions: [],
        isStaff: true,
      },
      isBlacklistingToken: false,
    }, ["view_content"]);

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders children when login is not required and user is not logged in", () => {
    setup(
      {
        tokens: null,
        userInfo: null,
        isBlacklistingToken: false,
      },
      [],
      false
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});