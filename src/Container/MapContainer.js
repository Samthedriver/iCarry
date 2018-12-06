import React, {Fragment, Component} from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import {GoogleMap, withGoogleMap, Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geosuggest from 'react-geosuggest';
import ReactDOM from 'react-dom';

class MapContainer extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false,
      isModalOpen: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  isViewTrack = () => {
    if(this.props.viewType === 'track')
    {
      console.log(this.props.viewType)
      return true
    }
    else
    {
      console.log(this.props.viewType)
      return false
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

  handleViewDetails = () => {
    console.log('View details clicked!')
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  onInfoWindowOpen(props, e) {
    const infoWindowContent = (
      <div>
        <h1>Tracking #{this.state.selectedPlace.name}</h1>
        <h3>Status: {this.state.selectedPlace.status}</h3>
        <Button
          basic
          color='grey'
          onClick={e =>
            {
              console.log("view details clicked!");
              this.props.showModal(this.state.selectedPlace.transaction);
            }
          }
        >
          View Details
        </Button>
      </div>
    )

    ReactDOM.render(React.Children.only(infoWindowContent), document.getElementById("infoWindow"));
  }

  render(){
    const style = {
      width: '40%',
      height: '40%'
    }

    const transactionList = this.props.allTransactions.filter(
      transaction =>
        (
          (
            (
              (this.props.viewType === 'history')
              ||
              (this.props.viewType === 'track')
            )
            ||
            (transaction.status === this.props.status[this.props.statusIndex])
          )
          &&
          (transaction.user_id == this.props.user_id)
        )
      )

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

            zoom={this.props.zoom}
            onClick={this.onMapClicked}
          >

          {
            this.props.logged_in ?
            (
              transactionList.map(transaction => {
                return(
                    <Marker
                      key={transaction.id}
                      name={((transaction.id * 12345) + 54321)}
                      status={transaction.status}
                      position={transaction.pickupCoordinates}
                      onClick={this.onMarkerClick}
                      transaction={transaction}
                    />
                )
              })
            )

            :

            (
              this.props.viewType === 'track' ?
              <Marker
                key={this.props.transaction.id}
                name={((this.props.transaction.id * 12345) + 54321)}
                status={this.props.transaction.status}
                position={this.props.transaction.pickupCoordinates}
                onClick={this.onMarkerClick}
                transaction={this.props.transaction}
              >

              </Marker>
              :
              <Marker
                onClick={this.onMarkerClick}
                name={'This is your current location. Welcome to iCARRY'}
              />
            )
          }

            {
              this.props.logged_in || this.props.viewType === 'track' ?
              (
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onOpen={e => {
                    this.onInfoWindowOpen(this.props, e);
                  }}
                >
                  <div id="infoWindow" />
                </InfoWindow>
              )

              :
              (
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                >
                  <div>
                    <h1>{this.state.selectedPlace.name}</h1>
                  </div>
                </InfoWindow>
              )
            }


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
