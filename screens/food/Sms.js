import React from 'react'
import { View, Button, TextInput } from 'react-native'
import Drawer from '../../Components/Drawer'
import BottomTab from '../../Components/BottomTab'
import { codeAction, smsAction } from '../../state/userState'
import { bottomProfile, drawer } from '../../states/top-bottom'
import styles from "./Food.scss"

const Sms = (p) => {
  const bottom = bottomProfile(p)
  const handlePhone = () => smsAction()
  const handleCode = () => codeAction()
  return (
      <Drawer route={p.route.name} route2={drawer} >
    <BottomTab route={p.route.name} route2={bottom} >
        <View style={styles.viewCnt}>
          <View style={styles.viewInput}>
            <TextInput value={p.myPhone} onChangeText={(text) => p.setMyPhone(text)} style={{ borderWidth: 1 }} placeholder="phone" />
            <Button onPress={handlePhone} title="ارسال" />
          </View>
          <View style={styles.viewInput}>
            <TextInput value={p.myCode} onChangeText={(text) => p.setMyCode(text)} style={{ borderWidth: 1 }} placeholder="code" />
            <Button onPress={handleCode} title="ارسال" />
          </View>
        </View>
    </BottomTab>
      </Drawer>
  )
}
export default Sms
