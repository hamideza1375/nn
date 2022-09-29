import React from 'react'
import { View, Text, ImageBackground, FlatList } from 'react-native'
import {Button} from '../../Components/Html'
import { foodState } from '../../state/foodState';
import styles from "./Food.scss"
import { truncate } from '../../states/helpers';
import Card from '../../Components/Card';
import Loading from '../../Components/Loading'
import { localhost } from '../../services/host.json'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { CreateComment } from './form/CreateComment';
import { EditComment } from './form/EditComment';

const SingleFood = (p) => {
  const _food = new foodState(p)
  _food.getsinglefood()
  _food.getCommentSingle()
  _food.setHeader()
  _food.getImageProfile()
  const editComment =(id)=> _food.pressIconEdit(id)
  const deleteComment =(id)=> _food.deleteComment(id)

  return (
    <>
      <View style={[styles.scrollView, styles.scrollContain]}>
        {!p.showForm && !p.showForm2 &&
          <View style={{ alignItems: 'center', flex: 1.2, width: '100%' }} >
            {
              p.singlefood && p.singlefood.title ?
                <>
                  <View style={styles.head}>
                    <ImageBackground style={{
                      flex: 1
                    }} source={{ uri: `${localhost}/upload/food/${p.singlefood.imageUrl}` }} >
                      <Text style={styles.title}>{p.singlefood.title}</Text>
                    </ImageBackground>
                  </View>
                  <View style={styles.containPrice}>
                    <View style={{}}>
                      <Text style={styles.info}
                        onPress={(e) => p.setShow(!p.show)}
                      >توضیحات:{!p.show ? truncate(p.singlefood.info, 9) : p.singlefood.info}</Text>
                    </View>
                    <View style={{}}>
                      <Text style={styles.price}>قیمت: {p.singlefood.price} تومان</Text>
                    </View>
                  </View>
                </>
                :
                <Loading style={{ top: 70 }} animating={p.singlefood?false:true}/>
            }
          </View>}
        <View style={styles.commentContain}>
          {!p.showForm && <Button bgcolor='#cbd' style={styles.btnShow} onPress={() => { p.setshowForm2(!p.showForm2) }}>
            {!p.showForm2 ? ' ارسال نظر' : ' بازگشت'}
          </Button>}
          {!p.showForm2 && p.showForm && <Button bgcolor='#cbd' style={styles.btnShow} onPress={() => { p.setShowForm(false) }}>
            {!p.showForm2 ? ' بازگشت' : ' ویرایش نظر'}
          </Button>}
          {p.showForm2 ?
          p.permission ?
            <View style={{ height: '78%', paddingHorizontal: 15, paddingBottom: 25 }} >
              <CreateComment props={p} route={p.route} />
            </View>
            :
            <View onLayout={()=>{
              p.setshowForm2(false)
              alert('برای ارسال نظر باید ثبت نام کرده و یا قبلا از این غذا سفارش باشین')
            }} ></View>
            :
            <></>
          }
          {p.showForm &&
            <View style={{ height: '70%', paddingHorizontal: 15, paddingBottom: 15 }} >
              <EditComment id={p.route.params.id} id2={p.route.params.id2} id3={p.id3} props={p} />
            </View>
          }
          {
            !p.showForm && !p.showForm2 &&
            <FlatList
              numColumns={1}
              data={p.allcomment}
              keyExtractor={(f, i) => i.toString()}
              contentContainerStyle={{ alignItems: 'center' }}
              renderItem={({ item }) => (
                <View style={styles.containComment}>
                  <Card
                    bgcolor='black'
                    header={
                      <View style={{ flexDirection: 'row' }} >
                        <View style={{ flexDirection: 'row', minWidth: '55%' }} >
                          <Text style={{ color: '#efefef' }} >{item.fullname}</Text>
                        </View>
                        {item.starId === p.tokenValue.userId && <View style={{ top: -4, justifyContent: 'flex-start', flexDirection: 'row', marginRight: 'auto', minWidth:100 }} >
                          <View style={{ minWidth: 45, justifyContent: 'flex-start', flexDirection: 'row', }} >
                            <Icon name='edit' size={19} color='#742e' onPress={()=> editComment(item._id)} />
                          </View>
                          <View style={{ minWidth: 45, justifyContent: 'flex-start', flexDirection: 'row', justifyContent: 'flex-start', }} >
                            <Icon name='trash' size={19} color='#742e' onPress={() => deleteComment(item._id)} />
                          </View>
                        </View>}
                      </View>
                    }
                    body={item.message}
                    img={!item.imageUrl ?
                      require("../../assets/images/a8.jpg")
                      :
                      { uri: `${localhost}/upload/profile/${p.imageProfile}` }}
                    imgStyle={styles.imgCardComment}
                    style={[styles.cardComment, {}]}
                  />
                </View>
              )}
            />}
        </View>
      </View>

    </>
  )
}
export default SingleFood