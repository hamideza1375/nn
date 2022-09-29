import React from 'react'
import Modal from '../../Components/Modal';
import Card from '../../Components/Card';
import { View } from 'react-native';
import { Button } from '../../Components/Html';
import { adminState } from '../../state/adminState';

const _Modal = (p) => {
  const _admin = new adminState(p)

  const handle = () => {
    if (p.id && p.id2) _admin.deleteChildFoodAction(p.id, p.id2)
    p.id && !p.id2 && _admin.deleteFoodAction(p.id) 
    p.setShowModal(!p.showModal);
    p.deleteUnmunt && p.deleteUnmunt(p.id2)
    p.availabe && p.availabe(false)
  }

  return (
    <View style={{ height: 0 }} >
      <Modal style={{ width: 333, height: 200, backgroundColor: '#eee' }}
        setShow={p.setShowModal} show={p.showModal}>
        <View>
          <Card bgcolor='#f8a2' color='#a489' header={p.message}
            style={{
              width: 280, justifyContent: 'center', alignItems: 'center',
              marginTop: 10
            }} />
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
          <Button color='#fff' bgcolor='#9ad' onPress={handle}
            style={{ fontSize: 14, width: 78, marginVertical: 11 }}>بله</Button>
          <Button color='#fff' bgcolor='#d7a' onPress={() => { p.availabe && p.availabe(true); p.setShowModal(!p.showModal) }} style={{ fontSize: 14, width: 78, marginVertical: 11 }}>خیر</Button>
        </View>
      </Modal >
    </View>
  )
}

export default _Modal
