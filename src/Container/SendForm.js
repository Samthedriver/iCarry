import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class SendForm extends Component {
  constructor() {
    super()
    this.state = this.getInitialState()
  }

  getInitialState = () => ({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    senderAddress: '',
    description: '',
    dimensions: '',
    weight: '',
    instructions: '',
    pickupLocal: '',
    dropoffLocal: '',
    status: 'initiated',
    comments: '',
    image: '',
    user_id: 1
  })

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      [name]: value
    })
  }


  handleSubmit = e => {
    e.preventDefault()

    const { firstName,
            lastName,
            phoneNumber,
            senderAddress,
            description,
            dimensions,
            weight,
            instructions,
            pickupLocal,
            dropoffLocal,
            status,
            comments,
            user_id,
            image } = this.state

    console.log(JSON.stringify({
              transaction: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                senderAddress: senderAddress,
                description: description,
                dimensions: dimensions,
                weight: weight,
                instructions: instructions,
                pickupLocal: pickupLocal,
                dropoffLocal: dropoffLocal,
                status: status,
                comments: comments,
                image: image,
                user_id: user_id
              }
            }))

    fetch('http://localhost:3001/api/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        transaction: {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          senderAddress: senderAddress,
          description: description,
          dimensions: dimensions,
          weight: weight,
          instructions: instructions,
          pickupLocal: pickupLocal,
          dropoffLocal: dropoffLocal,
          status: status,
          comments: comments,
          image: image,
          user_id: user_id
        }
      })

    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        alert(`Your tracking number is ${(((data.transaction.id)*12345)+54321)}. Refer to it for up to date delivery status.`)
        })
      .catch(error => console.error(error))
    this.setState(this.getInitialState())
  }

  render() {
    const { value } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='First Name' placeholder='First Name' name='firstName' onChange={this.handleChange}/>
          <Form.Input fluid label='Last Name' placeholder='Last Name' name='lastName' onChange={this.handleChange}/>
          <Form.Input fluid label='Phone Number' placeholder='Phone Number' name='phoneNumber' onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Image Link' placeholder='http://' name='image' onChange={this.handleChange}/>
          <Form.Input fluid label="Weight" placeholder='approx. weight' name='weight' onChange={this.handleChange}/>
          <Form.Input fluid label='Dimensions' placeholder='H/W/L' name='dimensions' onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.TextArea label='Pickup Location' placeholder='Where to pickup item...' name='pickupLocal' onChange={this.handleChange}/>
          <Form.TextArea label='Dropoff Location' placeholder='Where to send item...' name='dropoffLocal' onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.TextArea label='Item Description' placeholder='Describe item or package contents...' name='description' onChange={this.handleChange}/>
          <Form.TextArea label='Delivery Instructions' placeholder='Add any detailed instructions for carrier here...' name='instructions' onChange={this.handleChange}/>
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default SendForm
