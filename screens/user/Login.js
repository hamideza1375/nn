import React from 'react';
import { Text } from 'react-native'
import BottomTab from '../../Components/BottomTab'
import TopTab from '../../Components/TopTab'
import Form from '../../Components/Form'
import { userState } from '../../state/userState';
import { topUser, bottomProfile } from '../../states/top-bottom';

const Login = (p) => {  
  if (p.token) p.navigation.navigate('Home')
  const bottom = p && bottomProfile(p)
  _user = new userState(p)
  _user.mountLogin()
  const sendLogin = () => _user.sendLoginAction()
  
  return (
    <BottomTab route={p.route.name} route2={bottom} >
      <TopTab route={p.route.name} route2={topUser} >
        <Form p c ch ph sizeY={.95} checkText="مرا بخاطر بسپار" onPress={() => { p.setchange(!p.change); sendLogin(); }} {...p}>
          <Text onPress={() => p.navigation.navigate('ForgetPass')} >فراموشی رمز عبور</Text>
        </Form>
      </TopTab>
    </BottomTab>
  )
}
export default Login
