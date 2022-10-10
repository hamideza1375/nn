import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react'
import { Platform, Animated, Text, Pressable, View } from 'react-native';
import TopTab from './Components/TopTab';
import BottomTab from './Components/BottomTab';
import Drawer from './Components/Drawer';

export const Layout = (props) => {
  useFocusEffect(useCallback(() => {
    return () => {
      if (props._key === '100') { props.setnavigateProfile(props.route.name) }
      if (props._key === '120') { props.setnavigateUser(props.route.name) }
    }
  }, []))
  const drawer = ['FinallFoodPayment', 'Profile', 'Logout']
  const topUser = ['Register', 'Login']
  let bottom = (props.tokenValue.isAdmin !== 'courier') ?
    ([{ title: 'Home', icon: 'home', navigate: null }, props.token ? { title: (props._key == '100') ? props.route.name : 'Profile', icon: 'user', navigate: props.navigateProfile } : { title: (props._key == '120') ? props.route.name : 'Register', icon: 'user', navigate: props.navigateUser }])
    :
    (props.token ? [] : [{ title: 'Home', icon: 'home', navigate: null }, { title: (props._key == '120') ? props.route.name : 'Register', icon: 'user', navigate: props.navigateUser }])

  return (
    props.route.name === 'Profile' || props.route.name === 'FinallFoodPayment' | props.route.name === 'Login' | props.route.name === 'Register' | props.route.name === 'Home' ?
      <Animated.View style={[
        (Platform.OS === 'ios') ?
          props.width < props.height ?
            { paddingTop: 40, flex: 1, backgroundColor: props.route.name === 'Profile' ? '#bbf' : '#fff' }
            :
            { paddingHorizontal: 40 / 1.5, paddingTop: 10, flex: 1, backgroundColor: props.route.name === 'Profile' ? '#bbf' : '#fff' }
          :
          { flex: 1 }]} >

        {
          props.route.name === 'Profile' &&
          <Drawer name={'Profile'} group={drawer} bgcolor="#bbf">
            <BottomTab name={'Profile'} group={bottom} bgcolor="#bbf" >
              {props.children}
            </BottomTab>
          </Drawer>
          ||
          props.route.name === 'FinallFoodPayment' &&
          <Drawer name={'FinallFoodPayment'} group={drawer} >
            <BottomTab name={'FinallFoodPayment'} group={bottom} >
              {props.children}
            </BottomTab>
          </Drawer>
          ||
          props.route.name === 'Login' &&
          <BottomTab name={'Login'} group={bottom} >
            <TopTab name={'Login'} group={topUser} >
              {props.children}
            </TopTab>
          </BottomTab>
          ||
          props.route.name === 'Register' &&
          <BottomTab name={'Register'} group={bottom} >
            <TopTab name={'Register'} group={topUser} >
              {props.children}
            </TopTab>
          </BottomTab>
          ||
          props.route.name === 'Home' &&
          <BottomTab name={'Home'} group={bottom} >
            {props.children}
          </BottomTab>
        ||
        props.children
        }
      </Animated.View>
      :
      <View flex={1} >
        {props.children}
      </View>
  )
}

export const header = () => {
  const navigation = useNavigation();
  return (
    <Pressable >
      <Text onPress={() => navigation.goBack()}
        style={{ fontSize: 32, marginTop: -5, paddingHorizontal: 5, paddingVertical: 2.5, flexGrow: 1 }}>
        {`»`}
      </Text>
    </Pressable>
  );
};
// getCurrentRoute
