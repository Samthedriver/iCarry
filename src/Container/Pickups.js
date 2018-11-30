import React, { Fragment, Component } from 'react';
import ListingCard from '../Component/ListingCard.js'
import {Route, Switch, Redirect, withRouter } from 'react-router-dom'
import AddDropoffModal from '../Component/AddDropoffModal.js'

// import RecipeModal from '../Component/RecipeModal.js'
class Pickups extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      selectedTransaction: null
    }
  }

  handleClick = (transaction) => {
    console.log('transaction is clicked!')
    this.setState({
      isOpen: !this.state.isOpen,
      selectedTransaction: transaction
    });
  }

  handleNo = () => {
    console.log("No!")
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleYes = () => {
    console.log("Yes!")
    console.log(this.props.userInfo.id)
    let url = `http://localhost:3001/api/v1/transactions/${this.state.selectedListing.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          transaction: {
            status: "Picked Up"
          }
        })
      })
    	.then(response => response.json())
      		.then(data => {
        			console.log(data)
              this.props.onSelectTransaction(data)
 		 })
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render(){
  	return (
  	  <div className="ui four column grid">
        {
          this.state.selectedListing === null ? null :
          <AddDropoffModal open={this.state.isOpen} handleYes={this.handleYes} handleNo={this.handleNo} dropoff={this.state.selectedPickup}/>
        }
    		<div className="row">
          {
            this.props.openPickups.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} handleClick={this.handleClick}/>)
          }
    		</div>
  	  </div>
  	);
  }
}

export default Pickups;

// {
//   this.props.selectedRecipe === null ? null :
//       <RecipeModal selectedRecipe={this.props.selectedRecipe}/>
// }
