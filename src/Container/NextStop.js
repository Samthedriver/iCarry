import React from 'react'
import TransactionCollection from './TransactionCollection.js'
import Geocode from "react-geocode";
import geolib from 'geolib';
import MapContainer from './MapContainer.js'

Geocode.setApiKey("AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg");
const convertToMiles = 1609.344

class NextStop extends React.Component {
  constructor(){
    super();
    this.state = {
      shortestTransaction: {},
      shortestDistance: null,
      statusIndex: null
    }

  }

  componentDidMount(){
    const transactionList = this.props.allTransactions.filter(transaction =>  ((transaction.status === "Assigned") || (transaction.status === "picked up by carrier")) && (transaction.user_id == this.props.user_id));

    transactionList.forEach(transaction => {

      let statusIndex = null
      let address = '';

      if(transaction.status === "picked up by carrier")
      {
        address = transaction.dropoffLocal
        statusIndex = 2
      }
      else
      {
        address = transaction.pickupLocal
        statusIndex = 1
      }

      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;

          const destination = {
            latitude: lat,
            longitude: lng
          }

          const origin = {
            latitude: this.props.currentPosition.lat,
            longitude: this.props.currentPosition.lng
          }

          const distance = geolib.getDistance(origin, destination);

          if ((this.state.shortestDistance === null) || (this.state.shortestDistance > distance))
            this.setState({
              shortestDistance: distance,
              shortestTransaction: transaction,
              statusIndex: statusIndex
            })
        },
        error => {
          console.error(error);
        }
      );
    })
  }

    render(){

      const transactionList = this.props.allTransactions.filter(transaction =>  ((transaction.status === "Assigned") || (transaction.status === "picked up by carrier")) && (transaction.user_id == this.props.user_id));

      let message = '';
      let address = '';
      let coordinates = {};

      console.log(transactionList)
      if (this.statusIndex === 1){
        message = ' Pickup at: '
        address = this.state.shortestTransaction.pickupLocal
        coordinates = this.state.shortestTransaction.pickupCoordinates
      }
      else {
        message = ' Dropoff at: '
        address = this.state.shortestTransaction.dropoffLocal
        coordinates = this.state.shortestTransaction.dropoffCoordinates
      }

      return (
        <div>
          <h2>Next Stop{message}{address}</h2>
          <h3>Traveling distance ({(this.state.shortestDistance/ convertToMiles).toFixed(2)}) miles.</h3>

          <MapContainer
            transaction={this.state.shortestTransaction}
            allTransactions={[this.state.shortestTransaction]}
            currentPosition={coordinates}
            logged_in={this.props.logged_in}
            userInfo={this.props.userInfo}
            user_id={this.props.userInfo.id}
            viewType='next stop'
            zoom={14}
            showModal={this.props.showModal}
          />
        </div>
      )
    }
  }

  export default NextStop

  // <TransactionCollection
  //   userInfo={this.props.userInfo}
  //   user_id={this.props.userInfo.id}
  //   status={this.props.status}
  //   statusIndex={this.state.statusIndex}
  //   allTransactions={[this.state.shortestTransaction]}
  //   onSelectTransaction={this.props.onSelectTransaction}
  //   currentPosition={this.props.currentPosition}
  // />
