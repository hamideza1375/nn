import React from "react";
import { Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";




export const header = () => {
  const navigation = useNavigation();
  return (
    <Pressable>
      <Text onPress={() => navigation.goBack()}
        style={{ fontSize: 32, marginTop: -5, paddingHorizontal: 5, paddingVertical: 2.5, width: 35 }}>
        {`»`}
      </Text>
    </Pressable>
  );
};
