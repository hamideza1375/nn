import React from 'react'
import { I18nManager,DevSettings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';

I18nManager.forceRTL(true)
I18nManager.allowRTL(true)


// I18nManager.forceRTL(true) rtl for ios
// I18nManager.allowRTL(true) rtl android

// if (I18nManager.isRTL === false) {
//   DevSettings.reload()
// }

console.disableYellowBox = true

const App2 = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

export default App2;




// import React from 'react'
// import { Platform, View } from 'react-native';
// import {WebView} from 'react-native-webview';


// console.disableYellowBox = true

// const App2 = () => {
//   return (
//     <View marginTop={Platform.OS === 'ios'? 40:0}  flex={1}>
//       <WebView source={{uri:'http://192.168.42.42/map'}} />
//     </View>
//   )
// }

// export default App2;



// import React from 'react';
// import ToastProvider, { Toast } from './utils/toast'
// import {Button} from './Components/Html'
// import { View, I18nManager } from 'react-native';

// I18nManager.forceRTL(false)
// I18nManager.allowRTL(true)

// function App2() {
//   let toast = new Toast()
//   return (
//     <View flex={1} top={35} >
//       <Button onClick={() => { toast.show('عنوان', 'توضیحات') }}>show</Button>
      
//       <Button onClick={() => { toast.success('عنوان', 'توضیحات') }}>toast</Button>
      
//       <Button onClick={() => { toast.error('عنوان', 'توضیحات') }}>error</Button>
      
//       <Button onClick={() => { toast.info('عنوان', 'توضیحات') }}>info</Button>
      
//       <Button onClick={() => { toast.warning('عنوان', 'توضیحات') }}>warning</Button>
      
//       <ToastProvider />
//     </View>
//   );
// }

// export default App2;

