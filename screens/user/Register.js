import React from 'react';
import Form from '../../Components/Form'
import { userState } from '../../state/userState';


const Register = (p) => {
  _user = new userState(p)
  const registerSend = () => _user.registerSendAction();
  const sendCode = () => _user.registerSendCode();


  return (
      <>
        {!p.changeRegister ?<Form f p ch ph onPress={() => registerSend()} {...p} />
        :
        <Form $code onPress={() => sendCode()} {...p} />}
      </>
  );
};
export default Register
