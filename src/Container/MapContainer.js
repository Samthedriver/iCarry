import React, {Component} from 'react';
import {GoogleMap, withGoogleMap, Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geosuggest from 'react-geosuggest';

class MapContainer extends Component {
  render(){
    const style = {
      width: '40%',
      height: '40%'
    }

    const lat = this.props.currentPosition.lat
    const lng = this.props.currentPosition.lng

    this.props.google.maps.DistanceMatrixService(
      [{lat,
        lng}],
      ["New York, NY"], 'DRIVING', (res, status) => {
        if(status==='OK') {
          console.log('status - ok')
        }
        else {
          console.log('******************hello**************')
          console.log('status: ', status)
        }
      })

    return (
      <Map
          google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          center={{
            lat: this.props.currentPosition.lat,
            lng: this.props.currentPosition.lng
          }}
          zoom={15}
          onClick={this.onMapClicked}
        >

      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg')
})(MapContainer)

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
