import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Row, Col, Container, Button, Alert, Navbar, Nav, NavDropdown, FormControl } from 'react-bootstrap';
import axios from 'axios';
import Aviator from 'aviator';
import LoginPage from './LoginPage';
import Spinner from 'react-spinner-material';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoading] = useState(false);
  const [loggingError, setLoggingError] = useState(false);
  const [loggingUnknownError, setLoggingUnknownError] = useState(false);

  if (localStorage.getItem('loggedIn') == 'true' && !loggedIn) {
    setLoggedIn(true);
  }

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('loggedIn');
      setLoggedIn(false);
      setUsername('');
      setPassword('');
      setLoading(false);
    }, 750);
  }

  const login = () => {
    setLoading(true);
    setLoggingUnknownError(false);
    setLoggingError(false);
    axios.post('http://localhost:3001', {
      'username': username,
      'password': password
    }).then((data) => {
      if (data.data.result == 'FAIL') {
        setLoggingError(true);
        setLoading(false);
      }
      else {
        setLoading(false);
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
      }
    }).catch((error) => {
      setLoggingUnknownError(true);
      setLoading(false);
      console.log(error);
    });
  }

  if (isLoading) {
    return (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
        <h2 style={{ marginTop: 50 }}>Please Wait</h2>
      </div>
    )
  }
  if (!loggedIn) {
    return (
      <Container style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: 50 }}>Internet Banking Login</h3>
        <Form className='loginForm' style={{ width: '50%' }}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoComplete={false}
              value={username}
              onChange={(e) => { setUsername(e.target.value) }}
              type="text"
              placeholder="Username" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          {loggingError ? (
            <Form.Text style={{ paddingBottom: 10, fontWeight: 'bold', color: 'red' }}>
              *Wrong username or password please try again.
            </Form.Text>
          ) : ''}

          {loggingUnknownError ? (
            <Form.Text style={{ paddingBottom: 10, fontWeight: 'bold', color: 'red' }}>
              *UNKNOWN SERVER ERROR.
            </Form.Text>
          ) : ''}
          <Button onClick={() => login()} style={{ width: '100%' }} variant="primary" type="submit">
            Login
  </Button>
        </Form>
      </Container>
    );
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Internet Banking</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Manage</Nav.Link>

          </Nav>
          <NavDropdown title="Profile" id="basic-nav-dropdown" alignRight className="mr-sm-2 pull-left">

            <NavDropdown.Item >View Profile</NavDropdown.Item>
            <NavDropdown.Item >Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
          </NavDropdown>

        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default App;
