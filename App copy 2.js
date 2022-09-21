import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { Button } from './components/Html';
import download from './states/download'



function App() {

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.MANAGE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: '',
            message: '',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        );
        if (permission === 'denied') return;
        if (permission === 'granted') {

        //  alert('yes')
        }
      }

    

   


    })()
  }, [])


  return (
    <>
      <Button onClick={() => {
        download('https://s32.namasha.com/videos/dl/7374690107-144p/تحلیل-تکنیکال-سولانا-آپدیت-9-شهریور-1401-144p.mp4')
      }} >bynufd</Button>
    </>
  )
}



export default App;
