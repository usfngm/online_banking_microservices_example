import React, { useState } from 'react';
import './App.css';
import { Form, Row, Col, Container, Button, Alert, Navbar, Nav, NavDropdown, FormControl } from 'react-bootstrap';
import axios from 'axios';
import Spinner from 'react-spinner-material';
import numeral from 'numeral';
import { LOGIN_URL } from './config';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoading] = useState(false);
  const [loggingError, setLoggingError] = useState(false);
  const [loggingUnknownError, setLoggingUnknownError] = useState(false);
  const [loanAmount, setLoanAmoumt] = useState({
    num: numeral(0)
  });
  const [loanYears, setLoanYears] = useState(1);
  const [loanTotal, setLoanTotal] = useState();
  const [monthlyPayment, setMonthlyPayment] = useState();

  if (localStorage.getItem('loggedIn') == 'true' && !loggedIn) {
    setLoggedIn(true);
  }

  const calculateLoan = () => {

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
    axios.post(LOGIN_URL, {
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
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', marginLeft: 20, marginTop: 25 }}>
        <h2 style={{ marginBottom: 20, marginLeft: 10 }}>Loan Form</h2>
        <Form className="loginForm" style={{ width: '100%', paddingTop: 15 }}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Loan Amount</Form.Label>
            <Form.Control
              value={loanAmount.num.format('0,0')}
              type="text"
              placeholder="enter number"
              onChange={(e) => {
                var value = e.target.value;
                value = value.replace(/\,/g, '');
                if (isNaN(value)) {
                  console.log(value + ' IS NOT A NUMBER');
                }
                else {
                  console.log(value + ' IS A NUMBER');
                  setLoanAmoumt({ num: numeral(value) });
                }
              }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Years of Installament</Form.Label>
            <Form.Control 
            as="select" 
            value={loanYears}
            onChange={(e) => {
              var value = e.target.value;
              setLoanYears(value);
            }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
             Total after interest:
           </Form.Label>
            <Col sm="8">
              <Form.Control style={{ paddingLeft: 10 }} disabled defaultValue="NONE" value={loanTotal} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Payment per Month:
           </Form.Label>
            <Col sm="8">
              <Form.Control style={{ paddingLeft: 10 }} disabled defaultValue="NONE" value={monthlyPayment} />
            </Col>
          </Form.Group>
          <Button onClick={() => calculateLoan()} style={{ width: '100%' }} variant="primary" type="submit">
            Calculate
  </Button>
        </Form>
      </div>
    </div>
  )
}

export default App;
