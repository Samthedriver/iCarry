import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const AddPickupModal = (props) => (
  <Modal open={props.open}>
    <Header icon='plus' content='Status Update' />
    <Modal.Content>
      <p>
        Would you like to update the status to {props.status[props.statusIndex + 1]}?
      </p>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={props.handleNo} basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button onClick={props.handleYes} color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default AddPickupModal
