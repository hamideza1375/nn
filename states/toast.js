import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { Span, P } from "../components/Html";
let list = []
let toastProperties;

export function Toast() {
  const [lists, setlist] = useState(false)

  this.show = (title, description) => {
    setlist(!lists)
    toastProperties = {
      id: list.length ? list[list.length - 1].id + 1 : 1,
      id2: list.length ? list[list.length - 1].id + 1 : 1,
      title,
      description,
      backgroundColor: '#555'
    }
    list = [...list, toastProperties]
  };

  this.success = (title, description) => {
    setlist(!lists)
    toastProperties = {
      id: list.length ? list[list.length - 1].id + 1 : 1,
      id2: list.length ? list[list.length - 1].id + 1 : 1,
      title,
      description,
      backgroundColor: '#5cb85c'
    }
    list = [...list, toastProperties]
  };


  this.error = (title, description) => {
    setlist(!lists)
    toastProperties = {
      id: list.length ? list[list.length - 1].id + 1 : 1,
      id2: list.length ? list[list.length - 1].id + 1 : 1,
      title,
      description,
      backgroundColor: '#d9534f'
    }
    list = [...list, toastProperties]
  };

  this.info = (title, description) => {
    setlist(!lists)
    toastProperties = {
      id: list.length ? list[list.length - 1].id + 1 : 1,
      id2: list.length ? list[list.length - 1].id + 1 : 1,
      title,
      description,
      backgroundColor: '#5bc0de'
    }
    list = [...list, toastProperties]
  };

  this.warning = (title, description) => {
    setlist(!lists)
    toastProperties = {
      id: list.length ? list[list.length - 1].id + 1 : 1,
      id2: list.length ? list[list.length - 1].id + 1 : 1,
      title,
      description,
      backgroundColor: '#f0ad4e'
    }
    list = [...list, toastProperties]
  };

}








const shadow = {
  elevation: 15,
  shadowColor: 'red',
  shadowOpacity: .2,
  shadowRadius: 3,
  shadowOffset: {
    height: -2,
  },
}



const ToastProvider = () => {

  const [_list, set_list] = useState([])

  useEffect(() => {
    set_list(list)
  }, [list])


  const fadeAnim = useRef(new Animated.Value(-270)).current;

  const start = () => {
    Animated.timing(fadeAnim, {
      toValue: 12,
      duration: 100,
      useNativeDriver: false
    }).start();
  };

  return (
      <>
        {
          list.map((toast, i) => (
            <Animated.View key={i}
              ref={() => { if (i === 0) { fadeAnim.setValue(-270) } }}
              onLayout={() => { start(); }}
              style={[{ ...shadow }, {
                position: 'absolute', top: i * 120, right: fadeAnim, width: 350, height: 95, maxWidth: '75%',
                display: 'flex',
                marginTop: 12, backgroundColor: toast.backgroundColor, borderRadius: 5,
              }]}>
              <Span style={{ paddingHorizontal: 14, paddingTop: 8 }} >
                <P style={{ padding:3,color: 'white', position: 'absolute', top: 1, alignSelf: 'flex-end' }}
                  onClick={() => { let filter = _list.filter((l) => l.id !== toast.id); set_list(filter); list = filter }}>X</P>
                <P style={{ color: 'white', textAlign: 'right', marginLeft: 'auto', paddingBottom: 2 }} >{toast.title}</P>
                <P style={{ color: 'white', textAlign: 'right', marginLeft: 'auto', fontSize: 14, fontWeight: '200' }} >{toast.description}</P>
              </Span>
            </Animated.View>
          ))
        }
      </>
  )
}

export default ToastProvider
