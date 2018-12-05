import React, {Fragment, Component} from 'react';
import {GoogleMap, withGoogleMap, Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geosuggest from 'react-geosuggest';

class MapContainer extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }

  openInfoWindow = () => {
    // clicking 'x' in the info window will pass null, so if we detect that, reset the position in state
    this.setState({ isOpen: true})
    console.log('open')
  }

  closeInfoWindow = () => {
    this.setState({
      isOpen: null
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render(){
    const style = {
      width: '40%',
      height: '40%'
    }
    return (
        <div>
        {!this.props.currentPosition ? null :
        <Map
            google={this.props.google}
            style={{width: '100%', height: '100%', position: 'relative'}}
            className={'map'}
            center={{
              lat: this.props.currentPosition.lat,
              lng: this.props.currentPosition.lng
            }}
            initialCenter={{
              lat: this.props.currentPosition.lat,
              lng: this.props.currentPosition.lng
            }}

            zoom={10}
            onClick={this.onMapClicked}
          >

          <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>



        </Map>
      }
        </div>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg')
})(MapContainer)

// <InfoWindow
//   position={{
//     lat: this.props.currentPosition.lat,
//     lng: this.props.currentPosition.lng
//   }}
//   onCloseclick={this.closeInfoWindow}
//   options={{pixelOffset: new window.google.maps.Size(0,-40)}}
//   visible={true}
//   >
//   <div>
//   <h1>Info Window</h1>
//   </div>
// </InfoWindow>

// {
//   this.props.allTransactions.map(transaction => {
//     return(
//         <Marker
//           key={transaction.id}
//           title={transaction.id}
//           name={transaction.id}
//           position={transaction.pickupCoordinates}
//           onClick={this.openInfoWindow}
//         />
//     )
//   })
// }
