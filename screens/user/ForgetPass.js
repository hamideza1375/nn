import React from 'react'
import { View, Text } from 'react-native'
import { userState } from '../../state/userState'
import styles from "../food/Food.scss"
import {Input} from '../../Components/Html'
import {Button} from '../../Components/Html'

const Sms = (p) => {
  const _user = new userState(p)
  _user.setreplaceInput()
  const handlePhone = () => _user.smsAction()
  const handleCode = () => _user.codeAction()

  return (
    <View style={{ flex: 1, margin: 14, backgroundColor: "#fff" }}>
      <View style={{ borderRadius: 4, borderColor: 'silver', borderWidth: 1, padding: 12, flex: 1 }}>
        <View style={styles.viewCnt}>
          {!p.replaceInput ?
            <Text style={{alignSelf:'center'}} >شماره تلفن خودرا وارد کنید</Text>
            :
            <Text style={{alignSelf:'center'}}>کد ارسال شده را وارد کنید</Text>
          }
          {!p.replaceInput ? <View style={styles.viewInput}>
            <Input value={p.myPhone} onChangeText={(text) => p.setmyPhone(text)} style={{ width: '100%' }} p="شماره تلفن" />
            <Button outline style={{width:165, marginTop:20}} onPress={handlePhone} >ارسال</Button>
          </View>
            :
            <View style={styles.viewInput}>
              <Input value={p.myCode} onChangeText={(text) => p.setmyCode(text)} style={{  width: '100%' }} p="ارسال کد" />
              <Button outline style={{width:65, marginTop:10}} onPress={handleCode} >ارسال</Button>
            </View>
          }
        </View>
      </View>
    </View>
  )
}
export default Sms
