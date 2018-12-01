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
import GeoSelect from './Container/GeoSelect.js';

var currentPosition = {};

class App extends Component {

  getCurrentPosition = (position) => {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }

  }

  constructor() {
    super();
    this.state = {
      allTransactions: [],
      selectedTransaction: null,
      searchTrackingNumber: '',
      searchPath: '',
      userInfo : null,
      lat: null,
      lng: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getCurrentPosition);

    fetch('http://localhost:3001/api/v1/transactions')
      .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({allTransactions: data})
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
  }

  logout = () => {
    localStorage.clear()
    this.setState({userInfo: null})
    this.props.history.push('/')
  }

  onSelectTransaction = (transaction) => {
    this.setState({
      selectedTransaction: transaction
    })
    console.log(transaction)
  }

  render() {
    const status = ["initiated", "Assigned", "picked up by carrier", "delivered"]

    return (
      <Fragment>
        <NavBar
          handleSearchChange={this.handleSearchChange} trackingNumber={this.state.searchTrackingNumber}
          searchPath={this.state.searchPath}
          logged_in={!!this.state.userInfo}
          logout={this.logout}
        />

        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />} />

          <Route exact path='/signup' component={SignUpForm}/>

          <Route exact path="/login" render={() => <LoginForm updateUserInfo={this.updateUserInfo}/>} />

          <Route exact path="/profile" render={() => <Profile userInfo={this.state.userInfo}/>} />

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
                />
            }
          />

          <Route exact path='/send' component={SendForm}/>

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
                return <TransactionCard transaction={transaction}/>
              }
            }
          />
          <Route component={NotFound} />
        </Switch>
        <MapContainer currentPosition={currentPosition} />
      </Fragment>

    );
  }
}

export default App;
