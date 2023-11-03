import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/slices/authSlice";

interface IHeader {
  className?: string;
}

const Header: React.FC<IHeader> = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const decodedTokenInfo = useSelector(
    (state: RootState) => state.auth.decodedAccessTokenInfo
  );

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/')
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
          {decodedTokenInfo ? (
            <>
            <Navbar.Text className="ml-3">
              Hi {decodedTokenInfo.username} !
            </Navbar.Text>
            <Navbar.Text className="ml-3" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</Navbar.Text>
            </>
          ) : (
            <Nav.Link href="/login">
              <Navbar.Text className="ml-3">
                Login
              </Navbar.Text>
            </Nav.Link>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
