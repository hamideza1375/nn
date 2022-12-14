import React from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity, Platform, FlatList, VirtualizedList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { foodState } from '../state/foodState';
import spacePrice from '../utils/spacePrice';

let fontFamilyH = 'PTSerif-Bold'

let fontFamily = Platform.OS === 'android' ? 'PTSerif-Regular' : 'PTSerif-Regular'

let fonts = Platform.OS === 'android' ? {} : { fontWeight: '500' }




let fontSize = 16





const _Button = React.forwardRef((prop, ref) => <TouchableOpacity activeOpacity={0.8} ref={ref} onPress={prop.onClick} {...prop} style={[{
  backgroundColor: '#ccc', paddingHorizontal: 10, backgroundColor: "white", justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRadius: 5, textAlign: 'center',
  alignSelf: prop.alignSelf,
}, prop.style]} ><Text style={[{ fontSize: 17, fontFamily }, prop.textStyle]} >{prop.children}</Text></TouchableOpacity>)


export const Button = React.forwardRef((prop, ref) => {
  const { alignSelf, style, outline, children, fontSize = 17.5, p, pt, pb, pl, pr, pv, ph, h = 46, w, m, mt, mb, ml, mr, mv, mh, color, bgcolor, border = [], flexGrow, flex } = prop
  return (
    !outline ?
      <_Button
        ref={ref}
        {...prop}
        style={[
          {
            backgroundColor: (bgcolor == 'red') && '#f33' ||
              (!bgcolor) && '#0099ff' ||
              (bgcolor == 'blue') && '#22f' ||
              (bgcolor == 'green') && '#292' ||
              (bgcolor == 'yellow') && '#fa0' ||
              (bgcolor == 'black') && '#555' ||
              bgcolor
          },
          !color && (bgcolor == 'white' ? { color: '#555' } : { color: 'white' }) ||
          { color }, bgcolor == 'white' ? {} :
            {
              borderColor: !border[1] && ((!bgcolor) ? '#0091EA' :
                bgcolor == 'yellow' ? '#ca0' : bgcolor) || border[1]
            }, {
            borderWidth: border[0] ? border[0] : 1,
            height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
            alignSelf, flexGrow, flex
          }, style]}

        textStyle={[
          !color && (bgcolor == 'white' ?
            { color: '#555' } :
            { color: 'white' }) ||
          { color: color },
          {
            paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p,
            paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr, fontFamily
          }, fonts, prop.textStyle]}>
      </_Button>
      :
      <_Button
        ref={ref}
        {...prop}
        style={[
          , bgcolor == 'white' ? {} :
            { borderColor: !border[1] && (bgcolor == 'yellow' && '#fc3' || bgcolor || '#3399ff') || border[1] },
          {
            borderWidth: border[0] ? border[0] : 1,
            height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
          },
          style]}

        textStyle={[color &&
          { color: color } ||
          !color && bgcolor &&
          { color: bgcolor } ||
          { color: '#3399ff' },
        {
          paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p,
          paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr, fontFamily
        }, prop.textStyle]}>
        {children}
      </_Button>
  )
})


export const Div = React.forwardRef((prop, ref) => {
  const { style, children, p = 5, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, bgcolor, border = [], flex, alignItems, justifyContent, flexDirection, flexGrow } = prop
  return (
    <View
      ref={ref}
      onStartShouldSetResponder={prop.onClick}
      {...prop}
      style={[{
        overflow: 'hidden',
        maxHeight: '100%',
        flexGrow,
        flexDirection,
        alignItems, justifyContent, flex, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p, paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr
      }, style]}>
      {children}
    </View>
  )
})

export const Span = React.forwardRef((prop, ref) => {
  const { style, children, p, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, bgcolor, border = [], flex, alignItems, justifyContent, flexDirection, flexGrow } = prop
  return (
    <View
      onStartShouldSetResponder={prop.onClick}
      ref={ref}
      {...prop}
      style={[{
        overflow: 'hidden',
        maxHeight: '100%',
        flexGrow,
        flexDirection,
        alignItems, justifyContent, flex, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p, paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr
      }, style]}>
      {children}
    </View>
  )
})

export const Row = React.forwardRef((prop, ref) => {
  const { style, children, p = 5, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, bgcolor, border = [], flex, alignItems, justifyContent, flexDirection = 'row', flexGrow } = prop
  return (
    <View
      ref={ref}
      onStartShouldSetResponder={prop.onClick}
      {...prop}
      style={[{
        overflow: 'hidden',
        maxHeight: '100%',
        flexGrow,
        flexDirection,
        alignItems, justifyContent, flex, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p, paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr
      }, style]}>
      {children}
    </View>
  )
})

export const RowSpan = React.forwardRef((prop, ref) => {
  const { style, children, p, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, bgcolor, border = [], flex, alignItems, justifyContent, flexDirection = 'row', flexGrow } = prop
  return (
    <View
      ref={ref}
      onStartShouldSetResponder={prop.onClick}
      {...prop}
      style={[{
        overflow: 'hidden',
        maxHeight: '100%',
        flexGrow,
        flexDirection,
        alignItems, justifyContent, flex, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p, paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr
      }, style]}>
      {children}
    </View>
  )
})

export const Scroll = React.forwardRef((prop, ref) => {
  const { style, contentContainerStyle, className, children, p = 5, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, bgcolor, border = [], flex, alignItems, justifyContent, flexDirection, flexGrow } = prop
  return (
    <ScrollView
      ref={ref}
      onStartShouldSetResponder={prop.onClick}
      {...prop}
      style={[{
        flexDirection,
        overflowX: 'hidden',
        alignItems, justifyContent, flex, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p, paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr
      }, className, style]}
      contentContainerStyle={[{ flexGrow }, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  )
})

export const ScrollHorizontal = React.forwardRef((prop, ref) => {
  const { style, contentContainerStyle, className, children, p = 5, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, bgcolor, border = [], flex, alignItems, justifyContent, flexDirection, flexGrow } = prop
  return (
    <ScrollView
      ref={ref}
      onStartShouldSetResponder={prop.onClick}
      horizontal={true}
      {...prop}
      style={[{
        overflowY: 'hidden',
        flexDirection,
        alignItems, justifyContent, flex, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p, paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr
      }, className, style]}
      contentContainerStyle={[{ flexGrow }, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  )
})

export const Ul = React.forwardRef((prop, ref) => {
  const { style, children, p = 5, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, bgcolor, border = [], flex, alignItems, justifyContent, flexDirection, flexGrow } = prop
  return (
    <View
      ref={ref}
      onStartShouldSetResponder={prop.onClick}
      {...prop}
      style={[{
        maxHeight: '100%',
        flexGrow,
        flexDirection,
        alignItems, justifyContent, flex, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        height: h, width: w, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        paddingHorizontal: ph, paddingVertical: pv, fontSize, padding: p, paddingTop: pt, paddingBottom: pb, paddingLeft: pl, paddingRight: pr
      }, style]}>
      {children}
    </View>
  )
})




export const H1 = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 19, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#000', bgcolor, border = [], flexGrow, flex } = props
  if (props.value)
    return (<TextInput onPressIn={props.onClick} multiline showSoftInputOnFocus={false} caretHidden={true} selectTextOnFocus={true} blurOnSubmit={true} ref={ref} value={props.value} {...props}
      style={[{
        padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
        margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        flexGrow, flex, alignSelf
      }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
      margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
      height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
      flexGrow, flex, alignSelf
    }, props.className, props.style]} >{props.children}</Text>)
})

export const H2 = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 26, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#000', bgcolor, border = [], flexGrow, flex } = props
  if (props.value)
    return (<TextInput onPressIn={props.onClick} multiline showSoftInputOnFocus={false} selectTextOnFocus={true} blurOnSubmit={true} caretHidden={true} ref={ref} value={props.value} {...props}
      style={[{
        padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
        margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        flexGrow, flex, alignSelf
      }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
      margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
      height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
      flexGrow, flex, alignSelf
    }, props.className, props.style]} >{props.children}</Text>)
})

export const H3 = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 24, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#000', bgcolor, border = [], flexGrow, flex } = props
  if (props.value)
    return (<TextInput onPressIn={props.onClick} multiline showSoftInputOnFocus={false} selectTextOnFocus={true} blurOnSubmit={true} caretHidden={true} ref={ref} value={props.value} {...props}
      style={[{
        padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
        margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        flexGrow, flex, alignSelf
      }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
      margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
      height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
      flexGrow, flex, alignSelf
    }, props.className, props.style]} >{props.children}</Text>)
})

export const H4 = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 21, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#000', bgcolor, border = [], flexGrow, flex } = props
  if (props.value)
    return (<TextInput onPressIn={props.onClick} multiline showSoftInputOnFocus={false} selectTextOnFocus={true} blurOnSubmit={true} caretHidden={true} ref={ref} value={props.value} {...props}
      style={[{
        padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
        margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        flexGrow, flex, alignSelf
      }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
      margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
      height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
      flexGrow, flex, alignSelf
    }, props.className, props.style]} >{props.children}</Text>)
})

export const H5 = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 18.5, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#000', bgcolor, border = [], flexGrow, flex } = props
  if (props.value)
    return (<TextInput onPressIn={props.onClick} multiline showSoftInputOnFocus={false} selectTextOnFocus={true} blurOnSubmit={true} caretHidden={true} ref={ref} value={props.value} {...props}
      style={[{
        padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
        margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        flexGrow, flex, alignSelf
      }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
      margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
      height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
      flexGrow, flex, alignSelf
    }, props.className, props.style]} >{props.children}</Text>)
})

export const H6 = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 16, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#000', bgcolor, border = [], flexGrow, flex } = props
  if (props.value)
    return (<TextInput onPressIn={props.onClick} multiline showSoftInputOnFocus={false} selectTextOnFocus={true} blurOnSubmit={true} caretHidden={true} ref={ref} value={props.value} {...props}
      style={[{
        padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
        margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
        height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
        flexGrow, flex, alignSelf
      }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      padding: p, paddingLeft: pl, paddingRight: pr, paddingBottom: pb, paddingTop: pt, paddingVertical: pv, paddingHorizontal: ph,
      margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginVertical: mv, marginHorizontal: mh,
      height: h, width: w, fontFamily: fontFamilyH, fontSize, color, backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1],
      flexGrow, flex, alignSelf
    }, props.className, props.style]} >{props.children}</Text>)
})





export const I = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 16, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#444', bgcolor, border = [], flexGrow, flex } = props
  if (props.value) return (<TextInput onPressIn={props.onClick} caretHidden={true} ref={ref} value={props.value} multiline showSoftInputOnFocus={false} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,
      fontStyle: 'italic'
    }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,
      fontStyle: 'italic'
    }, props.className, props.style]} >{props.children}</Text>)
})

export const P = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 16, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#444', bgcolor, border = [], flexGrow, flex } = props
  if (props.value) return (<TextInput onPressIn={props.onClick} caretHidden={true} ref={ref} value={props.value} multiline showSoftInputOnFocus={false} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,

    }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,
    }, props.className, props.style]} >{props.children}</Text>)
})

export const Li = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 16, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#444', bgcolor, border = [], flexGrow, flex } = props
  if (props.value) return (<TextInput onPressIn={props.onClick} caretHidden={true} ref={ref} value={props.value} multiline showSoftInputOnFocus={false} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,

    }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,

    }, props.className, props.style]} > {props.listStyle !== 'none' && <Text style={[{ position: 'absolute', fontSize: 20, marginTop: -7 }, props.left ? { marginLeft: -5 } : { marginRight: -5 }]} >.</Text>} {props.children}</Text>)
})


export const Small = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 13.5, p = 7, pt, pb, pl, pr, pv, ph, h, w, m, mt, mb, ml, mr, mv, mh, color = '#444', bgcolor, border = [], flexGrow, flex } = props
  if (props.value) return (<TextInput onPressIn={props.onClick} caretHidden={true} ref={ref} value={props.value} multiline showSoftInputOnFocus={false} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,

    }, props.className, props.style]} />)
  else return (<Text onPress={props.onClick} ref={ref} {...props}
    style={[{
      flexGrow, flex, alignSelf, padding: p, paddingBottom: pb, paddingTop: pt, paddingRight: pr, paddingLeft: pl, paddingHorizontal: ph, paddingVertical: pv,
      marginVertical: mv, margin: m, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh,
      backgroundColor: bgcolor, borderWidth: border[0], borderColor: border[1], height: h, width: w, fontFamily, fontSize, color,

    }, props.className, props.style]} >{props.children}</Text>)
})



export const Input = React.forwardRef((props, ref) => {
  const { alignSelf, fontSize = 16.5, p = 7, pt, pb, pl, pr, pv, ph, h = 50, w, m, mt, mb, ml, mr, mv, mh, color = '#444',
    bgcolor, border = [.3], flexGrow, flex } = props
  return (<View style={[{
    margin: m, marginTop: mt, marginBottom: mb, marginRight: mr, marginLeft: ml, marginHorizontal: mh, marginVertical: mv, color,
    bgcolor, borderWidth: border[0], borderColor: border[1], fontSize, alignSelf, flexGrow, flex, height: h,width:w,
    flexDirection: 'row', position: 'relative', 
    borderRadius: 5,
    backgroundColor: '#fff',
  }, props.style]} >
    <TextInput ref={ref} onPress={props.onClick} autoCapitalize='none' autoCorrect={false} spellCheck={true} placeholder={props.p} {...props} style={[{ flex: 1, minWidth: '85%', width: '85%', left: 1, textAlign: "right", fontSize: 15, padding: 6, height: '100%', position: 'absolute', color: props.color ? props.color : '#222', }, props.className, props.textStyle]} />
    {props.icon && <View onStartShouldSetResponder={props.iconPress} style={{ width: '15%', textAlign: 'center', position: 'absolute', right: 1, borderLeftWidth: .3, height: '100%', justifyContent: 'center', alignItems: 'center' }} ><Icon style={{}} name={props.icon} size={props.iconSize ? props.iconSize : 22} color={props.iconColor ? props.iconColor : "#666"} /></View>}
  </View>)
})

export const Textarea = React.forwardRef((props, ref) => {
  const { h = 100 } = props
  return (<TextInput onPressIn={props.onClick} autoCapitalize='none' autoCorrect={false} spellCheck={true}
    ref={ref} multiline {...props} style={[{ fontFamily, fontSize: 16, padding: 15, textAlign: 'right', marginHorizontal: 1.5, borderWidth: 1, borderRadius: 5, color: '#444', height: h }, props.className, props.style]} />)
})

export const Br = (props) => (<Text {...props} style={[{ width: '100%', marginVertical: 5 }, props.className, props.style]} />)

export const Hr = (props) => (<Text {...props} style={[{ width: '100%', marginVertical: 5, borderTopWidth: 1 }, props.className, props.style]} />)

export const Mark = (props) => (<Text onPress={props.onClick} {...props} style={{ borderRadius: 2.5, fontFamily, backgroundColor: '#fc7', height: props.h, paddingVertical: 7, paddingHorizontal: 4, margin: props.m, marginHorizontal: props.mh ? props.mh : 2.5, marginVertical: props.mv, marginRight: props.mr, marginLeft: props.ml, marginTop: props.mt, marginBottom: props.mb, alignSelf: 'center', fontSize, color: '#444' }} >{props.children}</Text>)

export const CheckBox = (props) => {
  const { alignSelf, m, mt, mb, ml, mr, mv, mh } = props
  return <Icon checked={props.show} onPress={() => props.setshow && props.setshow(!props.show)} name={"check"} size={18.5} color="#fff" {...props}
    style={[{ width: 20, height: 20, borderWidth: .9, textAlign: 'center', margin: m, alignSelf, marginTop: mt, marginBottom: mb, marginLeft: ml, marginRight: mr, marginHorizontal: mh, marginVertical: mv }, { backgroundColor: props.show === false ? '#fff' : "#2c1" }, props.style]} />
}




export const Th = React.forwardRef((props, ref) =>
  <View ref={ref} {...props} style={[{ flex: 1, backgroundColor: 'white', borderColor: '#888', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center', borderRadius: 1.5 }, props.style]} >
    <Text style={[{ textAlign: 'center', fontFamily: fontFamilyH, fontSize: 15, paddingVertical: 10, textShadowRadius: 1.3, textShadowColor: 'red' }, props.textStyle]}> {props.children}</Text></View>)

export const Tb = React.forwardRef((props, ref) =>
  <View ref={ref} style={[{ flex: 1, backgroundColor: 'white', borderColor: '#aaa', borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 1.5 }, props.style]} >
    <Text style={[{ textAlign: 'center', fontFamily, color: '#555', fontSize: 15, paddingVertical: 10, }, props.textStyle]} > {props.children}</Text></View>)

export const Tbtn = React.forwardRef((props, ref) => <View ref={ref} style={[{ flex: 1, backgroundColor: 'white', borderColor: '#666', borderWidth: .8, justifyContent: 'center', alignItems: 'center', borderRadius: 1.5, }, props.style]} ><Button {...props} textStyle={[{ fontSize: 15 }, props.textStyle]} style={[{ width: '99.8%', flex: 1, width: '100%', }, { paddingHorizontal: 0 }]} >{props.children}</Button></View>)


let odd = []
export function Table({ object, setobject, h, fontSize = 15, body, header, color, btn1onClick, btn2onClick, btn3onClick, btn4onClick, btn5onClick, btn6onClick, btn7onClick, btn1, btn2, btn3, btn4, btn5, btn6, btn7
  , btn1Opacity, btn2Opacity, btn3Opacity, btn4Opacity, btn5Opacity, btn6Opacity, btn7Opacity
}) {
  for (let i = 0; i <= 100; i++) {
    if (i % 2 == 0)
      odd.push(i)
  }
  let bgColor = (key) => ([{ backgroundColor: odd.includes(key) ? color[0] : color[1] }])
  let textStyle = { color: color[2], textShadowColor: color[2] }

  let _food = new foodState([])



  if (!object)
    return (
      <View style={{ minWidth: '100%' }} >
        <RowSpan flexDirection='row-reverse' >
          {header.map((f, i) => (<Th style={[bgColor(1)]} textStyle={[textStyle, { fontSize }]} key={i}>{f}</Th>))}
        </RowSpan>
        <Span flex={1}>
          {body.map((f, i) => (
            <ScrollView contentContainerStyle={{ flexDirection: 'row-reverse', flexGrow: 1 }} key={i}>
              {Object.values(f).map((a, n) => (
                btn1onClick && n === 0 ? <Tbtn key={i} onPress={btn1onClick} style={bgColor(i)} textStyle={{ fontSize }} bgcolor={btn1} >{a}</Tbtn> :
                  btn2onClick && n === 1 ? <Tbtn key={i} onPress={btn2onClick} style={bgColor(i)} textStyle={{ fontSize }} bgcolor={btn2} >{a}</Tbtn> :
                    btn3onClick && n === 2 ? <Tbtn key={i} onPress={btn3onClick} style={bgColor(i)} textStyle={{ fontSize }} bgcolor={btn3} >{a}</Tbtn> :
                      btn4onClick && n === 3 ? <Tbtn key={i} onPress={btn4onClick} style={bgColor(i)} textStyle={{ fontSize }} bgcolor={btn4} >{a}</Tbtn> :
                        btn5onClick && n === 4 ? <Tbtn key={i} onPress={btn5onClick} style={bgColor(i)} textStyle={{ fontSize }} bgcolor={btn5} >{a}</Tbtn> :
                          btn6onClick && n === 5 ? <Tbtn key={i} onPress={btn6onClick} style={bgColor(i)} textStyle={{ fontSize }} bgcolor={btn6} >{a}</Tbtn> :
                            btn7onClick && n === 6 ? <Tbtn key={i} onPress={btn7onClick} style={bgColor(i)} textStyle={{ fontSize }} bgcolor={btn7} >{a}</Tbtn> :
                              <Tb key={n} style={bgColor(i)} textStyle={[textStyle, { fontSize }]} >{a}</Tb>
              ))}
            </ScrollView>
          ))}
        </Span>
      </View>
    )


  return (
    <View style={{minWidth:'100%'}} >
      <RowSpan flexDirection='row-reverse' >
        {header.map((f, i) => (<Th style={[bgColor(1)]} textStyle={[textStyle,{fontSize}]} key={i}>{f}</Th>))}
      </RowSpan>
      <ScrollView contentContainerStyle={{flexGrow:1}}>
        {object.map((f, i) => (
          <View style={{flexDirection:'row-reverse',flexGrow:1}} key={i}>
         {body.map((b,n)=>(
           btn1onClick && n === 0?  <Tbtn key={n} onPressIn={()=>{ setobject&&setobject([f,i]); }} onPress={()=>{  btn1onClick()}} style={ [bgColor(i),btn1Opacity&&{opacity:f.available?1:.3}]} textStyle={{fontSize}} bgcolor={btn1} >{b}</Tbtn>:
           btn2onClick && n === 1? <Tbtn key={n} onPressIn={()=>{ setobject&&setobject([f,i]); }} onPress={()=>{  btn2onClick()}} style={ [bgColor(i),btn2Opacity && {opacity:f.available?1:.3}]} textStyle={{fontSize}} bgcolor={btn2} >{b}</Tbtn>:
           btn3onClick && n === 2? <Tbtn key={n} onPressIn={()=>{ setobject&&setobject([f,i]); }} onPress={()=>{  btn3onClick()}} style={ [bgColor(i),btn3Opacity && {opacity:f.available?1:.3}]} textStyle={{fontSize}} bgcolor={btn3} >{b}</Tbtn>:
           btn4onClick && n === 3? <Tbtn key={n} onPressIn={()=>{ setobject&&setobject([f,i]); }} onPress={()=>{  btn4onClick()}} style={ [bgColor(i),btn4Opacity && {opacity:f.available?1:.3}]} textStyle={{fontSize}} bgcolor={btn4} >{b}</Tbtn>:
           btn5onClick && n === 4? <Tbtn key={n} onPressIn={()=>{ setobject&&setobject([f,i]); }} onPress={()=>{  btn5onClick()}} style={ [bgColor(i),btn5Opacity && {opacity:f.available?1:.3}]} textStyle={{fontSize}} bgcolor={btn5} >{b}</Tbtn>:
           btn6onClick && n === 5? <Tbtn key={n} onPressIn={()=>{ setobject&&setobject([f,i]); }} onPress={()=>{  btn6onClick()}} style={ [bgColor(i),btn6Opacity && {opacity:f.available?1:.3}]} textStyle={{fontSize}} bgcolor={btn6} >{b}</Tbtn>:
           btn7onClick && n === 6? <Tbtn key={n} onPressIn={()=>{ setobject&&setobject([f,i]); }} onPress={()=>{  btn7onClick()}} style={ [bgColor(i),btn7Opacity && {opacity:f.available?1:.3}]} textStyle={{fontSize}} bgcolor={btn7} >{b}</Tbtn>:
           <Tb key={n} style={ bgColor(i)} textStyle={[textStyle,{fontSize}]} >{b === 'price' && spacePrice(f.price) || b === 'title' && f.title || b === 'total' && spacePrice(f.total) || b  }</Tb>
         ))}
          </View>
        ))}
      </ScrollView>
    </View>
  )




  // return (
  //   <View style={{ minWidth: '100%' }} >
  //     <RowSpan flexDirection='row-reverse' >
  //       {header.map((f, i) => (<Th style={[bgColor(1)]} textStyle={[textStyle, { fontSize }]} key={i}>{f}</Th>))}
  //     </RowSpan>

  //     <FlatList
  //       keyExtractor={(f) => f && f._id.toString()}
  //       data={object}
  //       renderItem={({ item, index }) => (

  //         <View style={{ flexDirection: 'row-reverse', flexGrow: 1 }}>
  //           {body.map((b, n) => (
  //             btn1onClick && n === 0 ? <Tbtn key={n} onPressIn={() => { setobject && setobject([item, index]); }} onPress={() => { btn1onClick() }} style={[bgColor(index), btn1Opacity && { opacity: item.available ? 1 : .3 }]} textStyle={{ fontSize }} bgcolor={btn1} >{b}</Tbtn> :
  //               btn2onClick && n === 1 ? <Tbtn key={n} onPressIn={() => { setobject && setobject([item, index]); }} onPress={() => { btn2onClick() }} style={[bgColor(index), btn2Opacity && { opacity: item.available ? 1 : .3 }]} textStyle={{ fontSize }} bgcolor={btn2} >{b}</Tbtn> :
  //                 btn3onClick && n === 2 ? <Tbtn key={n} onPressIn={() => { setobject && setobject([item, index]); }} onPress={() => { btn3onClick() }} style={[bgColor(index), btn3Opacity && { opacity: item.available ? 1 : .3 }]} textStyle={{ fontSize }} bgcolor={btn3} >{b}</Tbtn> :
  //                   btn4onClick && n === 3 ? <Tbtn key={n} onPressIn={() => { setobject && setobject([item, index]); }} onPress={() => { btn4onClick() }} style={[bgColor(index), btn4Opacity && { opacity: item.available ? 1 : .3 }]} textStyle={{ fontSize }} bgcolor={btn4} >{b}</Tbtn> :
  //                     btn5onClick && n === 4 ? <Tbtn key={n} onPressIn={() => { setobject && setobject([item, index]); }} onPress={() => { btn5onClick() }} style={[bgColor(index), btn5Opacity && { opacity: item.available ? 1 : .3 }]} textStyle={{ fontSize }} bgcolor={btn5} >{b}</Tbtn> :
  //                       btn6onClick && n === 5 ? <Tbtn key={n} onPressIn={() => { setobject && setobject([item, index]); }} onPress={() => { btn6onClick() }} style={[bgColor(index), btn6Opacity && { opacity: item.available ? 1 : .3 }]} textStyle={{ fontSize }} bgcolor={btn6} >{b}</Tbtn> :
  //                         btn7onClick && n === 6 ? <Tbtn key={n} onPressIn={() => { setobject && setobject([item, index]); }} onPress={() => { btn7onClick() }} style={[bgColor(index), btn7Opacity && { opacity: item.available ? 1 : .3 }]} textStyle={{ fontSize }} bgcolor={btn7} >{b}</Tbtn> :
  //                           <Tb key={n} style={bgColor(index)} textStyle={[textStyle, { fontSize }]} >{b === 'price' && spacePrice(item.price) || b === 'title' && item.title || b === 'total' && spacePrice(item.total) || b}</Tb>
  //           ))}
  //         </View>


  //       )} />

  //   </View>
  // )


}