import React from 'react'
import PackageImage from '../package.jpeg'
import Geocode from "react-geocode";
import geolib from 'geolib';
import MapMarkerContainer from '../Container/MapMarkerContainer.js'

Geocode.setApiKey("AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg");
const convertToMiles = 1609.344

class TransactionCard extends React.Component {
  constructor(){
    super();
    this.state = {
      origin: null,
      destination: null,
      pickup: null,
      dropoff: null,
      distance: null
    }

  }

  componentDidMount(){
    let address = '';

    if(this.props.type==='track' || this.props.status[this.props.statusIndex] === "picked up by carrier")
      address = this.props.transaction.dropoffLocal
    else
      address = this.props.transaction.pickupLocal

    const origin = {
      latitude: this.props.currentPosition.lat,
      longitude: this.props.currentPosition.lng
    }

    console.log('origin: ', origin)
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("address coordinates: ", lat, lng);

        const destination = {
          latitude: lat,
          longitude: lng
        }

        console.log(origin)
        console.log(destination)

        const distance = (geolib.getDistance(origin, destination) / convertToMiles).toFixed(2);
        this.setState({
          origin: origin,
          destination: destination,
          distance: distance
        })
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    return (
        <div className="ui column">
          <div className="ui card" onClick={() => {this.props.handleClick(this.props.transaction)}}>
            <div className="content">
              <div className="Medium Header">
              {
                this.props.type === 'carrier' ?
                  <h3>{this.state.distance}-Distance(miles)</h3>
                  :
                  <h3>Tracking #{((this.props.transaction.id * 12345) + 54321)}</h3>
              }
              </div>
            </div>

            <div className="image">
              <img alt={PackageImage} src={this.props.transaction.image} />
            </div>

            <div className="extra content">
              <span>
                <h3>Status-{this.props.transaction.status}</h3>
              </span>

              <span>
                <p>Pickup Point:{this.props.transaction.pickupLocal}</p>
              </span>
              <span>
                <p>Dropoff Point:{this.props.transaction.dropoffLocal}</p>
              </span>
            </div>


          </div>
        </div>
    );
  }

};

export default TransactionCard;
