import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useLogoutMutation } from "../store";
import { useSelector } from "react-redux";

interface IHeader {
  className?: string;
}

const Header: React.FC<IHeader> = ({ className }) => {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const { userInfo } = auth;
  const refresh = useSelector((state: RootState) => state.auth.tokens?.refresh);

  const [blacklistToken] = useLogoutMutation();

  const handleLogout = async () => {
    if (refresh) {
      blacklistToken({ refresh });
      navigate("/");
    }
  };

  return (
    <header className={className}>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container className="d-flex align-items-center">
          <Navbar.Brand>
            <Link to={"/"}>
              <img
                src={"/images/logo.png"}
                style={{ width: 50, marginTop: -7 }}
                alt="Rolls-Royce"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Text className="ml-3">Boilerplate APP</Navbar.Text>
          {userInfo ? (
            <>
              <Navbar.Text className="ml-3">
                Hi {userInfo.username} !
              </Navbar.Text>
              <Navbar.Text
                className="ml-3 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </Navbar.Text>
            </>
          ) : (
            <Nav.Link href="/login">
              <Navbar.Text className="ml-3">Login</Navbar.Text>
            </Nav.Link>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
