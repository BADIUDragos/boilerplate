import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type Props = {}

const Header = (props: Props) => {
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={"/images/logo.png"} style={{width:400, marginTop: -7}} alt='Rolls-Royce'/>
            </Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header;