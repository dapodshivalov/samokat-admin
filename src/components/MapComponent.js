import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

import TransportMarker from './TransportMarker';
import MOSCOW_CENTER from '../const/moscow_center'
import StationMarker from './StationMarker';



export default class MapComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log("STATIONS");
        // console.log(this.props.stations);
        var info = this.props.transports;
        var transports = [];
        if (info != null) { 
            transports = info.filter((item) => {return item.speed != 0;});
        }
        return (
            <div>
                <div style={{ height: '100vh'}}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyCGL3Y8gyvjRjp-FWbfaG9H6X3n4msyCo4" }}
                    defaultZoom={13}
                    defaultCenter={MOSCOW_CENTER}
                    >
                    {transports.map((transport) => (
                        <TransportMarker 
                        key={transport.id}
                        text={transport.name}
                        lat={transport.geo.lat}
                        lng={transport.geo.lon}
                        onClick={(event)=>{this.props.onTransportSelect(transport.id);}}>
                        </TransportMarker>
                    ))}


                    {this.props.stations.map((station) => (
                        <StationMarker 
                        // key={place.id}
                        // text={place.name}
                        lat={station.geo.lat}
                        lng={station.geo.lon}
                        onClick={(event) => {
                            // console.log("-----CLICK-----");
                            this.props.onStationSelect(station.id);
                        }}
                        />
                    ))}
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}
