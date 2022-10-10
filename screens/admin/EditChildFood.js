import React from 'react'
import { View } from 'react-native';
import Form from '../../Components/Form';
import { adminState } from '../../state/adminState';
import Title from '../../utils/setTitle';

const EditChildFood = (p) => {
  Title()
  const _admin = new adminState(p)
  _admin.getEdit()
  _admin.unmountEditFood()
  const editeChildFood = () => _admin.editeFoodAction()

  return (
    <View>
      <Form t pr i im edit
        {...p}
        onPress={() => editeChildFood()} />
    </View>
  )
}
export default EditChildFood
