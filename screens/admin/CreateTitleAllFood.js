import React from 'react'
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';

const CreateTitleAllFood = (p) => {
  const _admin = new adminState(p)
  const sendCreateTitleFood = () => _admin.createFoodAction()
  return <Form t im {...p} onPress={() => { sendCreateTitleFood() }} />
}
export default CreateTitleAllFood