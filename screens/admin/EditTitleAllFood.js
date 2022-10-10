import React from 'react'
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';
import { foodState } from '../../state/foodState';
import  Title from '../../utils/setTitle';

const EditFood = (p) => {
  Title()
  const _food = new foodState(p)
  const _admin = new adminState(p)
  _food.getSingleTitleFoods()
  const editeTitltFood = () => _admin.editeFoods()
  return <Form t im edit {...p} onPress={() => { editeTitltFood(); }}/>
}
export default EditFood
