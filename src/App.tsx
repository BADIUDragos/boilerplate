import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './bootstrap.css'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
          </Routes>
        </Container>
      </main>
      <hr/>
    </Router>
  );
}

export default App;
