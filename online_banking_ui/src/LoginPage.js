import React, { useState } from 'react';
import { Form, Row, Col, Container, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function LoginPage() {
    const [num1, setNum1] = useState();
    const [num2, setNum2] = useState();
    const [result, setResult] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);
    const test = () => {
        axios.get('http://184.172.247.50:32695?num1=' + num1 + '&num2=' + num2).then((result) => {
            console.log(result.data.result);
            setResult(result.data.result);
        }).catch((error) => {
            console.log(error);
        });
    }
    const test2 = () => {
        axios.get('http://184.172.247.50:31982?num1=' + num1 + '&num2=' + num2).then((result) => {
            console.log(result.data.result);
            setResult(result.data.result);
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="App">
            <h1>Welcome to my useless app</h1>
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control
                                placeholder="First number"
                                onChange={(e) => { setNum1(e.target.value) }}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                placeholder="Second number"
                                onChange={(e) => { setNum2(e.target.value) }} />
                        </Col>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: 26, marginRight: 30 }}>=</span>
                            <Form.Control value={result} disabled></Form.Control>
                        </Col>
                    </Row>
                </Form>
                <Form>
                    <Row style={{ display: 'flex' }}>
                        <Button onClick={test} style={{ flex: 1, marginTop: 20 }}>
                            Addition
                        </Button>
                    </Row>
                    <Row style={{ display: 'flex' }}>
                        <Button onClick={test2} style={{ flex: 1, marginTop: 20 }}>
                            Division
                        </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default LoginPage;