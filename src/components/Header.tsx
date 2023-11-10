import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RootState, useBlacklistMutation } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setBlacklistingToken } from "../store/slices/authSlice";

interface IHeader {
  className?: string;
}

const Header: React.FC<IHeader> = ({ className }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth);
  const { userInfo } = auth
  const refresh = useSelector((state: RootState) => state.auth.tokens?.refresh);

  const [blacklistToken, { isLoading }] = useBlacklistMutation()

  useEffect(() => {
    dispatch(setBlacklistingToken(isLoading));
  }, [isLoading, dispatch]);

  const handleLogout = async () => {
    if (refresh) {
      blacklistToken({refresh});
      navigate("/")
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
            <Navbar.Text className="ml-3 cursor-pointer" onClick={handleLogout}>Logout</Navbar.Text>
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


