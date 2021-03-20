import React, { Component } from 'react'
import Socket from '../Socket'
import SamocatList from './SamocatList';
import GoogleMapReact from 'google-map-react';
import LOS_ANGELES_CENTER from '../const/la_center';

import Marker from './Marker';
import { Button } from 'bootstrap';



export default class MapComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // console.log("RENDER STATIONS");
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
                    defaultCenter={LOS_ANGELES_CENTER}
                    >
                    {transports.map((transport) => (
                        <div 
                        key={transport.id}
                        text={transport.name}
                        lat={transport.geo.lat}
                        lng={transport.geo.lon}
                        >
                            <button style={{background: 'none', border: 'none',}} 
                                onClick={(event)=>{
                                   this.props.onTransportSelect(transport.id); 
                                }}>
                                <img src="/transport.svg" style={{width: '30px'}}></img>
                            </button>
                        </div>
                    ))}


                    {this.props.stations.map((station) => (
                        <Marker 
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
