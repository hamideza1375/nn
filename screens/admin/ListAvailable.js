import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Modal from '../../Components/Modal';
import { Button, Table } from '../../Components/Html';
import { adminState } from '../../state/adminState';

export default _listAvailable = (p) => {
   const _admin = new adminState(p)
   _admin.listAvailable()
   const sendTrueAvailable = () => _admin.sendAvailable()
  return (
    <ScrollView style={{ width: '98%', alignSelf: 'center', marginTop: 15 }} >
      {p.list &&
        <Table
          color={['#555', '#656565', 'white']}
          header={['نمایش', 'عنوان']}
          body={['موجود شد', 'title']}
          btn1onClick={() => { p.setid2(p.list[p.$food[1]]._id); p.setShowModal(true); p.setid(p.list[p.$food[1]].refId); p._setid(p.list[p.$food[1]]._id) }}
          object={p.list}
          setobject={p.set$food}
          h={50}
        />
      }
      <Modal style={{ width: 333, height: 165, backgroundColor: '#eee', justifyContent: 'space-around' }} setShow={p.setShowModal} show={p.showModal}>
        <Text style={{ fontSize: 17 }} >از انتخابتون مطمئنید</Text>
        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
          <Button color='#fff' bgcolor='#9ad' onPress={sendTrueAvailable} style={{ fontSize: 14, width: 78, marginVertical: 11 }}>بله</Button>
        </View>
      </Modal >
    </ScrollView>
  )
}