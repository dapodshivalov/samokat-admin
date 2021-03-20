import React, { useState, useEffect, Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Main from './components/Main';
import axios from 'axios';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

function App() {

  var [isLoged, setLoged] = useState(false);

  // if (!isLoged) {
  //   var token = localStorage.getItem("token");
  //   if (token != null) {
  //     setLoged(true);
  //   }
  // }

  var onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    var data = {};
    var form = document.forms.LoginForm;
    for ( var i = 0; i < form.elements.length; i++ ) {
      var e = form.elements[i];
      data[encodeURIComponent(e.name)] = encodeURIComponent(e.value);
    }
    console.log(data);

    axios.post('https://scooter.mac-siemens.ru:49003/api/auth/admin/login', {
      // "login": data["login"],
      // "password": data["password"],
      "login": "samokatAdmin",
      "password": "PesockayaElena",
    }).then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      setLoged(true);
    });

    return false;
  };

  if (!isLoged) {
    return (
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={onSubmit} id="LoginForm">
              <Form.Group controlId="formBasicLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control name="login" placeholder="Login" required />
                <Form.Control.Feedback type="invalid">
                  Введите логин
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" required/>
                <Form.Control.Feedback type="invalid">
                  Введите пароль
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Войти
              </Button>
            </Form>
          </Col>
        </Row>
        
      </Container>
    );
  }

  return (
    <Main/>
  )
}

export default App;