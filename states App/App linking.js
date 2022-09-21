
import React from 'react'
import { View,Text } from 'react-native'
import linking  from './states/linking'

function App() {
  return (
    <View  >
      <Text onPress={()=>linking('http://github.com')} >link</Text>
    </View>
  )
}

export default App