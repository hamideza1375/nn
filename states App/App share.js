import React from 'react';
import {Button} from './components/Html';
import share from './states/share'

function App() {
  return (
    <>
      <Button onClick={() => {
        share('http://192.168.42.34/upload/_dv2jBs-b_847B5F59-1878-42ED-ADC0-0858D4361B15.jpg', 'http://192.168.42.34/upload/_dv2jBs-b_847B5F59-1878-42ED-ADC0-0858D4361B15.jpg')
      }}>click</Button>
    </>
  );
}
export default App;

