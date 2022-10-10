import React from 'react';
import Form from '../../Components/Form'
import { ScrollView, Text, TextInput, View } from 'react-native';
import { adminState } from '../../state/adminState';

export default DeleteAdmin = (p) => {
  const _admin = new adminState(p)
  const sendDeleteAdmin = () => _admin.deleteAdmin()
  _admin.getAlluserAdmin()

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