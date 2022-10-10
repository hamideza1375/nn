import React, { useCallback, useEffect, useMemo } from 'react'
import { BackHandler, ToastAndroid, Platform, Alert, Dimensions } from 'react-native'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { getSingleTitleFoods,editcomment, deletecomment, getallchildfood, getfoods, getcommentchildfood, createcommentchildfood, getsinglechildfood, getcommentsinglefood, payment, getProfile, notification } from '../services/foodService'
import localStorage from '@react-native-async-storage/async-storage'
import { header } from "../header"
import { create } from '../utils/notification'


export function foodState(p) {
  const route = useRoute()
  let id = route.params && route.params.id
  let id2 = route.params && route.params.id2


  this.setorientation = () => {
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      width < height ? p.setorientation("PORTRAIT") : p.setorientation("LANDSCAPE")
      p.setwidth(width); p.setheight(height)
    })
  }



    // EditFood
    this.getSingleTitleFoods = async () => {
      useEffect(() => {
        (async () => {
          const { data } = await getSingleTitleFoods(id)
          p.settitle(data.title)
        })()
  
        return () => {
          p.settitle('')
        }
      }, [])
    }
  



  this.getTitleFood = show => {
    useFocusEffect(useCallback(() => {
      setTimeout(() => {
        (async () => {
          try {
            let { data } = await getfoods()
            if (data.length !== p.foods)
              p.setfoods(data)
          } catch (err) { console.log(err) }
        })()
      }, 100);
    }, [show]))
  }





  this.getChildFood = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          var d = []
          let { data } = await getallchildfood()
          let w = data.child.filter((ch) => ch.refId == route.params.id)
          for (let k in w) {
            let l = p.map.get(w[k]._id)

            if (l !== undefined) {
              let f = JSON.parse(l)
              w[k].num = f.num
              w[k].total = f.total
              d.push(w[k])
            } else {
              d.push(w[k])
            }
          }
          p.foodMap.set(route.params.id, d)
          p.setfood2(d)
          // props.setcurrent(d.filter((f, i) => (i >= (props.page - 1) * props.pageLimit) && (i < (props.page - 1) * props.pageLimit + props.pageLimit)))

        }
        catch (err) { console.log(err); }
      })()
    }, []))

    useFocusEffect(useCallback(() => {
      return () => {
        p.setcurrentPage(1)
        p.setpage(1);
        p.setcurrent([])
        p.setfood2([])
        p.settextSearch('')
      }
    }, []))

  }




  this.getChildFood2 = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          let { data } = await getallchildfood()
          let w = data.child.filter((ch) => ch.refId == route.params.id)
          p.foodMap.set(route.params.id, w)
          p.setfood2(w)
          p.setcurrent(w.filter((f, i) => (i >= (p.page - 1) * p.pageLimit) && (i < (p.page - 1) * p.pageLimit + p.pageLimit)))
        }
        catch (err) { console.log(err); }
      })()
    }, [p.changeFood]))

    useFocusEffect(useCallback(() => {
      return () => {
        p.setcurrentPage(1)
        p.setpage(1);
        p.setcurrent([])
      }
    }, []))

  }





  this.sercher = (textSearch) => {
    p.foodMap.set(route.params.id, p.food2.filter((f) => f.title.includes(textSearch)))
    let fd = p.food2.filter(f => f.title.includes(textSearch))
    if (fd) {
      const currentPage = Math.max(0, Math.min(1, fd.length))
      const offset = (currentPage - 1) * p.pageLimit
      const currentCountries = fd.slice(offset, offset + p.pageLimit)
      p.setcurrent(currentCountries)
      p.setcurrentPage(currentPage)
      p.settextSearch('')
    }
  }


  this.foodAsc = (setpage) => {
    let foodMap = p.foodMap.get(route.params.id)
    if (foodMap) {
      p.foodMap.set(route.params.id, foodMap.sort((a, b) => a.price - b.price))
      p.setass(!p.ass)
      setpage(1)
    }
  }



  this.foodDesc = (setpage) => {
    let foodMap = p.foodMap.get(route.params.id)
    p.foodMap.set(route.params.id, foodMap.sort((a, b) => b['price'] - a['price']))
    p.setass(!p.ass)
    setpage(1)
  }



  this.allPrice = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        let all = []
        for (let i of p.allfood) { all.push(i.total) }
        if (all.length) {
          const su = all.reduce((total, number) => total + number)
          p.setallprice(su < 0 ? 0 : su)
          p.map.set('allprice', JSON.stringify(su))
        }
      })()
    }, [p.show1]))
  }




  this.plustNum = async (inde, item, setpage, page) => {
    if (route.name == 'ChildFood') {
      let h = [...p.foodMap.get(route.params.id)]
      let index = p.foodMap.get(route.params.id).findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      let allfood = [...p.allfood]
      let fnd = allfood.findIndex((f) => f._id === item._id)
      if (!allfood[fnd]) {
        allfood.push(h[index])
        p.setallfood(allfood)
      }
      else {
        allfood[fnd] = h[index]
        p.setallfood(allfood)
      }
      p.map.set(item._id + '1', item._id)
      p.map.set(item._id, JSON.stringify(h[index]))
      let tit = p.map.get(item._id + '1')
      let gg = p.totalTitle.find((t) => t == item._id)
      console.log('tit', gg);
      if (!gg) p.settotalTitle((t) => { return t.concat(tit) })
      console.log('props.settotalTitle', p.totalTitle);
      p.foodMap.set(route.params.id, h)

      setpage(page)
      const offset = (page - 1) * p.pageLimit
      const currentCountries = h.slice(offset, offset + p.pageLimit)
      p.setcurrent(currentCountries)
      setpage(page)

      p.setshow1(!p.show1)
    }
    if (route.name == 'FinallFoodPayment') {
      let h = [...p.allfood]
      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num + 1
      h[index].total = item.price * h[index].num
      p.map.set(item._id, JSON.stringify(h[index]))

      let f = p.foodMap.get(h[index].refId)
      let fIndex = f.findIndex((f) => (f._id === h[index]._id))
      f[fIndex].num = h[index].num
      p.foodMap.set(h[index].refId, f)

      p.setshow1(!p.show1)
    }

  }




  this.minusNum = async (inde, item, setpage, page) => {
    if (route.name == 'ChildFood') {
      let h = [...p.foodMap.get(route.params.id)]
      let index = p.foodMap.get(route.params.id).findIndex(f => f._id == item._id)
      h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      let allfood = [...p.allfood]
      let fnd = allfood.findIndex((f) => f._id === item._id)
      if (!allfood[fnd]) {
        allfood.push(h[index])
        p.setallfood(allfood)
      }
      else {
        allfood[fnd] = h[index]
        p.setallfood(allfood)
      }
      p.map.set(item._id + '1', item._id)

      p.map.set(item._id, JSON.stringify(h[index]))
      if (h[index].num == 0) {
        let gg = p.totalTitle.filter((t) => t != item._id)
        p.settotalTitle(gg)
        p.map.delete(item._id + '1')
      }
      p.foodMap.set(route.params.id, h)

      setpage(page)
      const offset = (page - 1) * p.pageLimit
      const currentCountries = h.slice(offset, offset + p.pageLimit)
      p.setcurrent(currentCountries)
      setpage(page)


      p.setshow1(!p.show1)
    }
    if (route.name == 'FinallFoodPayment') {
      let h = [...p.allfood]
      let index = h.findIndex(f => f._id == item._id)
      h[index].num = h[index].num - 1
      h[index].total = item.price * h[index].num
      p.map.set(item._id, JSON.stringify(h[index]))

      let f = p.foodMap.get(h[index].refId)
      let fIndex = f.findIndex((f) => (f._id === h[index]._id))
      f[fIndex].num = h[index].num
      p.foodMap.set(h[index].refId, f)

      p.setshow1(!p.show1)
      if (h[index].num == 0) {
        let gg = p.totalTitle.filter((t) => t != item._id)
        p.settotalTitle(gg)
        p.map.delete(item._id + '1')
      }
    }
  }



  this.deleteStorage = async () => {
    try {
      for (let i of p.foods) {
        const { data } = await getallchildfood(i._id)
        for (let item of data.child) {
          p.map.delete(item._id)
          p.map.delete(item._id + '1')
        }

        p.map.delete('sum')
        p.map.delete('allprice')
        p.setallprice(0)
        p.setallfood([])
        p.settotalTitle([])
        p.setshow1(!p.show1)
      }
    }
    catch (err) { console.log(err); }
  }




  this.getsinglefood = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          const { data } = await getsinglechildfood(id, id2)
          p.setsinglefood(data.child)
          p.setpermission(data.permission)
        }
        catch (err) { console.log(err); }
      })()
      return () => (
        p.setsinglefood({}),
        p.setpermission(false),
        p.setallcomment([])
      )

    }, []))
  }


  this.setHeader = () => {
    useFocusEffect(useCallback(() => p.navigation.setOptions({
      headerLeft: !p.showForm2 && !p.showForm ? Platform.OS === 'ios'? header :null  : () => <></>
    }), [p.showForm, p.showForm2]))

  }

  this.getImageProfile = () => {
    useFocusEffect(
      useCallback(() => {
        (async () => {
          await getProfile().then(({ data }) => {
            data?.uri && p.setimageProfile(data.uri)
          })
        })()
      }, [p.allcomment])
    )
  }


  this.getCommentSingle = async () => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          console.log('getCommentSingle')
          const { data } = await getcommentchildfood(id, id2)

          p.setallcomment(data.comment)
        }
        catch (err) { console.log(err); }
      })()
    }, [p.showForm, p.showForm2, p.changeComment]))

    useFocusEffect(useCallback(() => {
      return () => {
        p.setshowForm(false)
        p.setshowForm2(false)
        p.setallcomment([])
      }
    }, []))
  }



  this.sendComment = async () => {
    try {

      await createcommentchildfood(id, id2, {
        starId: p.tokenValue.userId,
        fullname: p.tokenValue.fullname,
        imageUrl: p.imageProfile,
        message: p.message,
        allstar: Number(p.allstar),
        id: p.singlefood._id
      })
      p.setstar1(false),
        p.setstar2(false),
        p.setstar3(false),
        p.setstar4(false),
        p.setstar5(false),
        p.setfullname(''),
        p.setemail(''),
        p.setmessage(''),
        p.setshowForm2(false)
    }
    catch (err) { console.log(err) }
  }



  this.editComment = async id3 => {
    try {
      let { status } = await editcomment(id, id2, id3, { message: p.message, allstar: p.allstar })
      p.setstar1(false)
      p.setstar2(false)
      p.setstar3(false)
      p.setstar4(false)
      p.setstar5(false)
      p.setemail('')
      p.setmessage('')
      p.setshowForm(false)
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
              await deletecomment(id, route.params.id2, id3,p.tokenValue.userId)
              p.setchangeComment(!p.changeComment)
            }
          }
        ]
      );


    }
    catch (err) { console.log(err); }
  }



  this.getEditComment = (id3) => {
    useFocusEffect(useCallback(() => {
      (async () => {
        try {
          const { data } = await getcommentsinglefood(id, id2, id3)
          p.setmessage(data.comment.message)
          p.setallstar(data.comment.allstar)
          if (data.comment.allstar == 1) p.setstar1(true)
          if (data.comment.allstar == 2) p.setstar1(true), p.setstar2(true)
          if (data.comment.allstar == 3) p.setstar1(true), p.setstar2(true), p.setstar3(true)
          if (data.comment.allstar == 4) p.setstar1(true), p.setstar2(true), p.setstar3(true), p.setstar4(true)
          if (data.comment.allstar == 5) p.setstar1(true), p.setstar2(true), p.setstar3(true), p.setstar4(true), p.setstar5(true)
        } catch (err) { console.log(err); }
      })()

    }, []))
  }



  this.pressIconEdit = (id) => {
    p.setshowForm(true)
    p.setid3(id)
    p.setstar1(false)
    p.setstar2(false)
    p.setstar3(false)
    p.setstar4(false)
    p.setstar5(false)
  }



  this.backHandler = async () => {
    try {
      if (Platform.OS === 'android') {

        useFocusEffect(useCallback(() => {
          let current = 0
          BackHandler.addEventListener("hardwareBackPress", () => {
            if (route.name === 'Home' && p.navigation?.getState()?.index === 0) {
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
          
          
        }, []))
      }
      else return null

      return()=> Platform.OS === 'android' && BackHandler.removeEventListener('hardwareBackPress')
    }
    catch (err) { console.log(err) }
  }


  this.payment = async () => {
    const { data } = await payment(
      p.allprice,
      {
        foods: JSON.stringify(p.totalTitle),
        plaque: p.plaque,
        floor: p.floor,
        formattedAddress: p.revers.formattedAddress,
        streetName: p.revers.streetName,
        origin: JSON.stringify(p.revers)
      }
    )
    console.log('props.totalTitle', p.totalTitle);
    p.revers.formattedAddress !== NaN && p.navigation.navigate("Payment", { uri: data })


    // await Linking.openURL(data)
  }



}



//home
export const home = (props) => {
  useMemo(() => {
    (async () => {
      let newNotification = await localStorage.getItem('notification')
      const { data } = await notification()
      if (data)
        if (data.message && newNotification !== data.message) {
          create(data.title, data.message, require('../assets/a1.png'))
          await localStorage.setItem('notification', data.message)
        }
    })();

    setInterval(async () => {
      (async () => {
        let newNotification = await localStorage.getItem('notification')
        const { data } = await notification()
        if (data)
          if (data.message && newNotification !== data.message) {
            create(data.title, data.message, require('../assets/a1.png'))
            await localStorage.setItem('notification', data.message)
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


