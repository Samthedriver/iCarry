import React from "react";
import { Card, Image } from "semantic-ui-react";
import {Redirect} from 'react-router-dom';
import NotFound from './NotFound.js'

const Profile = ({userInfo}) => {
    return userInfo ? (
    <Card>
      <Image src={userInfo.avatar} />
      <Card.Content>
        <Card.Header>{userInfo.username}</Card.Header>

        <Card.Description>{userInfo.bio}</Card.Description>
      </Card.Content>
    </Card>
  ) : null
}
export default Profile;
