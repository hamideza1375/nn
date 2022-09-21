import React from 'react';
import { Div, H1 } from './components/Html'
import Alert from './states/alert'

function App() {
  return (
    <Div >
      <H1 onClick={() => {
        Alert.alert(
          "Alert Title",
          "My Alert Msg",
          [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
            { text: "Ok", onPress: () => console.log("OK Pressed") }
          ]
        )
      }} >hbhbvhbhb</H1>
    </Div>
  )
}



export default App;