import React, { useCallback } from 'react'
import { View, Text, TextInput, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Button, P, Table } from '../../Components/Html';
import { foodState } from '../../state/foodState';
import Loading from '../../Components/Loading'
import styles from "./Food.scss"
import {localhost} from '../../utils/axios/axios'
import spacePrice from '../../utils/spacePrice';
import GetLocation from 'react-native-get-location';
import { useFocusEffect } from '@react-navigation/native';

const FinallFoodPayment = (p) => {
  const inputPrice = `${p.allprice ? p.allprice : '0'}`
  const allfood = p.allfood.filter((a) => a.num > 0)
  const _food = new foodState(p)
  _food.allPrice()
  const plus = (index, item) => _food.plustNum(index, item)
  const minus = (index, item) => _food.minusNum(index, item)
  const deleteAsyncStorage = () => _food.deleteStorage()
  

  useFocusEffect(useCallback(() => {

      GetLocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 15000,
      })
        .then(location => {
          p.setregion({
            lat: location.latitude,
            lng: location.longitude,
          })

          console.log(location);

        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
  }, []))


  return (
        <View style={styles.viewHead}>
          <View style={styles.viewOne}>
            <View style={styles.viewConseal} >
              <Button disabled={allfood.length ? false : true} bgcolor="yellow" style={styles.btnFinal} onPress={deleteAsyncStorage} >لغو سفارش</Button>
            </View>
            <View style={{ width: '96%', alignSelf: 'center' }} >
              {!allfood.length ?
                <Loading time={500} color={'red'} animating={allfood.length ? false : true} />
                :
                <ScrollView style={styles.scrollTable} contentContainerStyle={{ flexGrow: 1, paddingBottom: 55 }} >
                  <Table
                    color={['#555', '#656565', 'white']}
                    fontSize={14}
                    header={['جمع', 'عنوان']}
                    body={['total', 'title']}
                    object={allfood}
                    AllPrice={spacePrice}
                  />
                  <View style={{}}>
                    <P fontSize={13.5} border={[.5]} style={{ height: 33, flex: 1, textAlign: 'center', alignSelf: 'center', width: '99%' }} >قیمت کل: </P>
                    <P fontSize={13.5} border={[.5]} style={{ height: 33, flex: 1, textAlign: 'center', alignSelf: 'center', width: '99%' }} >{spacePrice(inputPrice, null)} ت</P>
                  </View>
                </ScrollView>
              }
            </View>
          </View>
          <View style={styles.viewPayment}>
            <View style={styles.viewPayTwo}>
              <Button disabled={allfood.length ? false : true} bgcolor="yellow"
                style={styles.btnFinal}
                onPress={() => { p.navigation.navigate("Location") }}
              >
                پرداخت
              </Button>
            </View>
            <View style={{ flex: 1, paddingRight: 10 }}>
              {!allfood.length ?
                <Loading time={500} color={'red'} animating={allfood.length ? false : true} />
                :
                <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 45 }]} >
                  {allfood.map((item, index) => (
                    <View key={item._id} style={[styles.viewKey]}>
                      <ImageBackground style={styles.imageFinalFood} source={{ uri: `${localhost}/upload/food/${item.imageUrl}` }} >
                        <Text style={styles.textTitleFinal}>{item.title}</Text>
                      </ImageBackground>
                      <View style={styles.containButtomImage} >
                        <View style={styles.viewPlusMinus}>
                          <Icon style={{ padding: 6 }} size={19} name="plus" onPress={() => plus(index, item)} color='blue' />
                          <View style={{ paddingVertical: 4 }} />
                          <Icon style={{ padding: 6 }} size={19} name="minus" color='red' onPress={() => item.num > 0 && minus(index, item)} />
                        </View>
                        <View style={[styles.viewInputNum]} >
                          <TextInput keyboardType='numeric' style={[styles.inputNum, { padding: 3 }]} value={allfood[index].num.toString()} />
                        </View>
                        <View style={styles.textPrice}>
                          <Text style={{ textAlign: 'left' }} >قیمت:</Text>
                          <Text style={{ fontSize: 13 }} >{spacePrice(item.price, null)} <Text style={{ fontSize: 12 }}>ت</Text></Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              }
            </View>
            <View>
            </View>
          </View>
        </View >
  )
}
export default FinallFoodPayment
