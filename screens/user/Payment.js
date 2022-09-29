import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import styles from './User.scss';

function Payment(p) {
  return (
    <View style={styles.container2}>
      <WebView style={styles.container2} source={{ uri: p.route.params.uri }} />
    </View>
  )
}
export default Payment;
