import React from 'react';
import Form from '../../Components/Form'
import { userState } from '../../state/userState';
import { ScrollView, Text, TextInput, View } from 'react-native';

export default DeleteAdmin = (p) => {
  const _user = new userState(p)
  const sendDeleteAdmin = () => _user.deleteAdmin()
  _user.getAlluserAdmin()

  return (
    <ScrollView>
      <Form ph {...p} onPress={() => sendDeleteAdmin()} />
       { p.admin.length ?
        <View style={{alignItems:'center',justifyContent:'center',alignSelf:'center',marginTop:15, width:220, height:80,backgroundColor:'silver'}} >
          {p.admin.map((adm,i)=>(
            <View key={i} >
            <Text style={{marginVertical:5 }}>name: {adm.fullname}</Text>
            <View flexDirection={'row-reverse'} ><Text style={{marginVertical:5 }}>phone:</Text><TextInput caretHidden={true} showSoftInputOnFocus={false}  >{adm.phone}</TextInput></View>
            </View>
          ))}
        </View>:
        <></>}
    </ScrollView>
  )
}