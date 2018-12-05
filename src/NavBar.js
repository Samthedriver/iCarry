import React, { Fragment, Component } from 'react'
import { Menu, Input, Segment } from 'semantic-ui-react'
import deliverLogo from './deliverLogo.jpg'
import { Link, NavLink, withRouter } from 'react-router-dom'


const NavBar = ({ location: { pathname }, userInfo, logged_in, logout, searchPath, handleSearchChange}) => {
  return (
    <Segment inverted>
      <Menu inverted secondary>
        {
          logged_in ?
          (
            <Fragment>
              <Menu.Item
                as={NavLink}
                to="/profile"
                name="Profile"
                active={pathname === "/profile"}
              />
              <Menu.Item
                as={NavLink}
                to="/nextstop"
                name="Next Stop"
                active={pathname === "/nextstop"}
              />
              <Menu.Item
                as={NavLink}
                to="/pickups"
                name="Pending Pickups"
                active={pathname === "/pickups"}
              />
              <Menu.Item
                as={NavLink}
                to="/dropoffs"
                name="Pending Dropoffs"
                active={pathname === "/dropoffs"}
              />
              <Menu.Item
                as={NavLink}
                to="/request"
                name="Add A Pickup"
                active={pathname === "/request"}
              />

              <Menu.Item position="right">
                <h4>logged in:</h4>
              </Menu.Item>

              <Menu.Item
                name={userInfo.username}
              />

              <Menu.Menu>
                <Menu.Item
                  to="/logout"
                  name="Logout"
                  onClick={logout}
                />
              </Menu.Menu>
            </Fragment>
          )

          :

          (
            <Fragment>
              <Menu.Item
                as={NavLink}
                to="/login"
                name="Login"
                active={pathname === "/login"}
              />
              <Menu.Item
                as={NavLink}
                to="/signup"
                name="Signup And Be A Carrier"
                active={pathname === "/signup"}
              />
              <Menu.Item
                as={NavLink}
                to="/send"
                name="Send A Package"
                active={pathname === "/send"}
              />
              <Menu.Menu position="right">
              <Menu.Item>
                <h3>iCarry</h3>
              </Menu.Item>

              <Menu.Item
                name='Personal shipment from within your community.'
              />

              <Menu.Item
                as={NavLink}
                to={searchPath}
                name="Track your shipment"
                classname='icon'
                icon='search'
              />
              <Menu.Item>
                <Input onChange={handleSearchChange} placeholder='Track your item.' />
              </Menu.Item>
              </Menu.Menu>
            </Fragment>
          )
        }
      </Menu>
    </Segment>
  )
}

export default withRouter(NavBar);
