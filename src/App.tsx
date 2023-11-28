import { RouterProvider } from "react-router-dom";
import "./bootstrap.css";

import router from "./router/router";
import Idle from "idle-js"

import { useLogoutMutation, useTokens, useValidateQuery } from "./store";
import { useEffect } from "react";

export default function App() {
  const [blacklistToken] = useLogoutMutation();
  const tokens = useTokens();

  useEffect(() => {
    if (tokens) {
      const idle = new Idle({
        idle: 900000,
        onIdle: async () => {
          if (tokens) {
            blacklistToken({ refresh: tokens.refresh });
          }
        },
        events: ["mousemove", "keydown", "mousedown"],
      });

      idle.start();

      return () => {
        idle.stop();
      };
    }
  }, [blacklistToken, tokens]);

  return <RouterProvider router={router} />;
}
