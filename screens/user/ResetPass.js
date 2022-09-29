import React from 'react'
import { View } from 'react-native'
import Form from '../../Components/Form'
import { userState } from '../../state/userState'

export const ResetPass = (p) => {
   const _user = new userState(p)
   const resetpassword =()=> _user.resetpassword()
  return (
    // <WebView style={styles.container2} source={{ uri: props.route.params.uri }} />
    <View style={{ flex: 1, margin: 14, backgroundColor: "#fff" }}>
      <View style={{ borderRadius: 4, borderColor: 'silver', borderWidth: 1, padding: 12, flex: 1 }}>
        <Form p cp {...p} onPress={resetpassword} >
        </Form>
      </View>
    </View>
  )
}
export default ResetPass