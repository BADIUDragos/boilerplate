import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container className="d-flex align-items-center">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={"/images/logo.png"}
                style={{ width: 50, marginTop: -7 }}
                alt="Rolls-Royce"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Text className="ml-3">Boilerplate APP</Navbar.Text>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
