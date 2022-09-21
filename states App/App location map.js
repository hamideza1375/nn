import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import Map from './components/Map';
import GetLocation from 'react-native-get-location'


const App = () => {

  const [location, setLocation] = useState(false)
  const [region, setregion] = useState({
    latitude: 36.224174234928924,
    longitude: 57.69491965736432,
    latitudeDelta: 0.002,
    longitudeDelta: 0.00400,
  })

     useEffect(() => {

      GetLocation.getCurrentPosition({
         enableHighAccuracy: false,
         timeout: 15000,
      })
         .then(location => {
            console.log(region.latitude);
            setregion({
              latitude:location.latitude,
              longitude:location.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.00400,
            })
         })
         .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
         })

   }, [])

  return (
    <View flex={1} >

      <Map
        region={region}
        coordinate={region}
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