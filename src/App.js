import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar.js'
import {Route} from 'react-router-dom'
import SignUpForm from './Container/SignUpForm'
import LoginForm from './Container/LoginForm'
import SendForm from './Container/SendForm'
import TransactionCard from './Component/TransactionCard'

class App extends Component {
  constructor() {
    super();
    this.state = {
      allTransactions: [],
      selectedTransaction: null,
      searchTrackingNumber: '',
      searchPath: ''
    }
  }

  componentDidMount() {
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

  render() {
    return (
      <div>
        <NavBar handleSearchChange={this.handleSearchChange} trackingNumber={this.state.searchTrackingNumber} searchPath={this.state.searchPath}/>
        <Route exact path='/signup' component={SignUpForm}/>
        <Route exact path='/login' component={LoginForm}/>
        <Route exact path='/send' component={SendForm}/>
        <Route path='/transactions/:id' render={(props)=> {
          console.log(props.match.params.id)
          let transactionId = ((props.match.params.id - 54321) / 12345)
          console.log(transactionId)
          let transaction = this.state.allTransactions.find(transaction => transaction.id === transactionId)
          console.log(transaction)
          return <TransactionCard transaction={transaction}/>
        }} />
      </div>
    );
  }
}

export default App;
