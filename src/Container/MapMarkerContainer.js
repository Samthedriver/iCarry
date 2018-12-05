import React, {Component} from 'react';
import {DirectionsRenderer, GoogleMap, withGoogleMap, Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";

class MapMarkerContainer extends Component {

  render(){
    const origin = {
      lat: this.props.origin.lat,
      lng: this.props.origin.lng
    };
    const destination = {
      lat: this.props.destination.lat,
      lng: this.props.destination.lng
    };

    return (
      <div>
      {!this.props.origin ? null :
      <Map google={this.props.google}
        style={{width: '40%', height: '100%', position: 'relative'}}
        className={'map'}
        center={{
          lat: this.props.origin.lat,
          lng: this.props.origin.lng
        }}
        initialCenter={{
          lat: this.props.origin.lat,
          lng: this.props.origin.lng
        }}
        zoom={14}>
        <Marker
          title={'Origin'}
          name={'Origin'}
          position={{
            lat: this.props.origin.lat,
            lng: this.props.origin.lng
          }} />
        <Marker
          title={'Destination'}
          name={'Destination'}
          position={{
            lat: this.props.destination.lat,
            lng: this.props.destination.lng
          }} />
        <Marker />
      </Map>
    }
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg')
})(MapMarkerContainer)

// <Marker
//   title='Pickup Point'
//   name={'Pickup Point'}
//   position={{lat: 37.778519, lng: -122.405640}}>
//   <h1>Pickup Point</h1>
// </Marker>
// <Marker
//   tite='Dropoff Point'
//   name={'Dropoff Point'}
//   position={{lat: 37.759703, lng: -122.428093}} />
// <Marker />
