import React from 'react';
import Form from '../../Components/Form'
import { adminState } from '../../state/adminState';

const Notifee = (p) => {
  const _admin = new adminState(p)
  const createNotifee = () => _admin.notifee()
  return <Form t i {...p} onPress={createNotifee} />
}
export default Notifee
