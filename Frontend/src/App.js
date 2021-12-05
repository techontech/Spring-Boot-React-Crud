import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Users } from "./Component/User/Users";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { AddUser } from "./Component/User/AddUser";
import { EditUser } from "./Component/User/EditUser";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Router>
                <Navbar bg="white" expand="lg" className="shadow-sm">
                    <Container>
                        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container>
                    <Row>
                        <Col md={8} className="mt-5"></Col>
                    </Row>
                    <Row>
                        <Routes>
                            <Route element={<Users />} exact path="/"></Route>
                            <Route
                                element={<AddUser />}
                                exact
                                path="/user/add"
                            ></Route>
                            <Route
                                element={<EditUser />}
                                exact
                                path="/user/edit/:id"
                            ></Route>
                        </Routes>
                    </Row>
                </Container>
            </Router>
        </>
    );
}

export default App;
