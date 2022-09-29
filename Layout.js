import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Platform, Animated, NativeModules, Text, Pressable } from 'react-native';
import { state } from "./state/utils/contexts";


export const Layout = (props) => {
	const navigation = useNavigation();
	// const { StatusBarManager } = NativeModules;
	// console.log( navigation.getCurrentRoute()?.name);
	return (
		<Animated.View style={[
			Platform.OS === 'ios' ?
				props.width < props.height ?
					{ paddingTop: 40, flex: 1, backgroundColor: navigation.getCurrentRoute()?.name === 'Profile' ? '#bbf' : '#fff' }
					:
					{ paddingHorizontal: 40 / 1.5, paddingTop: 10, flex: 1, backgroundColor: navigation.getCurrentRoute()?.name === 'Profile' ? '#bbf' : '#fff' } : { flex: 1 }]} >
			{props.children}
		</Animated.View>
	)
}

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
// getCurrentRoute
