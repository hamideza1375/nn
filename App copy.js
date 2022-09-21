import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import Map from './components/Map';


const App = () => {


  return (
    <View flex={1} >

      <Map
        region={{
          latitude: 36.224174234928924,
          longitude: 57.69491965736432,
          latitudeDelta: 0.002,
          longitudeDelta: 0.00400,
        }}
        coordinate={{
          latitude: 36.224174234928924,
          longitude: 57.69491965736432,
          latitudeDelta: 0.002,
          longitudeDelta: 0.00400,
        }}
        showsUserLocation={true}
        onPress={()=>{}}
        
        marker
        draggable={true}
        onDragEnd={() => { }}
        onSelect={() => { }}
        />
      
        </View>
  );
}


export default App