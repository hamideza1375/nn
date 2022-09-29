import React from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity} from 'react-native'
import BottomTab from '../../Components/BottomTab'
import { bottomProfile } from '../../states/top-bottom';
import { userState } from '../../state/userState';
import { foodState } from '../../state/foodState';
import styles from "./Food.scss"
import { localhost } from '../../services/host.json'
import Loading from '../../Components/Loading'
import {Button} from '../../Components/Html';

 export const _scrollView = (p) => {
   const ChangeStyle = (p.width > p.height) ? { marginBottom: 10, flex: 1 } : { flex: 1 }
   return <ScrollView style={[ChangeStyle]} {...p} contentContainerStyle={{ flexGrow: 1, minWidth: '100%' }} >{p.children}</ScrollView>
 }

const Home = (p) => {

  const bottom = bottomProfile(p)
  const _food = new foodState(p)
  _food.getTitleFood(p.show)
  _food.backHandler()
  _food.setOrientation()
  _user = new userState(p)
  _user._token()
  _user._tokenValue()

  return (
    <BottomTab route={p.route.name} route2={bottom} >
      <_scrollView >
        <View style={styles.container}>
          <Image source={require("../../assets/images/iconpiza.png")} style={styles.imageLogo} />
          <View style={styles.containerFood}>
            {!p.foods.length ?
              <Loading style={{ top: 70 }} animating={!p.foods.length ? true : false} />
              :
              p.tokenValue.isAdmin !== 'courier' ?
                p.foods.map((food) => (
                  <TouchableOpacity key={food._id} style={[styles.pressOpacity, /* {display:tokenValue.isAdmin ? 'flex' : 'none' } */]}
                    onPress={() => { p.navigation.navigate(`ChildFood`, { id: food._id, title: food.title }); p.setchangeFood(!p.changeFood) }} >
                    <View style={styles.containImageShadow}>
                      <Image source={{ uri: `${localhost}/upload/food/${food.imageUrl}` }} style={[styles.imageFood]} />
                    </View>
                    <Text style={[styles.textTitle]}>{food.title}</Text>
                  </TouchableOpacity>
                ))
                :
                < >
                <View justifyContent='center' height={'55%'} width={100} alignSelf={'center'} >
                  <Button onPress={() => p.navigation.navigate("Address")} >address</Button>
                </View>
                <Text outline bgcolor='red' style={{width:100, alignSelf:'center',marginTop:'auto',textAlign:'center', color:'red', position:'absolute', bottom:15}} onPress={() =>p.navigation.navigate("Logout") }>logout</Text>
                </>
            }
          </View>
        </View>
      </_scrollView>
    </BottomTab>
  )
}
export default Home