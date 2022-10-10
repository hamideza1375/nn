import React, { useRef } from 'react'
import { View, Text, FlatList, Image, TextInput, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import { foodState } from '../../state/foodState';
import styles from "./Food.scss"
import {localhost} from '../../utils/axios/axios'
import Pagination from '../../Components/Pagination';
import Loading from '../../Components/Loading'
import spacePrice from '../../utils/spacePrice';

let styleScroll = {}
let numColumns = 2

const ChildFood = (p) => {

  let scrollRef = useRef()
  const _food = new foodState(p)
  _food.getChildFood()
  _food.allPrice()
  const searcher =(text)=>{_food.sercher(text); p.settextSearch(text)}
  const foodAsc = () => _food.foodAsc(p.setpage)
  const foodDesc = () => _food.foodDesc(p.setpage)
  const plus = (index, item) => { _food.plustNum(index, item, p.setpage, p.page) }
  const minus = (index, item) => { _food.minusNum(index, item, p.setpage, p.page) }
  const inputPrice = `${p.allprice ? p.allprice : '0'}`
  if (p.width <= 600) { styleScroll = styles.containItem; numColumns = 2}
  if (p.width > 600) { styleScroll = styles.containItemScroll; numColumns = 3 }

  return (
    <View style={[styles.viewContainer, p.orientation === "LANDSCAPE" && { paddingHorizontal: 22, alignSelf: 'center' }]} >

      <View style={styles.containHead}>
        <View style={styles.viewSearch}>
          <Icon name="search" size={20} color="#999" style={{ padding: 7, flex: 1 }} />
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            spellCheck={true}
            value={p.textSearch}
            onChangeText={(text) => searcher(text)}
            placeholder="جستجو غذا و نوشیدنی" style={styles.search}
          />
        </View>

        <View style={{ width: '15%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', marginHorizontal: 4, marginLeft:8, }} >
          <Icon onPress={foodAsc}  size={21} style={{padding:4}} name="arrow-down" color='#555' />
          <View style={{ paddingHorizontal: 6 }} ></View>
          <Icon onPress={foodDesc}  size={21} style={{padding:4}} name="arrow-up" color='#555' />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {!p.current ?
          <Loading />
          :
          <FlatList
          initialNumToRender={3}
            numColumns={numColumns}
            key={numColumns}
            keyExtractor={(f) => f && f._id.toString()}
            data={p.current}
            contentContainerStyle={{ paddingBottom: 55, }}
            renderItem={({ item, index }) => (
              <View
                ref={scrollRef}
                style={[styleScroll, item.num > 0 ? styles.shadowSuccess : styles.shadowDark,
                  { opacity: item.available ? 1 : .4 },{height:180}
                ]}>
                <Pressable style={{height:'55%'}} onPress={() => { p.navigation.navigate("SingleFood", { id: p.route.params.id, id2: item._id }) }} >
                  <FastImage
                    style={[styles.img]}
                    // source={require("../../assets/images/a8.jpg")}
                    source={{
                      uri: `${localhost}/upload/food/${item.imageUrl}`,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </Pressable>
                <View style={styles.subImg} >
                  <Text style={styles.textTitleChild}>{item.title}</Text>
                  <View style={styles.ViewSubItem}>
                    <View style={{ paddingRight: 3, top: 2 }} >
                      <Text style={[{ fontSize: 13.5, textAlign: 'left' }]}>قیمت:{spacePrice(item.price)}</Text>
                      <View style={{ top: 12, flexDirection: 'row', alignSelf: 'flex-end' }} >
                        {item.meanStar >= 5 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 4 && item.meanStar < 5 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 4 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 3 && item.meanStar < 4 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 3 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 2 && item.meanStar < 3 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 2 && <Icon4 name='star' size={17} color='orange' />}
                        {item.meanStar > 1 && item.meanStar < 2 && <Icon4 name='star-half' size={17} color='orange' />}
                        {item.meanStar >= 1 && <Icon4 name='star' size={17} color='orange' />}
                      </View>
                    </View>
                    <View style={[styles.TextPlus, { marginTop: -2 }]} >
                      {
                        item.available ?
                          <View style={[styles.viewIcons, { top: -3, height: '100%', justifyContent: 'space-between' }]}>
                            <Icon size={20} name="plus" style={{ padding: 3 }} onPress={() => {
                              plus(index, item)
                            }}
                              color='blue' />
                            <Icon size={20} name="minus" style={{ padding: 3 }} onPress={() => {
                              p.current[index].num > 0 &&
                                minus(index, item)
                            }
                            } color='red' />
                          </View>
                          :
                          <Text />
                      }
                      <View style={styles.vpls} >
                        {
                          item.available ?
                            <>
                              <Text onPress={() => {
                                p.current[index].num == 0 &&
                                  plus(index, item)
                              }
                              } style={{ top: -6 }}>افزودن</Text>
                              <TextInput editable={false} value={p.allprice?p.current[index] && p.current[index].num.toString() + " " + 'عدد': '0 ' + 'عدد'} style={{ marginTop: 3, paddingVertical: 2.4, alignSelf: 'center', }} />
                            </>
                            :
                            <Text style={{ top: 10, width: 53, alignSelf: 'center', borderWidth: 1, borderColor: 'red', padding: 3, transform: [{ rotate: '-20deg' }] }}>ناموجود</Text>
                        }
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )} />
        }
      </View >
      <View style={{ height: '7%', minHeight: 50, position: 'absolute', bottom: 85, alignItems: 'center', alignSelf: 'center' }} >
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
          />
        }
      </View>
      <Pressable
        onPressIn={() => { p.navigation.navigate(p.token ? "FinallFoodPayment" : "Login", { name: 'ChildFood', price: inputPrice }) }}
        style={[styles.buttomPayment]}>
        <Image style={[styles.imagePayment]} source={require('../../assets/images/a13.jpg')} />
        <View style={styles.ViewPayment}>
          <Text style={styles.titleSubTitle} >مشاهده ی سبد و پرداخت</Text>
          <View style={styles.containSubPrice}>
            <Text style={styles.textPayment}>قیمت کل :</Text>
            <Text style={[styles.smalPrice, { top: 10 }]} >{spacePrice(inputPrice)} تومان</Text>
          </View>
        </View>
      </Pressable>
    </View >
  )
}

export default ChildFood