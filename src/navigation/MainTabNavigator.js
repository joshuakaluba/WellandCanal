import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import Colors from "../constants/Colors";
import {
  BridgeStatusScreen,
  FavoritesScreen,
  UpcomingClosuresScreen,
  MapScreen,
  BulletinScreen
} from "../screens";

import ReserveScreen from '../screens/ReserveScreen';

const FavoritesScreenStack = createStackNavigator({
  Links: FavoritesScreen
});

FavoritesScreenStack.navigationOptions = {
  tabBarLabel: "Favorites",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-star" : "md-star"}
    />
  )
};

const BridgeStatusScreenStack = createStackNavigator({
  Links: BridgeStatusScreen
});

BridgeStatusScreenStack.navigationOptions = {
  tabBarLabel: "Bridge Status",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-boat" : "md-boat"}
    />
  )
};

const UpcomingClosuresScreenStack = createStackNavigator({
  Links: UpcomingClosuresScreen
});

UpcomingClosuresScreenStack.navigationOptions = {
  tabBarLabel: "Upcoming Closures",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-square" : "md-square"}
    />
  )
};

const MapScreenStack = createStackNavigator({
  Links: MapScreen
});

MapScreenStack.navigationOptions = {
  tabBarLabel: "Map Status",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-map" : "md-map"}
    />
  )
};

const BulletinScreenStack = createStackNavigator({
  Bulletin: BulletinScreen
});

BulletinScreenStack.navigationOptions = {
  tabBarLabel: "Bulletin",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-apps" : "md-apps"}
    />
  )
};

const ReserveScreenStack = createStackNavigator({
  Reserve: ReserveScreen
});

ReserveScreenStack.navigationOptions = {
  tabBarLabel: "Reserve",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-calendar" : "md-apps"}
    />
  )
};

export default createBottomTabNavigator(
  {
    //ReserveScreenStack,
    FavoritesScreenStack,
    BridgeStatusScreenStack,
    UpcomingClosuresScreenStack,
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
