import React from 'react';
import { Text } from 'react-native'
import Form from '../../Components/Form'
import { userState } from '../../state/userState';

const Login = (p) => {  
  if (p.token) p.navigation.navigate('Home')
  _user = new userState(p)
  _user.mountLogin()
  const sendLogin = () => _user.sendLoginAction()
  
  return (
        <Form p c ch ph sizeY={.95} checkText="مرا بخاطر بسپار" onPress={() => { p.setchange(!p.change); sendLogin(); }} {...p}>
          <Text onPress={() => p.navigation.navigate('ForgetPass')} >فراموشی رمز عبور</Text>
        </Form>
  )
}
export default Login
