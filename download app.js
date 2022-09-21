import React, { useState } from 'react';
import {Button} from './components/Html';
import download from './states/download'

function App() {
  const [url] = useState('https://www.w3schools.com/html/pic_trulli.jpg')
  const [filename] = useState('pic_trulli.jpg')
  return (
    <>
      <Button mt={77} onClick={() => {
        download(url,filename,(process)=>{ process && console.log(process);})
       
      }} >bynufd</Button>
    </>
  )
}



export default App;
