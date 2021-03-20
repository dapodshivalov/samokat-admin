import React, { Component } from 'react';
import styled from 'styled-components';
import '../styles/Container.css';

import Socket from '../Socket.js';
import MapComponent from './MapComponent';
import { Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import SamocatList from './SamocatList';
import axios from 'axios';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      transports: [],
      selectedTransports: [],
      stations: [],
    }

    this.updateTransports = this.updateTransports.bind(this);
    this.updateStations = this.updateStations.bind(this);
    this.selectTransport = this.selectTransport.bind(this);
    this.selectStation = this.selectStation.bind(this);

    Socket.socketCallbacks["MapUpdate"] = (this.updateTransports);
  }

  updateTransports(event) {
    var item = JSON.parse(event.data);

    var transports = item['samokatInfo'];

    var selectedIds = this.state.selectedTransports.map((el) => {return el.id;});

    this.setState({
      index: this.state.index + 1,
      transports: transports,
      selectedTransports: transports.filter((element) => {
        return selectedIds.includes(element.id);
      }),
      stations: this.state.stations,
    });
  }

  updateStations(stations) {
    console.log(stations);
    var updatedStations = stations.map(station => {
        return {
        "id": station.id, 
        "geo": station.geo,
    }});
    console.log("stations init");
    console.log(updatedStations);
    this.setState({
        index: this.state.index,
        transports: this.state.transports,
        selectedTransports: this.state.selectedTransports,
        stations: updatedStations,
    });
  }

  selectStation(id) {
    var token = localStorage.getItem("token");
    const headers = {
        'Authorization': 'Bearer ' + token,
      };
    axios.get("https://scooter.mac-siemens.ru:49003/api/station/" + id, {headers: headers}).then(res => {
        var prevState = this.state;
        var apiTransports = res.data.transports;
        var selectedTransports = apiTransports.map( item => {
            return {
                id: item.id,
                geo: item.geo,
            };
        });
        this.setState({
            index: prevState.index,
            transports: prevState.transports,
            selectedTransports: selectedTransports,
            stations: prevState.stations,
        });
    });
  }

  selectTransport(id) {
    console.log("CLICK");
    console.log(typeof id);
    var prevState = this.state;
    console.log(this.state);
    var selectedTransport = prevState.transports.filter((element) => {
      console.log(element);
      console.log(element.id === id);
      return element.id === id;
    });
    console.log(selectedTransport);
    this.setState({
      index: prevState.index,
      transports: prevState.transports,
      selectedTransports: selectedTransport,
      stations: prevState.stations,
    });
  }


  render() {
    return (
      <Container fluid className="fullScreenHeight">
        <Row>
          <Col xs={8}>
            <MapComponent onTransportSelect={this.selectTransport} onStationSelect={this.selectStation} transports={this.state.transports} stations={this.state.stations}/>
          </Col>
          <Col xs={4}>
            <SamocatList selectedTransports={this.state.selectedTransports}/>
          </Col>
        </Row>      
      </Container>
    )
  }

  componentDidMount() {
    var token = localStorage.getItem('token');

    const headers = {
        'Authorization': 'Bearer ' + token,
      };

    axios.post('https://scooter.mac-siemens.ru:49003/api/station/list', {},{
        headers: headers,
    }).then(res => {
        this.updateStations(res.data);
    });
  }
}

export default Main;
