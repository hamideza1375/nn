import React from 'react';
import { I18nManager } from 'react-native';
import ToastProvider, { Toast } from './states/toast'
import {Button} from './components/Html'

I18nManager.forceRTL(true)
I18nManager.allowRTL(false)
I18nManager.isRTL = true

function App() {
  let toast = new Toast()
  return (
    <>
      <Button onClick={() => { toast.show('عنوان', 'توضیحات') }}>show</Button>
      
      <Button onClick={() => { toast.success('عنوان', 'توضیحات') }}>toast</Button>
      
      <Button onClick={() => { toast.error('عنوان', 'توضیحات') }}>error</Button>
      
      <Button onClick={() => { toast.info('عنوان', 'توضیحات') }}>info</Button>
      
      <Button onClick={() => { toast.warning('عنوان', 'توضیحات') }}>warning</Button>
      
      <ToastProvider />
    </>
  );
}

export default App;

