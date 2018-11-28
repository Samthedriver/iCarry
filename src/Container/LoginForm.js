import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const LoginForm = () => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Input fluid label='Username' placeholder='Username' name='Username' />
      <Form.Input fluid label='Password' placeholder='Password' name='Password' />
    </Form.Group>
    <Form.Button>Login</Form.Button>
  </Form>
)

export default LoginForm
