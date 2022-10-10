import React from 'react'
import { Text, View, Image } from 'react-native'
import Drawer from '../../Components/Drawer'
import {Button} from '../../Components/Html'
import styles from './User.scss';
import B_icon from '../../Components/B_icon';
import { userState } from '../../state/userState'
import { _scrollView } from '../food/Home'
import {localhost} from '../../utils/axios/axios'

const Profile = (p) => {
  const _user = new userState(p)
  _user._tokenValue()
  _user.profile()
  const submit = (roomNumber) => p.navigation.navigate('Chat', { roomNumber })
  const imgPicker = () => _user.imagePicker()
  return (
        <View style={{ flex: 1, backgroundColor: '#bbf' }} >

          <View style={[styles.headProfile, { height: 167 }]}>
            <View style={styles.viewUserImage}>
              <View onStartShouldSetResponder={() => { imgPicker() }} style={styles.containImage}>
                {p.imageProfile ?
                  <Image source={{ uri: `${localhost}/upload/profile/${p.imageProfile}` }} style={styles.profileImage} />
                  :
                  <Image source={require("../../assets/images/a8.jpg")} style={styles.profileImage} />
                }
                <View style={styles.profileSubText}>
                  <Text style={styles.textUserImage}>{p.tokenValue?.fullname}</Text>
                </View>
              </View>
            </View>
            <View style={{ width: '70%' }} >
              <View style={styles.containHeaderInfo} >
                <B_icon icon='comment-slash' size={.85} bgcolor='silver' />
                <B_icon icon='comment' size={.85} bgcolor='silver' />
                <B_icon icon='search' size={.85} bgcolor='silver' />
              </View>
            </View>
          </View>
          <View style={{ flexGrow: 1 }} >
            <View style={styles.hr} />
            <_scrollView >
              <View style={styles.bodyProfile} >
                <View onStartShouldSetResponder={() =>  submit('room8')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text style={{ fontSize: 17 }} >انتقادات و پیشنهادات</Text>
                </View>
                <View onStartShouldSetResponder={() => submit('room7')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text style={{ fontSize: 17 }} >ارتباط با ادمین </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <B_icon icon='comment' size={.6} bgcolor='#444' border='#333' />
                  <Text /* onPress={() => submit('room7')} */ style={{ fontSize: 17 }} >گفتگو</Text>
                </View>
                {p.tokenValue.isAdmin === 'chief' ? <Button style={styles.btnPanel} onPress={() => p.navigation.navigate("AdminTitleAllFood")} >پنل ادمین</Button> : <Text />}
              </View>
            </_scrollView>
          </View>

        </View>
  )
}
export default Profile
