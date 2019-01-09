import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator
} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';
import BridgeStatusScreen from '../screens/BridgeStatusScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import BridgeClosureScreen from '../screens/BridgeClosureScreen';
import MapScreen from '../screens/MapScreen';

const FavouritesScreenStack = createStackNavigator({
	Links: FavouritesScreen
});

FavouritesScreenStack.navigationOptions = {
	tabBarLabel: 'Favourites',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
		/>
	)
};

const BridgeStatusScreenStack = createStackNavigator({
	Links: BridgeStatusScreen
});

BridgeStatusScreenStack.navigationOptions = {
	tabBarLabel: 'Bridge Status',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-boat' : 'md-boat'}
		/>
	)
};

const BridgeClosureScreenStack = createStackNavigator({
	Links: BridgeClosureScreen
});

BridgeClosureScreenStack.navigationOptions = {
	tabBarLabel: 'Upcoming Closures',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-square' : 'md-square'}
		/>
	)
};

const MapScreenStack = createStackNavigator({
	Links: MapScreen
});

MapScreenStack.navigationOptions = {
	tabBarLabel: 'Map Status',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-map' : 'md-map'}
		/>
	)
};

export default createBottomTabNavigator(
	{
		FavouritesScreenStack,
		BridgeStatusScreenStack,
		BridgeClosureScreenStack,
		MapScreenStack
	},
	{
		tabBarOptions: {
			activeTintColor: Colors.tabActiveTintColor,
			inactiveTintColor: Colors.tabInactiveTintColor,
			style: {
				backgroundColor: Colors.tabBackgroundColor
			}
		}
	}
);
