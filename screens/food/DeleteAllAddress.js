import React from 'react'
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Button } from '../../Components/Html';
import { foodState } from '../../state/foodState';
import moment from "moment-jalaali";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Food.scss'
// import fa from "moment/src/locale/fa";
// moment.locale("fa", fa)
// moment.loadPersian({usePersianDigits: true})

const DeleteAllAddress = (p) => {
	const _food = new foodState(p)
	_food.getAllAddress()
	_food.totalAllAddress()
	const deleteAllAddress = () => _food.deleteAllAddress()

	return (
		<ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#eee' }} >
			<View style={styles.viewSearch}>
				<Icon name="search" size={20} color="#999" style={{ padding: 7, flex: 1 }} />
				<TextInput
					autoCapitalize='none'
					autoCorrect={false}
					spellCheck={true}
					value={p.textSearch}
					onChangeText={(text) => {
						p.settextSearch(text)
						const fd = p._address.filter(f => f.fullname.includes(text))
						p.setallAddress(fd)
					}}
					placeholder="جستجو غذا و نوشیدنی" style={styles.search}
				/>
			</View>
			<Button outline bgcolor='silver' onPress={{}} >
				جمع ماه گذشته از {p.oldPrice?.split("=") && p.oldPrice.split("=")[0]} = {p.oldPrice?.split("=") && _food.AllPrice(p.oldPrice.split("=")[1])} تومان</Button>
			<Button outline bgcolor='black' onPress={{}} > جمع از تاریخ {p._moment} = {_food.AllPrice(p.totalPrices)} تومان</Button>
			<Button bgcolor='red' onPress={() => deleteAllAddress()} >حذف همه</Button>
			{
				p.allAddress?.length ? p.allAddress.map((address, i) => (
					<View key={address._id} style={{
						alignSelf: 'center',
						borderWidth: .3,
						width: '90%',
						marginVertical: 15,
						paddingHorizontal: 15,
						paddingTop: 16,
						backgroundColor: '#f5f5f5',
						borderRadius: 4
					}}>
						<View style={{ borderBottomWidth: .2, paddingBottom: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }} >
							<Text ><Text style={[{
								fontWeight: 'bold',
								textAlign: 'left',
							}]} >نام: </Text>{address.fullname}</Text>
							<View flexDirection={'row'} ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >شماره تلفن: </Text><Text  >{address.phone}</Text></View>
						</View>
						<View style={{ borderBottomWidth: .2, padding: 15, width: '100%' }} >
							<Text  ><Text style={{ fontWeight: 'bold', textAlign: 'left' }} >آدرس: </Text>{address.formattedAddress?.split(",")[0] + address.formattedAddress?.split(",")[1]} , {address.streetName}</Text>
						</View>
						<View style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
							<Text  ><Text style={{ fontWeight: 'bold' }} >پلاک: </Text>{address.floor}</Text>
							<Text  ><Text style={{ fontWeight: 'bold' }} >طبقه: </Text>{address.plaque}</Text>
							<Text  ><Text style={{ fontWeight: 'bold' }} >شماره: </Text>{address.id}</Text>
						</View>
						<View onLayout={() => { if (i === p.allAddress.length - 1) p.set_moment(moment(address.createdAt).format('jM/jD')) }} style={{ borderBottomWidth: .2, paddingVertical: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }} >
							{/*  
							set_moment(moment(address.createdAt).format('jYYYY/jM/jD')) }} 
							 */}
							<Text  ><Text style={{ fontWeight: 'bold' }} >قیمت: </Text>{_food.AllPrice(address.price)}</Text>
							<Text style={{ color: '#ababab', }}>{moment(address.createdAt).format('jM/jD HH:mm')}</Text>
						</View>
					</View>
				)
				) : <></>
			}
		</ScrollView>
	)
}

export default DeleteAllAddress