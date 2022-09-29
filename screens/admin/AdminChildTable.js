import React from 'react';
import { View } from 'react-native';
import { Button, Table } from '../../Components/Html';
import styles from "./Admin.scss"
import Loading from '../../Components/Loading'
import _Modal from './Modal';
import { foodState } from '../../state/foodState';
import Pagination from '../../Components/Pagination';
import { adminState } from '../../state/adminState';

const AdminChildTable = (p) => {
  const _admin = new adminState(p)
  const _food = new foodState(p)
  const sendSetavailable = async (available, id, id2) => _admin.available(available, id, id2)
  const deleteUnmunt = async () => _admin.deleteUnmunt(p.id2)
  _food.getChildFood2()
  return (
    <View style={[styles.container]}>
      <View flex={1} >
        <Button ph={8} mv={8} onPress={() => p.navigation.navigate("CreateChildFood", { id: p.route.params.id, })}>ساخت </Button>
        <View flex={1}>
          {!p.current ?
            <Loading />
            :
            <Table
              color={['#555', '#656565', 'white']}
              header={['موجودیت', 'ویرایش', 'حذف', ' قیمت', 'عنوان']}
              body={['موجودیت', 'ویرایش', ' حذف', 'price', 'title']}
              btn3={'#d33'}
              btn3onClick={() => { p.setShowModal(true); p.setid(p.route.params.id); p.setid2(p.current[p.$food[1]]._id) }}
              btn2={'#2b3'}
              btn2onClick={() => { p.navigation.navigate("EditChildFood", { id: p.route.params.id, id2: p.current[p.$food[1]]._id, title: p.current[p.$food[1]].title }) }}
              btn1={'#999'}
              btn1onClick={() => { p.setShow(true); p.setid2(p.current[p.$food[1]]._id) }}
              btn1Opacity
              object={p.current}
              setobject={p.set$food}
            />
          }
        </View>
        <View style={{ height: '7%', minHeight: 50, bottom: 85, zIndex: 111, alignItems: 'center', alignSelf: 'center' }} >
          {p.foodMap.get(p.route.params.id) &&
            <Pagination
            food={p.foodMap.get(p.route.params.id)}
            setcurrent={p.setcurrent}
            pageLimit={p.pageLimit}
            ass={p.ass}
            page={p.page}
            setpage={p.setpage}
            currentPage={p.currentPage}
            setcurrentPage={p.setcurrentPage}
            // id={p.route.params.id}
            // currentMap={p.currentMap}
            />
          }
        </View>
        <_Modal availabe={(param) => { sendSetavailable(param, p.route.params.id, p.id2); p.setShow(false) }} showModal={p.show} setShowModal={p.setShow} message={'موجود نیست؟' + " (" + p.current[p.$food[1]]?.title + ')'} />
        <_Modal deleteUnmunt={deleteUnmunt} showModal={p.showModal} setShowModal={p.setShowModal} id={p.id} id2={p.id2} message={'حذف شود؟ ' + " (" + p.current[p.$food[1]]?.title + ')'} />
      </View>
    </View>
  )
}
export default AdminChildTable

