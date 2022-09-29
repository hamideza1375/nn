import React from 'react'
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';

const CreateChildFood = (p) => {
  const _admin = new adminState(p)
  const sendCreateChildFood = () => _admin.createChild()
  return <Form t pr i im {...p} onPress={sendCreateChildFood}/>
}
export default CreateChildFood