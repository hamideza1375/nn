import React, { useState } from "react";
import { View, Switch } from "react-native";

const App = (props) => {

  return (
      <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={props.isEnabled ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={() => props.setIsEnabled(!props.isEnabled)}
      value={props.isEnabled}
      {...props}
      />
  );
}


export default App;