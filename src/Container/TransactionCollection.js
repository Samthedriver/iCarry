import React, { Fragment, Component } from 'react';
import TransactionCard from '../Component/TransactionCard.js'
import {Route, Switch, Redirect, withRouter } from 'react-router-dom'
import ChangeStatusModal from '../Component/ChangeStatusModal.js'

// import RecipeModal from '../Component/RecipeModal.js'

class TransactionCollection extends React.Component {
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
    let url = `http://localhost:3001/api/v1/transactions/${this.state.selectedTransaction.id}`
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          transaction: {
            user_id: this.props.userInfo.id,
            status: this.props.status[this.props.statusIndex + 1]
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
    console.log(this.props.user_id)
    console.log(this.props.status[this.props.statusIndex])
    const transactionList = this.props.allTransactions.filter(transaction =>  ((transaction.status === this.props.status[this.props.statusIndex]) && (transaction.user_id == this.props.user_id)))

  	return (
  	  <div className="ui four column grid">
        {
          this.state.selectedTransaction === null ? null :
          <ChangeStatusModal status={this.props.status} statusIndex={this.props.statusIndex} open={this.state.isOpen} handleYes={this.handleYes} handleNo={this.handleNo} transaction={this.state.selectedTransaction}/>
        }
    		<div className="row">
          {
            transactionList.map(transaction => <TransactionCard key={transaction.id} transaction={transaction} handleClick={this.handleClick}/>)
          }
    		</div>
  	  </div>
  	);
  }
}

export default TransactionCollection;

// {
//   this.props.selectedRecipe === null ? null :
//       <RecipeModal selectedRecipe={this.props.selectedRecipe}/>
// }
