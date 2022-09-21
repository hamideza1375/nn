import React from 'react';
import {Button} from './components/Html';
import {create, close} from './states/notification';
function App() {
  return (
    <>
      <Button onClick={() => { create('سلام', 'لذراعدئهئهئ', require('./assets/a1.png')) }} >create</Button>
      <Button onClick={() => { close('del') }} >close</Button>
    </>
  )
}
export default App;
