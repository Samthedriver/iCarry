import React, { Component } from 'react'
import { Menu, Input, Segment } from 'semantic-ui-react'
import deliverLogo from './deliverLogo.jpg'
import {Link, NavLink} from 'react-router-dom'

class NavBar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted secondary>

          <Link exact to="/">
          <Menu.Item name='Home' active={activeItem === 'home'} />
          </Link>
          <Link exact to="/login">
          <Menu.Item
            name='Login'
            active={activeItem === 'login'}
          />
          </Link>
          <Link exact to="/signup">
          <Menu.Item
            name='Signup And Be A Carrier'
            active={activeItem === 'signup'}
          />
          </Link>
          <Link exact to="/send">
          <Menu.Item
            name='Send an Item'
            active={activeItem === 'send'}
          />
          </Link>


          <Menu.Item
            name='Personal shipment from within your community.'>
            <h3>iCarry</h3>
          </Menu.Item>

          <Menu.Item
            name='Personal shipment from within your community.'
          />

          <Link exact to={this.props.searchPath}>
          <Menu.Item
            name='Track your shipment'
            active={activeItem === 'track'}
            classname='icon'
            icon='search'
          />
          </Link>
          <Link exact to= '/'>
          <Menu.Item>
            <Input onChange={this.props.handleSearchChange} placeholder='Track your item.' />
          </Menu.Item>
          </Link>


        </Menu>
      </Segment>
    )
  }
}

export default NavBar
