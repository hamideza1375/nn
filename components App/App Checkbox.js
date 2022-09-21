import React, {useState} from 'react';
import { View } from 'react-native';
import {CheckBox} from './components/Html';



function App() {
  const [show, setShow] = useState(false)


  return (
      <View style={{ flex:1,margin:100,backgroundColor: 'silver', alignItems:'center', justifyContent:'center' }} >
        <CheckBox show={show} setShow={setShow} style={{ margin: 4 }} />
      </View>
  )
}



export default App;