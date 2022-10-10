import React from 'react';
import Form from '../../Components/Form'
import { adminState } from '../../state/adminState';

export default AddAdmin = (p) => {
  _admin = new adminState(p)
  const sendAdmin = () => _admin.addAdmin()
  return <Form ph {...p} onPress={() => sendAdmin()} />
}