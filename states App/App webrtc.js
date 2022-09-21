import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, RTCView } from './states/webrtc';


const App = () => {
  const [user, setuser] = useState([])


  useEffect(() => {
    mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => {
        setuser(user => user.concat({ id: 1, stream }))
      })
  }, []);



  return (
    <View style={{ height: '100%', flexDirection: 'row' }} >
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >
          {user.map((user, i) => (
            <View key={i} style={[{ flexGrow: 1, backgroundColor: 'silver', borderWidth: .1 }]}>
              {user.stream && <RTCView streamURL={user.stream} objectFit={'cover'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </View>
          ))}
        </View>
    </View>
  )
}
export default App