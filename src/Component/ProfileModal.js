import React from 'react'
import { Button, Header, Icon, Image, Modal, Divider } from 'semantic-ui-react'
import PackageImage from '../package.jpeg'

const ProfileModal = ({userInfo, open, closeModal}) => (
  userInfo ? (
  <Modal
    basic
    open={open}
    onClick={closeModal}
    >
    <Modal.Header>{userInfo.username}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' alt={PackageImage} src={userInfo.avatar} />
      <Modal.Description>
        <div class="ui grid">
          <div class="seven wide column">
            <h4>First Name:</h4>
          </div>
          <div class="seven wide column">
            <h4>{userInfo.firstName}</h4>
          </div>
        </div>
        <div class="ui grid">
          <div class="seven wide column">
            <h4>Last Name:</h4>
          </div>
          <div class="seven wide column">
            <h4>{userInfo.lastName}</h4>
          </div>
        </div>
        <div class="ui grid">
          <div class="seven wide column">
            <h4>Phone Number:</h4>
          </div>
          <div class="seven wide column">
            <h4>{userInfo.phoneNumber}</h4>
          </div>
        </div>
        <Divider />
        <h4>A litte something about myself...</h4>
        <p>{userInfo.bio}</p>
        <Divider />
        <h4>Address:</h4>
        <p>{userInfo.address}</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
  ) : null
)

export default ProfileModal
