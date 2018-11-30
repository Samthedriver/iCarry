import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import GeoSelect from './GeoSelect.js'
import Geosuggest from 'react-geosuggest';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


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

  onSelectPickup = (pickup) => {
    console.log(pickup);
    console.log(pickup.description);
    this.setState({
      pickupLocal: pickup.description
    })
  }

  onSelectDropoff = (dropPoint) => {
    console.log(dropPoint);
    console.log(dropPoint.description);
    this.setState({
      dropoffLocal: dropPoint.description
    })
  }

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
      <div>
      <br/>
      <div class="ui grid">

        <div class="one wide column"></div>

        <div class="fourteen wide column">
      <Form onSubmit={this.handleSubmit}>
        <h1>SEND A PACKAGE</h1>
        <br/>
        <Form.Group widths='equal'>
          <Form.Input fluid label="Sender's  First Name" placeholder='First Name' name='firstName' onChange={this.handleChange}/>
          <Form.Input fluid label='Last Name' placeholder='Last Name' name='lastName' onChange={this.handleChange}/>
          <Form.Input fluid label='Phone Number' placeholder='Phone Number' name='phoneNumber' onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Image Link' placeholder='http://' name='image' onChange={this.handleChange}/>
          <Form.Input fluid label="Weight" placeholder='approx. weight' name='weight' onChange={this.handleChange}/>
          <Form.Input fluid label='Dimensions' placeholder='H/W/L' name='dimensions' onChange={this.handleChange}/>
        </Form.Group>
        <br/>

        <h4>Pickup Location</h4>
        <Geosuggest
            ref={el=>this._geoSuggest=el}
            label='Pickup Location'
            placeholder="where to pickup..."
            name='pickupLocal'
            onSuggestSelect={this.onSelectPickup}
            location={new this.props.google.maps.LatLng(53.558572, 9.9278215)}
            radius="20" />

        <h4>Dropoff Location</h4>
        <Geosuggest
              ref={el=>this._geoSuggest=el}
              label='Dropoff Location'
              placeholder="where to dropoff..."
              name='dropoffLocal'
              onSuggestSelect={this.onSelectDropoff}
              location={new this.props.google.maps.LatLng(53.558572, 9.9278215)}
              radius="20" />

        
        <Form.Group widths='equal'>
          <Form.TextArea label='Item Description' placeholder='Describe item or package contents...' name='description' onChange={this.handleChange}/>
          <Form.TextArea label='Delivery Instructions' placeholder='Add any detailed instructions for carrier here...' name='instructions' onChange={this.handleChange}/>
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
      </div>
        <div class="one wide column"></div>
      </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBq4yvCqpuZ3v9hUwmQ59npgHg9USG0vwg')
})(SendForm);
