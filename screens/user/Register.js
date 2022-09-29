import React from 'react';
import BottomTab from '../../Components/BottomTab'
import TopTab from '../../Components/TopTab'
import Form from '../../Components/Form'
import { userState } from '../../state/userState';
import { topUser, bottomProfile } from '../../states/top-bottom';

const Register = (p) => {
  const bottom = bottomProfile(p)
  _user = new userState(p)
  const registerSend = () => _user.registerSendAction();

  return (
    <BottomTab route={p.route.name} route2={bottom} >
      <TopTab route={p.route.name} route2={topUser} >
        <Form f p ch ph onPress={() => registerSend()} {...p} >
        </Form>
      </TopTab>
    </BottomTab>
  );
};
export default Register
