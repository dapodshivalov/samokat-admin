import React, { Component } from 'react'
import { Row, Card, ListGroup, Container, Col } from 'react-bootstrap';
import '../styles/SamocatList.css';

export default class SamocatList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid style={{ height: '100vh', overflowY: 'scroll'}}>
                <Row>
                    <Col><h1>Транспорт</h1></Col>
                </Row>
                <Row>
                    <Col xs={12}>
                    <ListGroup variant="flush" >
                        {this.props.selectedTransports.map((item, index) => (
                            <ListGroup.Item action key={index}> 
                            <Card>
                                <Card.Header>ID: {item.id}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle>Speed: { (item.speed != null) ? item.speed : 0 }</Card.Subtitle>
                                    <Card.Text>lat: {item.geo.lat} lon: {item.geo.lon}</Card.Text>
                                </Card.Body>
                            </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}
