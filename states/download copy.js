import { PermissionsAndroid } from 'react-native';
import * as RNFS from 'react-native-fs';
import {create} from './notification'

 async function download(filename) {

  let prgs;
  if (Platform.OS === 'android') {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
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
      RNFS.downloadFile({
        fromUrl: filename,
        toFile: `${RNFS.DownloadDirectoryPath}/${Math.random()}.mp4`,
        discretionary: true,
        progress: (res) => {
          let progressPercent = (res.bytesWritten/ res.contentLength*100).toString()
          prgs = progressPercent.slice(0, 2)
          if (prgs >= '98' || prgs == '10') prgs = '100'
          console.log(prgs)
        },
      }).promise
        .then(() => {
          create(filename, prgs + '%')

        })
        .catch((err) => console.log(err))
    }
  }
}


export default download