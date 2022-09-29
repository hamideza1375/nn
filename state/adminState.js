import { useEffect, useCallback } from "react";
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { getSingleTitleFoods, editfood, createchildfood, createfood, deletechildfood, deletefood, getsinglechildfood, editchildfood, unAvailable, createNotification, listAvailable } from "../services/foodService";
import localStorage from '@react-native-async-storage/async-storage';


export function adminState(props) {

  const route = useRoute()
  const navigation = useNavigation()
  let id = route.params && route.params.id
  let id2 = route.params && route.params.id2



  // createfood
  this.createChild = async () => {
    await createchildfood(id, { title: props.title, price: props.price, imageUrl: props.imageUrl, info: props.info })
    props.setTitle('')
    props.setPrice('')
    props.setInfo('')
    props.setImageUrl('')
    props.setchangeFood(!props.changeFood)
    navigation.goBack()
    props.setchangeFood(!props.changeFood)
  }

  this.EditFood = async () => {
    useFocusEffect(useCallback(() => {
      let foodMap = props.foodMap.get(props.route.params.id2);
      return () => props.foodMap.set(props.route.params.id, foodMap)
    }, []))
    }

  // createfood



  // createpartfood
  this.createFoodAction = async () => {
    await createfood({ title: props.title, imageUrl: props.imageUrl })
    props.setchangeFood(!props.changeFood)
    props.setTitle('')
    props.setImageUrl('')
    navigation.goBack()
  }
  // createpartfood


  // DeleteFood
  this.deleteChildFoodAction = async (id, id2) => {
    await deletechildfood(id, id2)
    props.setchangeFood(!props.changeFood)
  }
  // DeleteFood

  this.deleteFoodAction = async (id) => {
    await deletefood(id)
    props.setchangeFood(!props.changeFood)
  }
  // DeleteFoods


  // EditeFood
  this.getEdit = async () => {
    useEffect(() => {
      (async () => {
        const { data } = await getsinglechildfood(id, id2)
        props.setTitle(data.child.title)
        props.setPrice(data.child.price.toString())
        props.setImageUrl(data.child.imageUrl)
        props.setInfo(data.child.info)
      })()
    }, [])
    useEffect(() => () => {
      props.setTitle('')
      props.setPrice('')
      props.setImageUrl('')
      props.setInfo('')
    }, [])
  }

  this.editeFoodAction = async () => {
   await editchildfood(id, id2, { title: props.title, price: props.price, imageUrl: props.imageUrl, info: props.info })
   props.setchangeFood(!props.changeFood)
   navigation.goBack()
  }

  this.unmountEditFood = async () => {
  useFocusEffect(useCallback(() => {
    let foodMap = props.foodMap.get(props.route.params.id2);
    return () => props.foodMap.set(props.route.params.id, foodMap)
  }, []))
  }

  // EditFood
  this.getFoodsEdit = async () => {
    useEffect(() => {
      (async () => {
        const { data } = await getSingleTitleFoods(id)
        props.setTitle(data.title)
      })()

      return () => {
        props.setTitle('')
      }
    }, [])
  }


  this.editeFoods = async () => {
    await editfood(id,{ title: props.title, imageUrl: props.imageUrl })
    navigation.goBack()
  }
  //EditeFoods



    this.available = async (available,id,id2) => {
    // let {data} = await unAvailable({ available }, id,id2)
    // await localStorage.setItem(id2,JSON.stringify(data) + ' ' + id)
    // let filter =[...props.foodMap.get(props.route.params.id)]
    // let fil = filter.findIndex((food) =>  food._id == id2 ) 
    // filter[fil].available = available
    // props.foodMap.set(route.params.id, filter)
    // const offset = (props.page - 1) * props.pageLimit
    // const currentCountries = filter.slice(offset, offset + props.pageLimit)
    // props.setcurrent(currentCountries)
    await unAvailable({ available }, id,id2)
    props.setchangeFood(!props.changeFood)
  }


  this.deleteUnmunt = async (id2) => {
    // let filter = props.foodMap.get(props.route.params.id).filter((food) =>  food._id !== id2 ) 
    // props.foodMap.set(route.params.id, filter)
    // const offset = ((props.page - 1)) * props.pageLimit
    // const currentCountries = filter.slice(offset, offset + props.pageLimit)
    // props.setcurrent(currentCountries)
    props.setchangeFood(!props.changeFood)

  }


  this.listAvailable = async () => {
  useEffect(() => {
    listAvailable().then(({ data }) => {
      props.setlist(data)
    })
  }, [props.showModal, props.id, props._id ])
  }



  this.sendAvailable = async () => {
    // let local = await localStorage.getItem(props.id2)
    // let id = local?.split(" ") && local.split(" ")[1]
    // let filter = [...props.foodMap.get(id)]
    // let fil = filter.findIndex((food) => food._id == props.id2)
    // if (filter[fil]?.available != true) {
    //   filter[fil].available = true
    //   props.foodMap.set(id, filter)
    //   const currentPage = Math.max(0, Math.min(1, filter.length))
    //   const offset = (currentPage - 1) * props.pageLimit
    //   const currentCountries = filter.slice(offset, offset + props.pageLimit)
    //   props.setcurrent(currentCountries)
    //   await localStorage.removeItem(props.id2)
    // }
    await unAvailable({ available: true }, props.id, props._id)
    props.setass(!props.ass)
    props.setShowModal(!props.showModal)
}




  this.notifee = async () => {
    await createNotification({title: props.title, message: props.info})
    navigation.goBack()
  }

}