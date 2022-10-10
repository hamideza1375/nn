import React from "react";
import { Image, Platform } from "react-native";
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
import { context, state } from "./utils/context/contexts";
import Chat from "./socket/Chat";
import Address from "./screens/food/Address";
import DeleteAllAddress from "./screens/food/DeleteAllAddress";
import { home } from "./state/foodState";
import { Layout, header } from "./Layout";
import ChangeAdmin from "./screens/admin/ChangeAdmin";


const Tab = createNativeStackNavigator()
const App = () => {
  const { allState } = state()
  home(allState)



  return (
    allState.splash ?
      <Image source={require('./assets/images/a2.jpg')} style={{ width: '100%', height: '100%' }} />
      :
      <context.Provider value={allState}>
        <Tab.Navigator screenOptions={{ headerShown: false }}>

          <Tab.Group screenOptions={{ headerShown: true, headerLeft: Platform.OS === 'ios' ? header : null }}>
            <Tab.Screen name="Home" options={{ headerLeft: () => <></> }} children={(props) => <Layout {...props}  {...allState} ><Home {...props} {...allState} /></Layout>} />
            <Tab.Screen name="ChildFood" children={(props) => <Layout {...props}  {...allState} ><ChildFood {...props} {...allState} /></Layout>} />
            <Tab.Screen name="SingleFood" children={(props) => <Layout {...props}  {...allState} ><SingleFood {...props} {...allState} /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: false, headerLeft: header, headerBackVisible: false }} >
            <Tab.Screen name="Register" children={(props) => <Layout {...props}  {...allState} ><Register {...props} {...allState} _key='120' /></Layout>} />
            <Tab.Screen name="Login" children={(props) => <Layout {...props}  {...allState} ><Login {...props} {...allState} _key='120' /></Layout>} />
            <Tab.Screen name="ForgetPass" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><ForgetPass {...props} {...allState} /></Layout>} />
            <Tab.Screen name="ResetPass" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><ResetPass {...props} {...allState} /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: false, headerLeft: Platform.OS === 'ios' ? header : null }} >
            <Tab.Screen name="Profile" children={(props) => <Layout {...props}  {...allState} ><Profile {...props} {...allState} _key='100' /></Layout>} options={{ headerShown: false }} />
            <Tab.Screen name="FinallFoodPayment" children={(props) => <Layout {...props}  {...allState} ><FinallFoodPayment {...props} {...allState} _key='100' /></Layout>} />
            <Tab.Screen name="Logout" children={(props) => <Layout {...props}  {...allState} ><Logout {...props} {...allState} /></Layout>} />
            <Tab.Screen name="Payment" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><Payment {...props} {...allState} /></Layout>} />
            <Tab.Screen name="ListAvailable" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><ListAvailable {...props} {...allState} /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: true, headerLeft: Platform.OS === 'ios' ? header : null }} >
            <Tab.Screen name="AdminTitleAllFood" children={(props) => <Layout {...props}  {...allState} ><AdminTitleAllFood {...props} {...allState} /></Layout>} />
            <Tab.Screen name="AdminChildTable" children={(props) => <Layout {...props}  {...allState} ><AdminChildTable {...props} {...allState} /></Layout>} />
            <Tab.Screen name="EditChildFood" children={(props) => <Layout {...props}  {...allState} ><EditChildFood {...props} {...allState} /></Layout>} />
            <Tab.Screen name="EditTitleAllFood" children={(props) => <Layout {...props}  {...allState} ><EditTitleAllFood {...props} {...allState} /></Layout>} />
            <Tab.Screen name="CreateTitleAllFood" children={(props) => <Layout {...props}  {...allState} ><CreateTitleAllFood {...props} {...allState} /></Layout>} />
            <Tab.Screen name="CreateChildFood" children={(props) => <Layout {...props}  {...allState} ><CreateChildFood {...props} {...allState} /></Layout>} />
            <Tab.Screen name="AddAdmin" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><AddAdmin {...props} {...allState} /></Layout>} />
            <Tab.Screen name="Notifee" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><Notifee {...props} {...allState} /></Layout>} />
            <Tab.Screen name="ChangeAdmin" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><ChangeAdmin {...props} {...allState} /></Layout>} />
            <Tab.Screen name="Address" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><Address {...props} {...allState} /></Layout>} />
            <Tab.Screen name="DeleteAdmin" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><DeleteAdmin {...props} {...allState} /></Layout>} />
            <Tab.Screen name="DeleteAllAddress" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><DeleteAllAddress {...props} {...allState} /></Layout>} />
          </Tab.Group>

          <Tab.Group screenOptions={{ headerShown: true, headerLeft: Platform.OS === 'ios' ? header : null, headerStyle: { backgroundColor: '#25f2', } }} >
            <Tab.Screen name="Chat" children={(props) => <Chat {...props} {...allState} />} />
          </Tab.Group>

          <Tab.Screen name="Location" options={{ headerShown: true }} children={(props) => <Layout {...props}  {...allState} ><Location {...props} {...allState} /></Layout>} />

        </Tab.Navigator>
      </context.Provider>
  )
}

export default App;

