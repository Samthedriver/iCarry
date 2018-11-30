import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import GeoSelect from './GeoSelect.js'
import Geosuggest from 'react-geosuggest';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class SignUpForm extends Component {
  constructor() {
    super()
    this.state = this.getInitialState()
  }

  getInitialState = () => ({
    username: '',
    password: '',
    passwordRetype: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    bio: '',
    avatar: '',
    deliveries: '0'
  })

  onSelectAddress = (address) => {
    console.log(address);
    console.log(address.description);
    this.setState({
      address: address.description
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
    e.preventDefault();

    const { username,
            password,
            passwordRetype,
            firstName,
            lastName,
            phoneNumber,
            address,
            bio,
            avatar,
            deliveries
          } = this.state

    if(!(password === passwordRetype))
    {
      alert('Passwords do not match, please re-type carefully.');
      return;
    }
    else
    {
      console.log('Passwords match!')
      console.log(JSON.stringify({
        user: {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address: address,
          bio: bio,
          avatar: avatar,
          deliveries: deliveries
        }
      }))
    }

    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address: address,
          bio: bio,
          avatar: avatar,
          deliveries: deliveries
        }
      })

    })
      .then(resp => resp.json())
      .then(data => console.log(data))
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

        <h1>SIGN UP & DELIVER</h1>

        <Form.Group widths='equal'>
          <Form.Input fluid label='Username' placeholder='Username' name='username' onChange={this.handleChange}/>
          <Form.Input fluid label='Password' placeholder='Password' name='password' onChange={this.handleChange}/>
          <Form.Input fluid label='Re-type Password' placeholder='Re-type Password' name='passwordRetype' onChange={this.handleChange}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input fluid label='First Name' placeholder='First Name' name='firstName' onChange={this.handleChange}/>
          <Form.Input fluid label='Last Name' placeholder='Last Name' name='lastName' onChange={this.handleChange}/>
          <Form.Input fluid label='Phone Number' placeholder='Phone Number' name='phoneNumber' onChange={this.handleChange}/>
          <Form.Input fluid label='Profile Picture' placeholder='http://' name='avatar' onChange={this.handleChange}/>
        </Form.Group>

        <Form.TextArea label='Bio' placeholder='Tell us about yourself...' name='bio' onChange={this.handleChange}/>

        <h4>Address</h4>
        <Geosuggest
            ref={el=>this._geoSuggest=el}
            label='Address'
            placeholder="Type your address here..."
            name='address'
            onSuggestSelect={this.onSelectAddress}
            location={new this.props.google.maps.LatLng(53.558572, 9.9278215)}
            radius="20" />

        <Form.Button>SUBMIT</Form.Button>
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
})(SignUpForm);
