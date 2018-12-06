import React, { Component } from 'react'
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import PackageImage from '../package.jpeg'
import ChangeStatusModal from './ChangeStatusModal.js'

class TransactionDetailModal extends Component {
  constructor(){
    super();
    this.state = {
      isOpen: false
    }
  }

  open = () => {
    console.log('button clicked!')
    this.setState({
      isOpen: true
    })
  }

  close = () => {
    this.setState({
      isOpen: false
    })
  }

  getStatusIndex = (status) => {
    const statusArray = ["initiated", "Assigned", "picked up by carrier", "delivered"]

    return statusArray.indexOf(status)

  }

  render(){

    return (
      <Modal
        basic
        open={this.props.open}
        onClick={() => this.props.closeModal}
        >
        <Modal.Header>Tracking #{((this.props.transaction.id * 12345) + 54321)}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' alt={PackageImage} src={this.props.transaction.image} />
          <Modal.Description>
            <Header>Tracking #{((this.props.transaction.id * 12345) + 54321)}</Header>
            <h3>Status :{this.props.transaction.status}</h3>

            <p>Pickup Location :{this.props.transaction.pickupLocal}</p>
            <p>Dropoff Location :{this.props.transaction.dropoffLocal}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color='red'
            onClick={this.props.closeModal}
            icon>
            Exit <Icon name='x' />
          </Button>
          {
            this.props.logged_in ?

            <ChangeStatusModal
              transaction={this.props.transaction}
              status={this.props.status}
              statusIndex={this.getStatusIndex(this.props.status)}
              userInfo={this.props.userInfo}
              handleYes={this.close}
              handleNo={this.close}
            />

            :

            null
          }
          {
            this.props.logged_in ?

            <Button
              basic
              color='green'
              onClick={this.props.showNestedModal}
              icon>
              Update Status <Icon name='plus' />
            </Button>

            :

            null
          }
        </Modal.Actions>
      </Modal>
    )
  }

}

export default TransactionDetailModal
