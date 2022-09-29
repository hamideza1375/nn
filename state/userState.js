import { sendcode, verifycode, loginUser, registerUser, forgetpassword, useradmin, deleteAdmin, getAlluserAdmin, resetpassword } from "../services/userService"
import localStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigationState, useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import jwt_decode from "jwt-decode";
import { geocode, getallchildfood, getProfile, reverse, sendProfile } from "../services/foodService"
import { Alert } from "react-native";
import { imagePicker } from '../states/imagePicer';

let loginInterval = null

export function userState(props) {
  const route = useRoute()
  const navigation = useNavigation()
  const ind = useNavigationState((state) => state)



  this.addAdmin = async () => {
    await useradmin({ phone: props.phone });
    props.setPhone('')
    navigation.goBack()
  }


  this.deleteAdmin = async () => {
    await deleteAdmin({ phone: props.phone });
    props.setPhone('')
    navigation.goBack()
  }


  //Login
  this.sendLoginAction = async () => {
    loginInterval && clearInterval(loginInterval)
    let d = new Date()
    let locMinut = await localStorage.getItem('getMinutes')
    let svl = await localStorage.getItem("several")
    if ((locMinut - d.getMinutes()) <= 1) {
      await localStorage.removeItem("several")
      await localStorage.removeItem('getMinutes')
    }
    if (JSON.parse(svl) < 5) {
      loginInterval = setTimeout(async () => {
        await localStorage.removeItem("several")
        await localStorage.removeItem('getMinutes')
      }, 120000);
    }
    if (JSON.parse(svl) < 5 || !locMinut) {
      await localStorage.removeItem('getTime')
      await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
      localStorage.getItem("several").then((several) => {
        localStorage.setItem("several", JSON.stringify(JSON.parse(several) + 1)).then(() => { })
      })
      const { data } = await loginUser({ email: props.email, password: props.password, phone: props.phone, captcha: props.captcha, remember: props.remember ? "1h" : "100h" }, navigation);
      await localStorage.setItem("token", data.token);
      await localStorage.setItem("exp", data.exp);
      const user = jwt_decode(data.token)
      props.settokenValue(user)
      props.settimeChange(5)


      props.route.params?.name !== 'ChildFood' ?
        navigation.navigate("Home") :
        props.route.params.price != 0 ?
          navigation.navigate("FinallFoodPayment") :
          navigation.navigate("Home")
    }
    else {
      let loc = await localStorage.getItem('getTime')
      if (loc === '' || loc === null || !loc) {
        loginInterval && clearInterval(loginInterval)
        await localStorage.setItem('getTime', 'true')
        await localStorage.setItem('getMinutes', JSON.stringify(d.getMinutes() + 5))
      }
      localStorage.getItem('getMinutes').then((locMinut) => {
        if (JSON.parse(svl) >= 5)
          alert(`تعداد دفعات وارد شده بیشتر از حد مجاز بود ${locMinut - d.getMinutes() > 0 ? locMinut - d.getMinutes() : 0} دقیقه دیگر دوباره امتحان کنید`)
      })
    }
  }


  this.mountLogin = () => {
    useFocusEffect(useCallback(() => (() => { 
      props.setFullname(''); 
      props.setEmail(''); 
      props.setPhone(''); 
      props.setPassword('') }), []))
  }
  //Login




  // register
  this.registerSendAction = async () => {
    await registerUser({ fullname: props.fullname, email: props.email, phone: props.phone, password: props.password });
    navigation.navigate("Login")
  }
  // register


  // Home
  this._token = async () => {
    if (ind.index === 0 && route.name === 'Home') {
      const exp = await localStorage.getItem("exp");
      if (exp && Number(exp) > Date.now() / 1000) return props.settoken(true)
      if (!exp) return props.settoken(false)
      if (exp && Number(exp) < Date.now() / 1000) {
        await localStorage.removeItem("token");
        await localStorage.removeItem("exp");
        return props.settoken(false)
      }
    }
  }
  // Home


  // profile
  this._tokenValue = () => {
    useEffect(() => {
      localStorage.getItem("token").then((token) => {
        const user = jwt_decode(token)
        props.settokenValue(user)
      })
    }, [])
  }


  this.imagePicker = () => {
    imagePicker('photo')
    .then(async(res) => {
      await sendProfile(res);
       props.setchange(!props.change)
    })
  }



  this.profile=async()=>{
    useFocusEffect(
      useCallback(() => {
        (async () => {
          let room = ['room5', 'room6']
          for (let i of room) {
            let loc = await localStorage.getItem(i)
            if (loc) { props.allRoom.set(i, JSON.parse(loc)); props.msgLength.set(i, JSON.parse(loc)); }
          }
        })()
  
        localStorage.getItem("token").then((token) => {
          const user = jwt_decode(token)
          token && props.settokenValue(user)
        })
  
      }, [])
    )
  
    useFocusEffect(
      useCallback(() => {
        (async()=> {
          await getProfile().then(({data}) => {
            data?.uri && props.setimageProfile(data.uri)
            console.log(555555,data)
          })
        })()
      }, [props.change])
    )
    }

  // profile



  // forgetpassword
  this.forgetAction = async () => {
    await forgetpassword({ email: props.email })
  }

  this.setreplaceInput = async () => {
    useEffect(() => {
      return () => {
        props.setreplaceInput(false)
      }
    }, [])
  }
  // forgetpassword


  //sms
  this.smsAction = async () => {
    await sendcode({ phone: props.myPhone })
    props.setreplaceInput(true)
  }

  this.codeAction = async () => {
    const { data } = await verifycode({ code: props.myCode })
    navigation.navigate('ResetPass', { id: data })
  }

  //sms





  // location
  this.geoCodeAction = async () => {
    let { data } = await geocode({ loc: `سبزوار ${props.search1}` })
    let orgin = {
      latitude: data[0].latitude,
      longitude: data[0].longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008
    }
    // if(data[0] && data[0].latitude && data[0].zipcode === "96139-44591" || data[0].city === "دهستان قصبه شرقی" || data[0].city === "سبزوار" || data[0].city === "شهر سبزوار"){
    //  if(data[0].longitude > 57.65055116587766 && data[0].streetName !== "سبزوار - اسفراین" ) 
    // }
    if (data[0] && data[0].longitude &&
      data[0].longitude > 57.645 &&
      data[0].longitude < 57.711 &&
      data[0].latitude > 36.191 &&
      data[0].latitude < 36.239) props.setmarkers(orgin);
    props.setallItemLocation(data[0])
    // console.log(data);

  }


  this.geoCodeAction2 = async (e) => {
    let orgin = {
      ...e.nativeEvent.coordinate,
    }
    props.setmarkers(orgin)
  }


  this.reversAction = async () => {
    useEffect(() => {
      (async () => {
        let { data } = await reverse(props.markers)
        let formattedAddress = data[0].formattedAddress
        let streetName = data[0].streetName

        props.setrevers({
            formattedAddress, streetName,
            origin: {
              latitude: data[0].latitude,
              longitude: data[0].longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
            }
          })
          props.setallItemLocation(data[0])
          console.log('origin', origin);
        
      })()
    }, [props.markers])



    useEffect(() => {
      if (props.allItemLocation && props.allItemLocation.longitude) {
        if (
          props.allItemLocation.longitude < 57.645 ||
          props.allItemLocation.longitude > 57.711 ||
          props.allItemLocation.latitude < 36.191 ||
          props.allItemLocation.latitude > 36.239 ||
          props.allItemLocation.streetName === "سبزوار - اسفراین"
        ) Toast('این منطقه از ارسال غذا پشتیبانی نمیکند')
      }
      if (props.route.params?.origin && props.tokenValue.isAdmin) props.setmarkers(props.route.params.origin["origin"])
    }, [props.allItemLocation])
  
  


  }




  


  // location

  // deleteadmin
  this.getAlluserAdmin = async () => {
  useEffect(()=>{
    (async() => {
      const {data} = await getAlluserAdmin()
      props.setadmin(data)
    })()
  },[])
  }
  // deleteadmin


  // logout

  this.logout = async () => {
  useEffect(() => {
    (async () => {

      Alert.alert(
        "خارج میشوید؟",
        "",
        [{ text: 'cancele', onPress:()=>{props.navigation.goBack()} },
         { text: 'ok', onPress: async() => {   
              props.setnavigateProfile(false)
          props.setnavigateUser(false)
          props.settokenValue({})
          props.settoken(false)
          await localStorage.removeItem("token");
          await localStorage.removeItem("exp");

          for (let i of props.foods) {
            const { data } = await getallchildfood(i._id)
            for (let item of data.child) {
              props.map.delete(item._id)
              props.map.delete(item.title)
            }
          }
          props.map.delete('sum')
          props.map.delete('allprice')
          props.setallprice(0)

          props.navigation.navigate("Home"); } }])
    })()

    return () => (
      props.setnavigateProfile(false),
      props.setnavigateUser(false)
    )
  }, []);
}
  // logout



  // resetPass
  this.resetpassword=async()=>{
      try {
        const { status } = await resetpassword(props.route.params.id, { password: props.password, confirmPassword: props.confirmPassword })
        if (status === 200) props.navigation.navigate('Login')
      } catch (err) { alert('خطایی رخ داد دوباره امتحان کنید'); }
  }
  // resetPass



}

export const origin = {
  latitude: 36.224174234928924,
  longitude: 57.69491965736432,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01
}