import React, {Fragment, Component} from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
import PackageImage from '../package.jpeg'

class ChangeStatusModal extends Component {
  constructor(){
    super();
    this.state = {
      open: false
    }
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ close: false })

  handleYes = () => {
    this.close();
    this.props.handleYes();
  }

  getStatusIndex = (status) => {
    const statusArray = ["initiated", "Assigned", "picked up by carrier", "delivered"]

    return statusArray.indexOf(status)

  }

  render() {
    const { open } = this.state

    return (

      <Modal
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={
          <Button
            basic
            color='green'
            icon>
            Update Status <Icon name='plus' />
          </Button>
        }
      >
        <Header icon='plus' content='Status Update' />
        <Modal.Content>
          <p>
            Would you like to update the status to
            {this.props.status[this.getStatusIndex(this.props.transaction.status) + 1]}?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close} basic color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button onClick={this.handleYes} color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>


    )
  }
}

const TransactionDetailModal = (props) => (
  <Modal
    basic
    open={props.open}
    onClick={props.closeModal}
    >
    <Modal.Header>Tracking #{((props.transaction.id * 12345) + 54321)}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' alt={PackageImage} src={props.transaction.image} />
      <Modal.Description>
        <Header>Tracking #{((props.transaction.id * 12345) + 54321)}</Header>
        <h3>Status :{props.transaction.status}</h3>

        <p>Pickup Location :{props.transaction.pickupLocal}</p>
        <p>Dropoff Location :{props.transaction.dropoffLocal}</p>
      </Modal.Description>
    </Modal.Content>

    {
      props.logged_in ?

      <Modal.Actions>
        <ChangeStatusModal
          status={props.status}
          userInfo={props.userInfo}
          handleYes={props.handleYes}
          handleClick={props.handleClick}
        />
      </Modal.Actions>

      :

      null
    }

  </Modal>

)

export default TransactionDetailModal
