import React from "react";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildFood from "./screens/food/ChildFood";
import SingleFood from "./screens/food/SingleFood";
import ForgetPass from "./screens/user/ForgetPass";
import ResetPass from "./screens/user/ResetPass";
import Payment from "./screens/user/Payment";
import Logout from "./screens/user/Logout";
import Login from "./screens/user/Login";
import Register from "./screens/user/Register";
import Home from "./screens/food/Home"
import Location from "./screens/user/Location"
import Profile from "./screens/user/Profile"
import AddAdmin from "./screens/admin/AddAdmin";
import DeleteAdmin from "./screens/admin/DeleteAdmin";
import Notifee from './screens/admin/Notifee';
import FinallFoodPayment from "./screens/food/FinallFoodPayment"
import AdminChildTable from "./screens/admin/AdminChildTable"
import AdminTitleAllFood from "./screens/admin/AdminTitleAllFood";
import EditChildFood from './screens/admin/EditChildFood';
import EditTitleAllFood from './screens/admin/EditTitleAllFood';
import CreateTitleAllFood from './screens/admin/CreateTitleAllFood';
import CreateChildFood from './screens/admin/CreateChildFood';
import ListAvailable from './screens/admin/ListAvailable';
import { context, state } from "./state/utils/contexts";
import Chat from "./socket/Chat";
import Address from "./screens/food/Address";
import DeleteAllAddress from "./screens/food/DeleteAllAddress";
import { home } from "./state/foodState";
import {Layout, header} from "./Layout";


const Tab = createNativeStackNavigator()
const App = () => {
  const { allState } = state()
  home(allState)

  return (
    allState.splash ?
      <Image source={require('./assets/images/a2.jpg')} style={{width:'100%',height:'100%'}} />
      :
      <context.Provider value={allState}>
        <Layout {...allState} >
          <Tab.Navigator screenOptions={{ headerShown: false }}>

            <Tab.Group screenOptions={{ headerShown: true, header, headerBackVisible: false }}>
              <Tab.Screen name="Home" options={{ header: () => <></> }} children={(props) => <Home {...props} {...allState} />} />
              <Tab.Screen name="ChildFood" children={(props) => <ChildFood {...props} {...allState} />} />
              <Tab.Screen name="SingleFood" children={(props) => <SingleFood {...props} {...allState} />} />
            </Tab.Group>

            <Tab.Group screenOptions={{ headerShown: false, header, headerBackVisible: false }} >
              <Tab.Screen name="Register" children={(props) => <Register {...props} {...allState} _key='120' />} />
              <Tab.Screen name="Login" children={(props) => <Login {...props} {...allState} _key='120' />} />
              <Tab.Screen name="ForgetPass" options={{ headerShown: true }} children={(props) => <ForgetPass {...props} {...allState} _key='120' />} />
              <Tab.Screen name="ResetPass" options={{ headerShown: true }} children={(props) => <ResetPass {...props} {...allState} _key='120' />} />
            </Tab.Group>

            <Tab.Group screenOptions={{ headerShown: false, header, headerBackVisible: false }} >
              <Tab.Screen name="Profile" children={(props) => <Profile {...props} {...allState} _key='100' />} options={{ headerShown: false }} />
              <Tab.Screen name="FinallFoodPayment" children={(props) => <FinallFoodPayment {...props} {...allState} _key='100' />} />
              <Tab.Screen name="Location" options={{ headerShown: true }} children={(props) => <Location {...props} {...allState} _key='100' />} />
              <Tab.Screen name="Logout" children={(props) => <Logout {...props} {...allState} />} />
              <Tab.Screen name="Payment" options={{ headerShown: true }} children={(props) => <Payment {...props} {...allState} />} />
              <Tab.Screen name="ListAvailable" options={{ headerShown: true }} children={(props) => <ListAvailable {...props} {...allState} />} />
            </Tab.Group>

            <Tab.Group screenOptions={{ headerShown: true, header, headerBackVisible: false, headerStyle: { backgroundColor: '#25f2', } }} >
              <Tab.Screen name="Chat" children={(props) => <Chat {...props} {...allState} />} _key='100' />
            </Tab.Group>

            <Tab.Group screenOptions={{ headerShown: true, header, headerBackVisible: false }} >
              <Tab.Screen name="AdminTitleAllFood" children={(props) => <AdminTitleAllFood {...props} {...allState} />} />
              <Tab.Screen name="AdminChildTable" children={(props) => <AdminChildTable {...props} {...allState} />} />
              <Tab.Screen name="EditChildFood" children={(props) => <EditChildFood {...props} {...allState} />} />
              <Tab.Screen name="EditTitleAllFood" children={(props) => <EditTitleAllFood {...props} {...allState} />} />
              <Tab.Screen name="CreateTitleAllFood" children={(props) => <CreateTitleAllFood {...props} {...allState} />} />
              <Tab.Screen name="CreateChildFood" children={(props) => <CreateChildFood {...props} {...allState} />} />
              <Tab.Screen name="AddAdmin" options={{ headerShown: true }} children={(props) => <AddAdmin {...props} {...allState} _key='120' />} />
              <Tab.Screen name="Notifee" options={{ headerShown: true }} children={(props) => <Notifee {...props} {...allState} _key='120' />} />
            </Tab.Group>

            <Tab.Screen name="Address" options={{ headerShown: true, header }} children={(props) => <Address {...props} {...allState} _key='120' />} />
            <Tab.Screen name="DeleteAdmin" options={{ headerShown: true }} children={(props) => <DeleteAdmin {...props} {...allState} _key='120' />} />
            <Tab.Screen name="DeleteAllAddress" options={{ headerShown: true }} children={(props) => <DeleteAllAddress {...props} {...allState} _key='120' />} />

          </Tab.Navigator>
        </Layout>

      </context.Provider>
  )
}






export default App;

