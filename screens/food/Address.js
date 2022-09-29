import React from 'react'
import { Text, View, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from '../../Components/Html';
import { foodState } from '../../state/foodState';
import styles from './Food.scss'

const Address = (p) => {
  const _food = new foodState(p)
  _food.getAllAddress()
  const deleteAddress = (_id) => _food.deleteAddress(_id)
  
  return (
    <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#eee' }} >
      <View style={styles.viewSearch}>
        <Icon name="search" size={20} color="#999" style={{ padding: 7, flex: 1 }} />
        <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        spellCheck={true}
          value={p.textSearch}
          onChangeText={(text) => {
            p.settextSearch(text)
            const fd = p._address.filter(f => f.fullname.includes(text))
            p.setallAddress(fd)
          }}
          placeholder="جستجو غذا و نوشیدنی" style={styles.search}
        />
      </View>

      {
        p.allAddress?.length ? p.allAddress.map((address, i) => (
          address.del !== p.tokenValue.userId &&
          <View key={address._id} style={{
            alignSelf: 'center',
            borderWidth: .3,
            width: '90%',
            marginVertical: 15,
            padding: 15,
            backgroundColor: '#f5f5f5',
            borderRadius: 4
          }}>
            <View style={{ borderBottomWidth: .2, paddingBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }} >
              <Text style={{ textDecorationLine: p.addressMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(address._id) ? '#aaa' : 'black' }}><Text style={[{
                fontWeight: 'bold',
                textAlign: 'left',
              }]} >نام: </Text>{address.fullname}</Text>
              <View flexDirection={'row'} ><Text style={{ fontWeight: 'bold', textAlign: 'left', textDecorationLine: p.addressMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(address._id) ? '#aaa' : 'black', }} >شماره تلفن: </Text><TextInput showSoftInputOnFocus={false} dataDetectorTypes={'phoneNumber'} caretHidden={true} /* autoComplete={tel} */ style={{ textDecorationLine: p.addressMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(address._id) ? '#aaa' : 'black', padding: 0, height: 20, }} >{address.phone}</TextInput></View>
            </View>
            <View style={{ borderBottomWidth: .2, padding: 15, width: '100%' }} >
              <Text  ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >آدرس: </Text>{address.formattedAddress?.split(",")[0] + address.formattedAddress?.split(",")[1]} , {address.streetName}</Text>
            </View>
            <View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
              <Text style={{ textDecorationLine: p.addressMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(address._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >پلاک: </Text>{address.floor}</Text>
              <Text style={{ textDecorationLine: p.addressMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(address._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >طبقه: </Text>{address.plaque}</Text>
              <Text style={{ textDecorationLine: p.addressMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(address._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >شماره: </Text>{address.id}</Text>
            </View>
            <View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
              <Text style={{ textDecorationLine: p.addressMap.get(address._id) ? 'line-through' : 'none', textDecorationStyle: 'solid', color: p.addressMap.get(address._id) ? '#aaa' : 'black' }} ><Text style={{ fontWeight: 'bold' }} >قیمت: </Text>{_food.AllPrice(address.price)}</Text>
              <Text style={{ color: '#ababab', }}>{address.createdAt.split("T")[1].split(".")[0]}</Text>
            </View>
            <View style={{ paddingTop: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-around', }} >
              <Button outline bgcolor='blue' style={{ backgroundColor: '#f7f7f7', height: 30 }}
                onPress={() => p.navigation.navigate('Location', { origin: address.origin })} >نمایش</Button>
              <Button outline bgcolor={!p.addressMap.get(address._id) ? 'green' : 'orange'} style={{ backgroundColor: '#f7f7f7', height: 30 }} onPress={() => { !p.addressMap.get(address._id) ? p.addressMap.set(address._id, address._id) : p.addressMap.delete(address._id); p.setchange(!p.change); }} > {!p.addressMap.get(address._id) ? 'خانده شده ' : 'خانده نشده'}</Button>
              <Button outline bgcolor='red' style={{ backgroundColor: '#f7f7f7', height: 30 }} onPress={() => deleteAddress(address._id)} >حذف</Button>
            </View>
          </View>
        )
        ) : <></>
      }
    </ScrollView>
  )
}

export default Address