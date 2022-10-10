import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Text, TextInput, View } from 'react-native';
import GetLocation from 'react-native-get-location';
import Frame from '../../Components/Frame';
import { localhost } from '../../utils/axios/axios'


console.disableYellowBox = true

const Location = (p) => {

  const {allprice, totalTitle} = p

  const [token, settoken] = useState({})

  const [region, setregion] = useState({
    lat: 36.214174234928924,
    lng: 57.68491965736432,
  })


  useEffect(() => {
    (async () => {
      const _token = await AsyncStorage.getItem("token");
      settoken(_token)
    })()
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 15000,
    })
      .then(location => {
        setregion({
          lat: location.latitude,
          lng: location.longitude,
        })
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })

  }, [])



  return (
    <View flex={1}>
      <Frame source={{
        html: `
      
<html>


<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://192.168.42.42/css/bootstrap.css" />
    <link rel="stylesheet" href="http://192.168.42.42/css/leaflet.css" />
    <link rel="stylesheet" href="http://192.168.42.42/css/fontawesome.css" integrity="sha512-PIAUVU8u1vAd0Sz1sS1bFE5F1YjGqm/scQJ+VIUJL9kNa8jtAWFUDMu5vynXPDprRRBqHrE8KKEsjA7z22J1FA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>


<div style="display: flex; justify-content: flex-end; height: 100%; ">

  <form id="formSearch" onsubmit="submited(event)"
    style="width:250px;margin: 3px 2px 0 0; display:flex;flex-direction: row-reverse; position: absolute; align-items: flex-end; ">
    <input onchange="serchInput(event.target.value)" type="text" placeholder="search"
      style="text-align: right;border-radius: 1px;border: 1px solid rgb(150, 146, 146);display:block;flex-grow: 1;height: 30.5px;position:relative;z-index:1000" />
    <i onclick="sendIcon()" class="fa fa-search"
      style="border-radius: 1px;padding: 5px 5px 0px;border: 1px solid rgb(150, 146, 146); background-color: #fff;font-size: 19px;display:block;height: 30px;width: 30px;position:relative;z-index:1000"></i>
      
      </form>

      <button id='btnGetLocation' onclick="setLocation()" style='right:2px;background:#fff;padding:2px;border-radius:5px;z-index:10000;position:absolute;top:40px;' >[+]</button>
    
      <div id='bottomDiv' style='z-index:10000;position:absolute;bottom:0;display:flex;justify-content:space-around;width:100%;background:#fff;padding:10px 0;flex-direction:row-reverse'>
      <span style='display:flex;' > <input type='number' style='text-align:center;width:40px;height:40px' id='plaque' /><p style='margin:7px 5px' > :پلاک </p> </span>
      <span style='display:flex;' > <input type='number' style='text-align:center;width:40px;height:40px' id='floor'/><p style='margin:7px 5px' >:طبقه </p></span>
      <button id='btnPayment' onclick="sendPayment()" style='border:1px solid #3af;right:2px;background:#3af;height:42px;width:75px;font-size:15px;color:#fff;border-radius:5px;' >پرداخت</button>
      </div>

      
      <div id="map" style="width:100%; height: 100vh;display:flex;"><div>
      <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="http://192.168.42.42/js/leaflet.js"></script>
      <script>
      
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios.defaults.headers.common["Authorization"] = ${JSON.stringify(token)}

      const origin = ${JSON.stringify(p.route.params?.origin)}

      let revers = {}

      document.getElementById('btnPayment').style.display = origin && 'none'
      document.getElementById('btnGetLocation').style.display = origin && 'none'
      document.getElementById('formSearch').style.display = origin && 'none'
      document.getElementById('bottomDiv').style.display = origin && 'none'



        function submited(event) {
          event.preventDefault()
          sendIcon()
        }
        let show = true
        let search

        function serchInput(text) { search = text }

        let mark = origin?{ lat: origin.latitude, lng: origin.longitude }:{ lat: ${region.lat}, lng: ${region.lng} }
        let option = { center: mark, zoom: 17, }
        var myIcon = L.icon({ iconUrl: '${localhost}/images/mark.png', iconSize: [38, 95], iconAnchor: [22, 94], popupAnchor: [-3, -76], shadowSize: [68, 95], shadowAnchor: [22, 94], });
        let markerOption = { draggable: origin?false:true, icon: myIcon }

        var map = L.map('map', option)
        map.on('click', (ev) => { marker.openPopup() })
        let marker = L.marker(mark, markerOption).addTo(map)
        var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        map.addLayer(layer);



        window.addEventListener('load', async (ev) => {
          const response = await axios.post('${localhost}/reverse', JSON.stringify(mark),{ headers: { 'Content-Type': 'application/json' } })
          if (response.status) {
            const data = await response.data
            if (data[0]) {
              const one = (data[0].streetName && data[0].streetName !== data[0].formattedAddress.split(",")[0]) ? data[0].streetName : ''
              const two = data[0].formattedAddress.split(",")[0] ? data[0].formattedAddress.split(",")[0] : ''
              const three = data[0].formattedAddress.split(",")[1] ? data[0].formattedAddress.split(",")[1] : ''
              revers = data[0]
              const street = one + ' ' + two + ' ' + three
              marker.bindPopup(street).openPopup()

              setTimeout(()=>{marker.bindPopup(street).openPopup()},1500)
              
            }
          }
        })


        marker.on('dragend', async (ev) => {
          map.setView({ lat: ev.target._latlng.lat, lng: ev.target._latlng.lng })
          const response = await axios.post('${localhost}/reverse', JSON.stringify({ lat: ev.target._latlng.lat, lng: ev.target._latlng.lng }),{ headers: { 'Content-Type': 'application/json' } })
          if (response.status) {
            const data = await response.data
            if (data[0]) {
              const one = (data[0].streetName && data[0].streetName !== data[0].formattedAddress.split(",")[0]) ? data[0].streetName : ''
              const two = data[0].formattedAddress.split(",")[0] ? data[0].formattedAddress.split(",")[0] : ''
              const three = data[0].formattedAddress.split(",")[1] ? data[0].formattedAddress.split(",")[1] : ''
              revers = data[0]
              const street = one + ' ' + two + ' ' + three
              marker.bindPopup(street).openPopup()
            }
          }
        });


        async function sendIcon(data) {
          const response = await fetch('${localhost}/geocode', { method: 'post', body: JSON.stringify({ loc: 'سبزوار' + ' ' + search }), headers: { 'Content-Type': 'application/json' } })
          if (response.status) {
            const data = await response.json()
            if (data[0]) {
              const one = (data[0].streetName && data[0].streetName !== data[0].formattedAddress.split(",")[0]) ? data[0].streetName : ''
              const two = data[0].formattedAddress.split(",")[0] ? data[0].formattedAddress.split(",")[0] : ''
              const three = data[0].formattedAddress.split(",")[1] ? data[0].formattedAddress.split(",")[1] : ''
              revers = data[0]
              const street = one + ' ' + two + ' ' + three
              map.setView({ lat: data[0].latitude, lng: data[0].longitude });
              marker.setLatLng({ lat: data[0].latitude, lng: data[0].longitude })
              marker.bindPopup(street.trim() ? street : '!پیدا نشد').openPopup()
              search = ''
            }
            else marker.bindPopup('!پیدا نشد ').openPopup()
          }
        }

        function setLocation(){
          map.setView({ lat: ${region.lat}, lng: ${region.lng} });
                marker.setLatLng({ lat: ${region.lat}, lng: ${region.lng} })
              
        }


        async function sendPayment(){
         if(!document.getElementById('plaque').value || !document.getElementById('floor').value) alert('کادر پلاک و طبقه را پر کنید')
          let {data, status} = await axios.post('${localhost}/confirmpayment?allprice=${allprice}', {
            foods: ${JSON.stringify(totalTitle)},
            plaque: document.getElementById('plaque').value,
            floor: document.getElementById('floor').value,
            formattedAddress: JSON.stringify(revers.formattedAddress),
            streetName: JSON.stringify(revers.streetName),
            origin: JSON.stringify(revers)
          })

          if(status === 200) window.location.assign(data)
          else if(status === 385) alert('کادر پلاک و طبقه را پر کنید')
          else if(status === 500) alert('مشکلی از سمت سرور پیش آمد')

        }

      </script>

    </div>

</html>

      `}} />

    </View>
  )
}

export default Location;