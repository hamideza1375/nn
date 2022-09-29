import React from 'react';
import { View, ScrollView } from 'react-native';
import {Button, Table} from '../../Components/Html';
import { foodState } from '../../state/foodState';
import styles from "./Admin.scss"
import Loading from '../../Components/Loading'
import Modal from './Modal';

const AdminTitleAllFood = function (p) {
  const _food = new foodState(p)
  _food.getTitleFood([p.showModal,p.show])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{width:'100%'}} >
        {
          !p.foods.length ? 
           <Loading style={{ top: 40 }} animating={p.foods.length?false:true} />
            :
      <Table 
       color={['#555','#656565','white']}
        header={['edit','دیدن','پاک کردن', 'عنوان']}
        body={['edit','دیدن','پاک کردن', 'title' ]}
        btn3={'#d33'}
        btn3onClick={()=>{ p.setShowModal(true); p.setid(p.foods[p.$food[1]]._id) }}
        btn2={'#07d'}
        btn2onClick={()=>{p.navigation.navigate("AdminChildTable", { id: p.foods[p.$food[1]]._id, title : p.foods[p.$food[1]].title })}}
        btn1={'#2b3'}
        btn1onClick={()=>{p.navigation.navigate("EditTitleAllFood", { id: p.foods[p.$food[1]]._id, show: p.showModal })}}
        fontSize={16}
        object={p.foods}
        setobject={p.set$food}
        />
      }
        <Button mv={8} onPress={() => p.navigation.navigate("CreateTitleAllFood")}>ساخت دسته ی اغذیه</Button>
        <Button mv={8} onPress={() => p.navigation.navigate('AddAdmin')}>افزودن به گروه ادمین ها</Button>
        <Button mv={8} onPress={() => p.navigation.navigate('Notifee')}>ارسال نوتیفیکیشن</Button>
        <Button mv={8} onPress={() => p.navigation.navigate('ListAvailable')}>لیست غذا های ناموجود</Button>
        <Button mv={8} onPress={() => p.navigation.navigate("Address")} >address</Button>
        <Button mv={8} onPress={() => p.navigation.navigate("DeleteAdmin")} >DeleteAdmin</Button>
        <Button mv={8} onPress={() => p.navigation.navigate("DeleteAllAddress")} >DeleteAllAddress</Button>
        <Modal showModal={p.showModal} setShowModal={p.setShowModal} id={p.id} message={ 'حذف شود؟ ' + " (" + p.foods[p.$food[1]]?.title + ')' } />
      </View>
    </ScrollView>
  )
}

export default AdminTitleAllFood