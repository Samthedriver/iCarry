import React, { Fragment, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js'
import {Route, Switch, Redirect, withRouter } from 'react-router-dom'
import SignUpForm from './Container/SignUpForm.js'
import LoginForm from './Container/LoginForm.js'
import SendForm from './Container/SendForm.js'
import TransactionCard from './Component/TransactionCard.js'
import Profile from './Component/Profile.js'
import NotFound from './Component/NotFound.js'
import TransactionCollection from './Container/TransactionCollection.js'
import MapContainer from './Container/MapContainer.js'
import NextStop from './Container/NextStop.js'
import GeoSelect from './Container/GeoSelect.js';
import Geocode from "react-geocode";


class App extends Component {

  getCurrentPosition = (position) => {
    let currentPosition = {};
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    this.setState({
      currentPosition: currentPosition
    })

  }

  constructor() {
    super();
    this.state = {
      allTransactions: [],
      selectedTransaction: null,
      searchTrackingNumber: '',
      searchPath: '',
      userInfo : null,
      currentPosition: null,
      nextStop: {}
    }
  }

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(this.getCurrentPosition);

    fetch('http://localhost:3001/api/v1/transactions')
      .then(response => response.json())
        .then(data => {
          console.log(data)

          let allTransactions = data
          allTransactions.map( transaction => {
            let pickupCoordinates = {};
            let dropoffCoordinates = {};

            Geocode.fromAddress(transaction.pickupLocal).then(
              response => {
                const { lat, lng } = response.results[0].geometry.location;
                pickupCoordinates = {
                  lat: lat,
                  lng: lng
                }
                console.log(pickupCoordinates)
                transaction.pickupCoordinates = pickupCoordinates;

                Geocode.fromAddress(transaction.dropoffLocal).then(
                  response => {
                    const { lat, lng } = response.results[0].geometry.location;
                    dropoffCoordinates = {
                      lat: lat,
                      lng: lng
                    }
                    console.log(dropoffCoordinates)
                    transaction.dropoffCoordinates = dropoffCoordinates;

                  },
                  error => {
                    console.error(error);
                  }
                );
              },
              error => {
                console.error(error);
              }
            );

          })

          this.setState({allTransactions: allTransactions})
        })
  }

  handleSearchChange = (e, { value }) => {
    let path = `/transactions/${value}`
    this.setState({ searchTrackingNumber: value, searchPath: path})
    console.log(value)
  }

  updateUserInfo = (userInfo) => {
    console.log('updating user info')
    console.log(userInfo)
    this.setState({
      userInfo: userInfo
    })
    this.props.history.push('/')
  }

  logout = () => {
    localStorage.clear();
    this.setState({userInfo: null});
    this.props.history.push('/');
  }

  onSelectTransaction = (transaction) => {
    this.setState({
      selectedTransaction: transaction
    })
    console.log(transaction)
  }

  handleSubmit = (transaction) => {
    this.setState({
        allTransactions: [...this.state.allTransactions, transaction]
      })
  }

  render() {
    const status = ["initiated", "Assigned", "picked up by carrier", "delivered"]
    console.log('inside of render')
    return (

      <Fragment>
        <NavBar
          handleSearchChange={this.handleSearchChange} trackingNumber={this.state.searchTrackingNumber}
          searchPath={this.state.searchPath}
          logged_in={!!this.state.userInfo}
          logout={this.logout}
          userInfo={this.state.userInfo}
        />
        <Switch>
          <Route exact path="/" render={() => null}
          />

          <Route exact path='/signup' component={SignUpForm}/>

          <Route exact path="/login" render={() =>
            <LoginForm updateUserInfo={this.updateUserInfo}/>} />

          <Route exact path="/profile" render={() =>
            <Profile userInfo={this.state.userInfo}/>}/>

          <Route
            exact
            path="/request"
            render=
            {
              () =>
                <TransactionCollection
                  userInfo={this.state.userInfo}
                  user_id="1"
                  status={status}
                  statusIndex={0}
                  allTransactions={this.state.allTransactions}
                  onSelectTransaction={this.onSelectTransaction}
                  currentPosition={this.state.currentPosition}
                />
            }
          />

          <Route
            exact
            path="/pickups"
            render=
            {
              () =>
                <TransactionCollection
                  userInfo={this.state.userInfo}
                  user_id={this.state.userInfo.id}
                  status={status}
                  statusIndex={1}
                  allTransactions={this.state.allTransactions}
                  onSelectTransaction={this.onSelectTransaction}
                  currentPosition={this.state.currentPosition}
                />
            }
          />

          <Route
            exact
            path="/dropoffs"
            render=
            {
              () =>
                <TransactionCollection
                  userInfo={this.state.userInfo}
                  user_id={this.state.userInfo.id}
                  status={status}
                  statusIndex={2}
                  allTransactions={this.state.allTransactions}
                  onSelectTransaction={this.onSelectTransaction}
                  currentPosition={this.state.currentPosition}
                />
            }
          />

          <Route
            exact
            path="/nextstop"
            render=
            {
              () =>
                <NextStop
                  userInfo={this.state.userInfo}
                  user_id={this.state.userInfo.id}
                  status={status}
                  statusIndex={2}
                  allTransactions={this.state.allTransactions}
                  onSelectTransaction={this.onSelectTransaction}
                  currentPosition={this.state.currentPosition}
                />
            }
          />

          <Route exact path='/send' component={SendForm}/>
          <Route
            exact
            path="/send"
            render=
            {
              () =>
                <SendForm
                  handleSumbit={this.handleSumbit}
                />
            }
          />

          <Route
            path='/transactions/:id'
            render=
            {
              (props)=>
              {
                console.log(props.match.params.id)
                let transactionId = ((props.match.params.id - 54321) / 12345)
                console.log(transactionId)
                let transaction = this.state.allTransactions.find(transaction => transaction.id === transactionId)
                console.log(transaction)
                return <TransactionCard
                          transaction={transaction}
                          type='track'
                          currentPosition={this.state.currentPosition}/>
              }
            }
          />
          <Route component={NotFound} />
        </Switch>
        {
          (!this.state.currentPosition) ? null :
            <MapContainer
              allTransactions={this.state.allTransactions}
              currentPosition={this.state.currentPosition}
            />
        }
      </Fragment>


    );
  }
}

export default withRouter(App);
