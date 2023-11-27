import Idle from "idle-js"
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import { useLogoutMutation } from "../store";
import { useEffect } from "react";

const Layout: React.FC = () => {

  const navigate = useNavigate()
  const [blacklistToken] = useLogoutMutation();

  useEffect(() => {
    const getRefreshToken = () => {
      return localStorage.getItem('refreshToken');
    };

    const idle = new Idle({
      idle: 900000,
      onIdle: async () => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          try {
            await blacklistToken({ refresh: refreshToken }).unwrap();
            
          } catch (error) {
            console.error('Error blacklisting token:', error);
          }
        }
      },
      events: ['mousemove', 'keydown', 'mousedown'],
    });

    idle.start();

    return () => {
      idle.stop();
    };
  }, [blacklistToken, navigate]);

  return (
    <Container fluid className="p-0 d-flex flex-column min-vh-100">
      <Header className="mb-5" />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <hr />
      <Footer />
    </Container>
  );
};

export default Layout;
