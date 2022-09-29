import React from "react";
import { View } from 'react-native';
import { userState } from "../../state/userState";

const Logout = (p) => {
  const _user = new userState(p)
  _user.logout()
  return <View />;
};
export default Logout;
