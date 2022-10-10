import React from 'react';
import Form from '../../Components/Form'
import { adminState } from '../../state/adminState';

export default ChangeAdmin = (p) => {
  const _admin = new adminState(p)
  const sendChangeAdmin = () => _admin.changeAdmin()
  return <Form ph _input {...p} onPress={() => sendChangeAdmin()} />
}