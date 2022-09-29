import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import RNLocation from 'react-native-location';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Drawer from '../../Components/Drawer'
import BottomTab from '../../Components/BottomTab'
import { userState } from '../../state/userState';
import { drawer, bottomProfile } from '../../states/top-bottom';
import styles from './User.scss';
import Toast from '../../Components/Toast';
import { Button } from '../../Components/Html';
import { foodState } from '../../state/foodState';

const Location = (p) => {
  _user = new userState(p)
  const _food = new foodState(p)
  _user.reversAction()
  const rum = () => p.search1 && _user.geoCodeAction()
  const uy = (e) => _user.geoCodeAction2(e)

  const [show, setshow] = useState(true)
  const [coordinate, setcoordinate] = useState({
    latitude: 36.224174234928924,
    longitude: 57.69491965736432,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  })

  const bottom = bottomProfile(p)
  RNLocation.configure({ distanceFilter: 100 })
  const myRf = useRef()

  const lctn = (
    < >
      <View style={styles.containSearch}>
        <View style={styles.viewSearch}>
          <Icon
            onPress={() => { rum(); setshow(true); myRf.current && myRf.current.setNativeProps({ text: '' }); myRf.current.blur() }}
            name="search" size={20} color="#999" style={{ flex: 1, padding: 10 }} />
          <TextInput
            onSubmitEditing={() => { rum(); setshow(true); myRf.current && myRf.current.setNativeProps({ text: '' }); myRf.current.blur() }}
            textContentType="fullStreetAddress"
            autoComplete="street-address"
            ref={myRf}
            // value={search1}
            onChangeText={p.setSearch1}
            placeholder="جستجو"
            style={styles.search}
          />
        </View>
      </View>

      <View style={{ flex: 1 }} >
        <View style={{ flex: 1 }}>
          <View style={[styles.container, s.cnt]}>
            {p.markers?.latitude && p.markers.longitude &&
              <MapView
                region={coordinate}
                showsUserLocation={true}
                style={[styles.map, s.mp]}
                onRegionChange={(e) => { uy(e);}}

              >
                <Marker
                  draggable={true}
                  coordinate={p.markers}
                  // coordinate={props.markers}
                  onDragEnd={(e) => { uy(e); setshow(true) }}
                  onPress={() => { setshow(!show) }}
                />
              </MapView>}


            {show &&
              <View style={styles.containSubtitle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                  {
                    p.tokenValue.isAdmin !== 'courier' &&
                    <>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: .5 }} >
                        <View style={{ flexDirection: 'row', alignContent: 'center' }} >
                          <Text style={{ marginRight: 2 }}>پلاک:</Text>
                          <TextInput value={p.plaque} keyboardType={'numeric'} onChangeText={(text) => p.setplaque(text)} style={{ width: 35, padding: 0, height: 30, borderWidth: .2, textAlign: 'center' }} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
                          <Text style={{ marginRight: 2 }}>طبقه:</Text>
                          <TextInput value={p.floor} keyboardType={'numeric'} onChangeText={(text) => p.setfloor(text)} style={{ width: 35, padding: 0, height: 30, borderWidth: .2, textAlign: 'center' }} />
                        </View>

                      </View>

                      <View style={{ flex: .4 }} >
                        <Button onPress={() => { (!p.plaque && !p.floor) && Toast('کادر پلاک و طبقه را پر کنید'); !p.revers.formattedAddress && Toast("اتصال اینترنتتان را چک کنید"); (p.plaque && p.floor && p.revers.formattedAddress) && _food.payment() }}  >صفحه ی پرداخت</Button>
                      </View>
                    </>
                  }

                </View>
                {(p.revers && p.revers.streetName != undefined) ? <Text style={{ margin: 3 }} /> : null}
                <Text style={styles.textSubtitle}>{p.revers && p.revers.formattedAddress?.split(",")[0] + p.revers.formattedAddress?.split(",")[1]}</Text>
              </View>
            }
          </View >
        </View>
      </View>
    </>
  )


  return (
    <BottomTab route={p.route.name} route2={bottom} >
      {p.tokenValue.isAdmin === 'courier' ?
        <>
          {lctn}
        </>
        :

        <Drawer route={p.route.name} route2={drawer} >
          {lctn}
        </Drawer>
      }
    </BottomTab>
  );
}

const s = StyleSheet.create({
  cnt: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mp: {
    ...StyleSheet.absoluteFillObject,
  },
});
export default Location