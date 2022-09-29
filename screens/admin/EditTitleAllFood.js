import React from 'react'
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';
import  Title from '../../states/setTitle';

const EditFood = (p) => {
  Title()
  const _admin = new adminState(p)
  _admin.getFoodsEdit()
  const editeTitltFood = () => _admin.editeFoods()
  return <Form t im edit {...p} onPress={() => { editeTitltFood(); }}/>
}
export default EditFood
