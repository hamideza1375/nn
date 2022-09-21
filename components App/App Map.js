import React from 'react'
import { View } from 'react-native'
import Map from './components/Map';

const App = () => {
  return (
      <Map
        coordinate={{
          latitude: 36.224174234928924,
          longitude: 57.69491965736432,
          latitudeDelta: 0.004,
          longitudeDelta: 0.00800
        }}
        showsUserLocation={true}
        onPress={()=>{}}
        
        marker
        draggable={true}
        onDragEnd={() => { }}
        onSelect={() => { }}
      />
  );
}


export default App