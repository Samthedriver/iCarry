import React, {Component} from 'react';
import {GoogleMap, withGoogleMap, Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  render(){
    const style = {
      width: '40%',
      height: '40%'
    }

    return (
      <Map
          google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          center={{
            lat: 40.854885,
            lng: -88.081807
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >
        <Marker
          title='Pickup Point'
          name={'Pickup Point'}
          position={{lat: 37.778519, lng: -122.405640}}>
          <h1>Pickup Point</h1>
        </Marker>
        <Marker
          tite='Dropoff Point'
          name={'Dropoff Point'}
          position={{lat: 37.759703, lng: -122.428093}} />
        <Marker />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg')
})(MapContainer)
