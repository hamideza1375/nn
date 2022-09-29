import React, { useCallback, useEffect, useMemo } from 'react'
import { BackHandler, ToastAndroid, Platform, Alert, Dimensions } from 'react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { editcomment, deletecomment, getallchildfood, getfoods, getcommentchildfood, createcommentchildfood, getsinglechildfood, getcommentsinglefood, payment, getAllAddress, deleteAllAddress, deleteAddress, getProfile, notification } from '../services/foodService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { header } from "../header"
import { create } from '../states/notification'


export function foodState(props) {

  const route = useRoute()
  let id = route.params && route.params.id
  let id2 = route.params && route.params.id2


  this.setOrientation = () => {
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      width < height ? props.setOrientation("PORTRAIT") : props.setOrientation("LANDSCAPE")
      props.setwidth(width); props.setheight(height)
    })
  }

  this.getTitleFood = show => {
    useFocusEffect(useCallback(() => {
      setTimeout(() => {
        (async () => {
          try {
            let { data } = await getfoods()
            if (data.length !== props.foods)
              props.setfoods(data)
          } catch (err) { console.log(err) }
        })()
      }, 100);
    }, [show]))
  }





  this.getChildFood = async () => {
    useEffect(() => {
      (async () => {
        try {
          var d = []
          let { data } = await getallchildfood()
          let w = data.child.filter((ch) => ch.refId == route.params.id)
          for (let k in w) {
            let l = props.map.get(w[k]._id)

            if (l !== undefined) {
              let f = JSON.parse(l)
              w[k].num = f.num
              w[k].total = f.total
              d.push(w[k])
            } else {
              d.push(w[k])
            }
          }
          props.foodMap.set(route.params.id, d)
          props.setfood2(d)
        }
        catch (err) { console.log(err); }
      })()
    }, [])

    useFocusEffect(useCallback(() => {
      return () => {
        props.setcurrentPage(1)
        props.setpage(1);
        props.setcurrent([])
        props.setfood2([])
        props.settextSearch('')
      }
    }, []))

  }




  this.getChildFood2 = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          let { data } = await getallchildfood()
          let w = data.child.filter((ch) => ch.refId == route.params.id)
          props.foodMap.set(route.params.id, w)
          props.setfood2(w)
          props.setcurrent(w.filter((f, i) => (i >= (props.page - 1) * props.pageLimit) && (i < (props.page - 1) * props.pageLimit + props.pageLimit)))
        }
        catch (err) { console.log(err); }
      })()
    }, [props.changeFood]))

    useFocusEffect(useCallback(() => {
      return () => {
        props.setcurrentPage(1)
        props.setpage(1);
        props.setcurrent([])
      }
    }, []))

  }





  this.sercher = (textSearch) => {
    props.foodMap.set(route.params.id, props.food2.filter((f) => f.title.includes(textSearch)))
    let fd = props.food2.filter(f => f.title.includes(textSearch))
    if (fd) {
      const currentPage = Math.max(0, Math.min(1, fd.length))
      const offset = (currentPage - 1) * props.pageLimit
      const currentCountries = fd.slice(offset, offset + props.pageLimit)
      props.setcurrent(currentCountries)
      props.setcurrentPage(currentPage)
      props.settextSearch('')
    }
  }


  this.foodAsc = (setpage) => {
    let foodMap = props.foodMap.get(route.params.id)
    if (foodMap) {
      props.foodMap.set(route.params.id, foodMap.sort((a, b) => a.price - b.price))
      props.setass(!props.ass)
      setpage(1)
    }
  }



  this.foodDesc = (setpage) => {
    let foodMap = props.foodMap.get(route.params.id)
    props.foodMap.set(route.params.id, foodMap.sort((a, b) => b['price'] - a['price']))
    props.setass(!props.ass)
    setpage(1)
  }



  this.allPrice = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        let all = []
        for (let i of props.allfood) { all.push(i.total) }
        if (all.length) {
          const su = all.reduce((total, number) => total + number)
          props.setallprice(su < 0 ? 0 : su)
          props.map.set('allprice', JSON.stringify(su))
        }
      })()
    }, [props.show1]))
  }



  this.AllPrice = (inputPrice) => {
    try {
      let rt = String(inputPrice)
      let k = ''
      for (let i = 0; i < rt.length; i++) {
        k +=
          rt.length == 4 ?
            (i == 0 ?
              rt[i] + ','
              :
              rt[i])
            :
            rt.length == 5 ?
              (i == 1 ?
                rt[i] + ','
                :
                rt[i])
              :
              rt.length == 7 ?
                (i == 0 || i == 3
                  ? rt[i] + ','
                  : rt[i])
                :
                rt.length == 8 ?
                  (i == 1 || i == 4
                    ? rt[i] + ','
                    : rt[i])
                  :
                  rt.length == 9 ?
                    (i == 2 || i == 5
                      ? rt[i] + ','
                      : rt[i])
                    :
                    rt.length == 10 ?
                      (i == 0 || i == 3 || i == 6
                        ? rt[i] + ','
                        : rt[i])
                      :
                      rt.length == 11 ?
                        (i == 1 || i == 4 || i == 7
                          ? rt[i] + ','
                          : rt[i])
                        :
                        i == 2
                          ? rt[i] + ','
                          : rt[i]
      }
      return k
    }
    catch (err) { console.log(err) }
  }



  this.plustNum = async (inde, item, setpage, page) => {
    if (route.name == 'ChildFood') {
      let h = [...props.foodMap.get(route.params.id)]
      let index = props.foodMap.get(route.params.id).findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      let allfood = [...props.allfood]
      let fnd = allfood.findIndex((f) => f._id === item._id)
      if (!allfood[fnd]) {
        allfood.push(h[index])
        props.setallfood(allfood)
      }
      else {
        allfood[fnd] = h[index]
        props.setallfood(allfood)
      }
      props.map.set(item._id + '1', item._id)
      props.map.set(item._id, JSON.stringify(h[index]))
      let tit = props.map.get(item._id + '1')
      let gg = props.totalTitle.find((t) => t == item._id)
      console.log('tit', gg);
      if (!gg) props.settotalTitle((t) => { return t.concat(tit) })
      console.log('props.settotalTitle', props.totalTitle);
      props.foodMap.set(route.params.id, h)

      setpage(page)
      const offset = (page - 1) * props.pageLimit
      const currentCountries = h.slice(offset, offset + props.pageLimit)
      props.setcurrent(currentCountries)
      setpage(page)

      props.setshow1(!props.show1)
    }
    if (route.name == 'FinallFoodPayment') {
      let h = [...props.allfood]
      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      props.map.set(item._id, JSON.stringify(h[index]))

      let f = props.foodMap.get(h[index].refId)
      let fIndex = f.findIndex((f) => (f._id === h[index]._id))
      f[fIndex].num = h[index].num
      props.foodMap.set(h[index].refId, f)

      props.setshow1(!props.show1)
    }

  }




  this.minusNum = async (inde, item, setpage, page) => {
    if (route.name == 'ChildFood') {
      let h = [...props.foodMap.get(route.params.id)]
      let index = props.foodMap.get(route.params.id).findIndex(f => f._id == item._id)
      h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      let allfood = [...props.allfood]
      let fnd = allfood.findIndex((f) => f._id === item._id)
      if (!allfood[fnd]) {
        allfood.push(h[index])
        props.setallfood(allfood)
      }
      else {
        allfood[fnd] = h[index]
        props.setallfood(allfood)
      }
      props.map.set(item._id + '1', item._id)

      props.map.set(item._id, JSON.stringify(h[index]))
      if (h[index].num == 0) {
        let gg = props.totalTitle.filter((t) => t != item._id)
        props.settotalTitle(gg)
        props.map.delete(item._id + '1')
      }
      props.foodMap.set(route.params.id, h)

      setpage(page)
      const offset = (page - 1) * props.pageLimit
      const currentCountries = h.slice(offset, offset + props.pageLimit)
      props.setcurrent(currentCountries)
      setpage(page)


      props.setshow1(!props.show1)
    }
    if (route.name == 'FinallFoodPayment') {
      let h = [...props.allfood]
      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      props.map.set(item._id, JSON.stringify(h[index]))

      let f = props.foodMap.get(h[index].refId)
      let fIndex = f.findIndex((f) => (f._id === h[index]._id))
      f[fIndex].num = h[index].num
      props.foodMap.set(h[index].refId, f)

      props.setshow1(!props.show1)
      if (h[index].num == 0) {
        let gg = props.totalTitle.filter((t) => t != item._id)
        props.settotalTitle(gg)
        props.map.delete(item._id + '1')
      }
    }
  }



  this.deleteStorage = async () => {
    try {
      for (let i of props.foods) {
        const { data } = await getallchildfood(i._id)
        for (let item of data.child) {
          props.map.delete(item._id)
          props.map.delete(item._id + '1')
        }

        props.map.delete('sum')
        props.map.delete('allprice')
        props.setallprice(0)
        props.setallfood([])
        props.settotalTitle([])
        props.setshow1(!props.show1)
      }
    }
    catch (err) { console.log(err); }
  }




  this.getsinglefood = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          const { data } = await getsinglechildfood(id, id2)
          props.setsinglefood(data.child)
          props.setpermission(data.permission)
        }
        catch (err) { console.log(err); }
      })()
      return () => (
        props.setsinglefood({}),
        props.setpermission(false),
        props.setallcomment([])
      )

    }, []))
  }


  this.setHeader = () => {
    useFocusEffect(useCallback(() => props.navigation.setOptions({
      header: !props.showForm2 && !props.showForm ? header : () => <></>
    }), [props.showForm, props.showForm2]))

  }

  this.getImageProfile = () => {
    useFocusEffect(
      useCallback(() => {
        (async () => {
          await getProfile().then(({ data }) => {
            data?.uri && props.setimageProfile(data.uri)
          })
        })()
      }, [props.allcomment])
    )
  }


  this.getCommentSingle = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          console.log('getCommentSingle')
          const { data } = await getcommentchildfood(id, id2)

          props.setallcomment(data.comment)
        }
        catch (err) { console.log(err); }
      })()
    }, [props.showForm, props.showForm2, props.changeComment]))

    useFocusEffect(useCallback(() => {
      return () => {
        props.setShowForm(false)
        props.setshowForm2(false)
        props.setallcomment([])
      }
    }, []))
  }



  this.sendComment = async () => {
    try {
      await createcommentchildfood(id, id2, {
        starId: props.tokenValue.userId,
        fullname: props.tokenValue.fullname,
        imageUrl: props.imageProfile,
        message: props.message,
        allstar: Number(props.allstar),
        id: props.singlefood._id
      })
      props.setstar1(false),
        props.setstar2(false),
        props.setstar3(false),
        props.setstar4(false),
        props.setstar5(false),
        props.setFullname(''),
        props.setEmail(''),
        props.setMessage(''),
        props.setshowForm2(false)
    }
    catch (err) { console.log(err) }
  }



  this.editComment = async id3 => {
    try {
      let { status } = await editcomment(id, id2, id3, { message: props.message, allstar: props.allstar })
      props.setstar1(false)
      props.setstar2(false)
      props.setstar3(false)
      props.setstar4(false)
      props.setstar5(false)
      props.setEmail('')
      props.setMessage('')
      props.setShowForm(false)
    }
    catch (err) { console.log(err); }
  }



  this.deleteComment = async id3 => {
    try {

      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
          {
            text: "OK", onPress: async () => {
              await deletecomment(id, route.params.id2, id3)
              props.setchangeComment(!props.changeComment)
            }
          }
        ]
      );


    }
    catch (err) { console.log(err); }
  }



  this.getEditComment = (id3) => {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await getcommentsinglefood(id, id2, id3)
          props.setMessage(data.comment.message)
          props.setallstar(data.comment.allstar)
          if (data.comment.allstar == 1) props.setstar1(true)
          if (data.comment.allstar == 2) props.setstar1(true), props.setstar2(true)
          if (data.comment.allstar == 3) props.setstar1(true), props.setstar2(true), props.setstar3(true)
          if (data.comment.allstar == 4) props.setstar1(true), props.setstar2(true), props.setstar3(true), props.setstar4(true)
          if (data.comment.allstar == 5) props.setstar1(true), props.setstar2(true), props.setstar3(true), props.setstar4(true), props.setstar5(true)
        } catch (err) { console.log(err); }
      })()

    }, [])
  }



  this.pressIconEdit = (id) => {
    props.setShowForm(true)
    props.setid3(id)
    props.setstar1(false)
    props.setstar2(false)
    props.setstar3(false)
    props.setstar4(false)
    props.setstar5(false)
  }



  this.backHandler = async () => {
    try {
      if (Platform.OS === 'android') {

        useFocusEffect(useCallback(() => {
          let current = 0
          BackHandler.addEventListener("hardwareBackPress", () => {
            if (route.name === 'Home' && props.navigation?.getState()?.index === 0) {
              current += 1
              if (current === 2) { BackHandler.exitApp(); return true }
              ToastAndroid.show("برای خروج دوبار لمس کنید", ToastAndroid.SHORT)
              setTimeout(() => {
                current = 0
              }, 1000);
              return true
            }
          })

          // return BackHandler.exitApp()
          return BackHandler.removeEventListener('hardwareBackPress')


        }, []))
      }
      else return null
    }
    catch (err) { console.log(err) }
  }


  this.payment = async () => {
    const { data } = await payment(
      props.allprice,
      {
        foods: JSON.stringify(props.totalTitle),
        plaque: props.plaque,
        floor: props.floor,
        formattedAddress: props.revers.formattedAddress,
        streetName: props.revers.streetName,
        origin: JSON.stringify(props.revers)
      }
    )
    console.log('props.totalTitle', props.totalTitle);
    props.revers.formattedAddress !== NaN && props.navigation.navigate("Payment", { uri: data })


    // await Linking.openURL(data)
  }


  // address
  this.getAllAddress = async () => {
    useEffect(() => {
      getAllAddress().then(({ data }) => {
        props.setallAddress(data)
        props.set_address(data)
      })
    }, [props.change])
  }


  this.deleteAddress = (_id) => {
    Alert.alert(
      "مشتری حذف شود ؟",
      "",
      [
        { text: "Cancel" },
        { text: "yes", onPress: async () => { await deleteAddress(_id); props.setchange(!props.change); } }
      ])
  }



  this.totalAllAddress = () => {
    let total = []
    useFocusEffect(useCallback(() => {
      props.allAddress.forEach((address) => {
        total.push(address.price)
      })
      const su = total.length && total.reduce((total, number) => total + number)
      props.settotalPrices(su);

      AsyncStorage.getItem('totalOldPrice').then((res) => {
        res && props.setoldPrice(JSON.parse(res))
      })
    }, [props.allAddress]))
  }


  this.deleteAllAddress = () => {
    Alert.alert(
      "آیا از حذف تمام مشتریان مطمئنید؟",
      "",
      [
        { text: "Cancel" },
        {
          text: "yes", onPress: async () => {
            Alert.alert(
              "",
              "بعد از حذف دیگر قادر به برگرداندن نخواهید بود!!",
              [
                { text: "Cancel" },
                {
                  text: "yes", onPress: async () => {
                    await deleteAllAddress(); await AsyncStorage.setItem('totalOldPrice', JSON.stringify(props._moment + '=' + props.totalPrices)); props.setchange(!props.change);
                  }
                }])
          }
        }])
  }
  // address

}



//home
export const home = (props) => {
  useEffect(() => {
    (async () => {
      let newNotification = await AsyncStorage.getItem('notification')
      const { data } = await notification()
      if (data)
        if (data.message && newNotification !== data.message) {
          create(data.title, data.message, require('../assets/a1.png'))
          await AsyncStorage.setItem('notification', data.message)
        }
    })();

    setInterval(async () => {
      (async () => {
        let newNotification = await AsyncStorage.getItem('notification')
        const { data } = await notification()
        if (data)
          if (data.message && newNotification !== data.message) {
            create(data.title, data.message, require('../assets/a1.png'))
            await AsyncStorage.setItem('notification', data.message)
          }
      })();
    }, 15000);
  }, [props.width])


  useMemo(() =>
    setTimeout(() => {
      props.setSplash(false)
    }, 1000), [])


  useFocusEffect(useCallback(() => {
    (async () => {
      try {
        let { data } = await getfoods()
        props.setfoods(data)
      } catch (err) { console.log(err) }
    })()
  }, []))
}
//home


