import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

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
      <Form onSubmit={this.handleSubmit}>
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
        <Form.Group widths='equal'>
          <Form.TextArea label='Address' placeholder='address' name='address' onChange={this.handleChange}/>
          <Form.TextArea label='Bio' placeholder='Tell us about yourself...' name='bio' onChange={this.handleChange}/>
        </Form.Group>
        <Form.Button>Sign Up!</Form.Button>
      </Form>
    )
  }
}

export default SignUpForm
