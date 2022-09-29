import React from 'react';
import Form from '../../Components/Form'
import { userState } from '../../state/userState';

export default AddAdmin = (p) => {
  _user = new userState(p)
  const sendAdmin = () => _user.addAdmin()
  return <Form ph {...p} onPress={() => sendAdmin()} />
}