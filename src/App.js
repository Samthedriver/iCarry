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
import TransactionDetailModal from './Component/copyTransactionDetailModal.js'
import ChangeStatusModal from './Component/ChangeStatusModal.js'
import ProfileModal from './Component/ProfileModal.js'



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
      nextStop: {},
      showModal: false,
      showNestedModal: false,
      showProfileModal: false
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

  onSelectTransaction = (newTransaction) => {

    let copyAllTransactions = [...this.state.allTransactions]
    let oldTransaction = copyAllTransactions.find(transaction => transaction.id === newTransaction.id)
    copyAllTransactions[copyAllTransactions.indexOf(oldTransaction)] = newTransaction;

    this.setState({
      selectedTransaction: newTransaction,
      allTransactions: copyAllTransactions
    })
    console.log(newTransaction)
  }

  getStatusIndex = (status) => {
    const statusArray = ["initiated", "Assigned", "picked up by carrier", "delivered"]

    return statusArray.indexOf(status)

  }

  handleNo = () => {
    console.log("No!")
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleYes = () => {

    const status = ["initiated", "Assigned", "picked up by carrier", "delivered"]
    let transaction = this.state.selectedTransaction;
    let statusIndex = this.getStatusIndex(transaction.status)
    console.log("Yes!")
    console.log(this.state.userInfo.id)
    let url = `http://localhost:3001/api/v1/transactions/${transaction.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          transaction: {
            user_id: this.state.userInfo.id,
            status: status[statusIndex + 1]
          }
        })
      })
    	.then(response => response.json())
      		.then(data => {
        			console.log(data)
              let copyAllTransactions = [...this.state.allTransactions]
              copyAllTransactions[copyAllTransactions.indexOf(transaction)] = data;

              this.setState({
                selectedTransaction: data,
                allTransactions: copyAllTransactions,
                showNestedModal: !this.state.showNestedModal,
                showModal: !this.state.showModal
              })
 		 })
  }

  handleSubmit = (transaction) => {

    this.setState({
        allTransactions: [...this.state.allTransactions, transaction]
      })

  }

  showModal = (transaction) => {
    console.log('transaction is clicked!')
    this.setState({
      showModal: !this.state.showModal,
      selectedTransaction: transaction
    });
  }

  closeModal = () => {

    this.setState({
      showModal: !this.state.showModal
    })
  }

  showNestedModal = () => {
    this.setState({
      showNestedModal: !this.state.showNestedModal
    })
  }

  closeNestedModal = () => {
    this.setState({
      showNestedModal: !this.state.showNestedModal
    })
  }

  showProfileModal = () => {
    this.setState({
      showProfileModal: !this.state.showProfileModal
    });
  }

  closeProfileModal = () => {

    this.setState({
      showProfileModal: !this.state.showProfileModal
    })
  }

  handleClick = () => {
    console.log('change status is clicked!')
    this.setState({
      isOpen: !this.state.isOpen
    });
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
          showProfileModal={this.showProfileModal}
        />
        <Switch>
          <Route
            exact path="/"
            render=
            {
              () =>
                {
                  let user_id = 1
                  let zoom = 15

                  if(!!this.state.userInfo)
                  {
                    user_id = this.state.userInfo.id
                    zoom = 12
                  }

                  return (
                    (!this.state.currentPosition) ? null :
                      <MapContainer
                        allTransactions={this.state.allTransactions}
                        currentPosition={this.state.currentPosition}
                        logged_in={!!this.state.userInfo}
                        userInfo={this.state.userInfo}
                        user_id={user_id}
                        viewType='history'
                        zoom={zoom}
                        showModal={this.showModal}
                      />
                  )
                }
            }
          />

          <Route exact path='/signup' component={SignUpForm}/>

          <Route exact path="/login" render={() =>
            <LoginForm updateUserInfo={this.updateUserInfo}/>} />


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
              () => {

                return (
                  <NextStop
                    userInfo={this.state.userInfo}
                    user_id={this.state.userInfo.id}
                    status={status}
                    statusIndex={2}
                    allTransactions={this.state.allTransactions}
                    onSelectTransaction={this.onSelectTransaction}
                    currentPosition={this.state.currentPosition}
                    logged_in={!!this.state.userInfo}
                    showModal={this.showModal}
                  />
                )
              }
            }
          />

          <Route
            exact
            path="/send"
            render=
            {
              (props) =>
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

                let user_id = 1
                let zoom = 17

                return (
                  (!this.state.currentPosition) ? null :
                    <MapContainer
                      transaction={transaction}
                      allTransactions={this.state.allTransactions}
                      currentPosition={transaction.pickupCoordinates}
                      logged_in={!!this.state.userInfo}
                      userInfo={this.state.userInfo}
                      user_id={user_id}
                      viewType='track'
                      zoom={zoom}
                      showModal={this.showModal}
                    />
                )
              }
            }
          />
          <Route component={NotFound} />
        </Switch>
        {
          this.state.selectedTransaction === null ? null :
          <Fragment>
            <TransactionDetailModal
              open={this.state.showModal}
              transaction={this.state.selectedTransaction}
              closeModal={this.closeModal}
              currentPosition={this.state.currentPosition}
              status={status}
              logged_in={!!this.state.userInfo}
              userInfo={this.state.userInfo}
              showNestedModal={this.showNestedModal}

            />
            <ChangeStatusModal
              status={status}
              statusIndex={this.getStatusIndex(this.state.selectedTransaction.status)}
              open={this.state.showNestedModal}
              handleYes={this.handleYes}
              handleNo={this.closeNestedModal}
              transaction={this.state.selectedTransaction}
            />
          </Fragment>
        }
        <ProfileModal
          open={this.state.showProfileModal}
          closeModal={this.closeProfileModal}
          userInfo={this.state.userInfo}
        />
      </Fragment>


    );
  }
}

export default withRouter(App);
