import React, { Component } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  DeviceEventEmitter,
  StyleSheet
} from "react-native";
import * as Icon from "@expo/vector-icons";
import { AdMobBanner } from "expo-ads-admob";
import { BridgesRepository } from "../dataaccesslayer";
import { Favorites, Lib } from "../utilities";
import Colors from "../constants/Colors";
import { BridgeList, NoDataCard } from "../components";
import AdmobIds from "../constants/AdmobIds";
import { StringDictionary } from "../constants";

const NO_FAVORITES = StringDictionary.noFavorites;

export default class FavoritesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    onPress = () => {
      params.handleRefresh();
    };

    return {
      title: StringDictionary.myFavorites,
      headerStyle: {
        backgroundColor: Colors.headerBackgroundColor
      },
      headerTintColor: Colors.headerTintColor,
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerRight: (
        <View style={{ marginBottom: -3, marginRight: 10 }}>
          <TouchableOpacity onPress={this.onPress}>
            <Icon.Ionicons
              name={"md-refresh"}
              size={26}
              color={Colors.iconDefault}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };

  startLoading() {
    this.setState({ loading: true });
  }

  endLoading() {
    this.setState({ loading: false });
  }

  async refreshHandler() {
    await this.resetScreen();
  }

  state = {
    bridges: [],
    loading: false,
    noOutputText: NO_FAVORITES,
    refreshControlLoading: false
  };

  async componentWillMount() {
    this.props.navigation.setParams({
      handleRefresh: this.refreshHandler.bind(this)
    });

    DeviceEventEmitter.addListener("favChangeRefresh", () => {
      this.resetScreen();
    });

    await this.resetScreen();
  }

  async resetScreen() {
    try {
      this.setState({
        bridges: []
      });

      this.startLoading();

      const bridges = await BridgesRepository.getBridgesStatus();
      const favorites = await Favorites.getFavorites();
      
      let filteredBridges = bridges.filter(function(bridge) {
        return favorites.some(function(favorite) {
          return favorite.id === bridge.bridge_id;
        });
      });

      this.setState({
        bridges: filteredBridges,
        noOutputText: NO_FAVORITES
      });

      this.endLoading();
    } catch (error) {
      Lib.showError(error);

      this.setState({
        bridges: [],
        noOutputText: error.message,
        loading: false
      });
    }
  }

  bannerError(error) {
    Lib.showError(error);
  }

  handleFavPress = async item => {
    await Favorites.handleFavoritesClick(item);
    await this.resetScreen();

    DeviceEventEmitter.emit("bridgeStatusRefresh");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, styles.body]}>
          <ScrollView
            style={{ marginBottom: 25 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this.resetScreen.bind(this)}
              />
            }
          >
            {this.state.bridges && this.state.bridges.length > 0 ? (
              <BridgeList
                bridges={this.state.bridges}
                noOutputText={this.state.noOutputText}
                onItemPress={this.handleFavPress}
              />
            ) : (
              <NoDataCard
                noDataOutput={StringDictionary.noFavorites}
                icon="emoji-sad"
              />
            )}
          </ScrollView>
        </View>
        <View style={[styles.box, styles.footer, { alignItems: "center" }]}>
          <AdMobBanner
            style={styles.bottomBanner}
            bannerSize="smartBannerPortrait"
            adUnitID={AdmobIds.banner}
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  box: {
    flex: 1
  },
  body: {
    flex: 10
  },
  footer: {
    flex: 1,
    marginTop: "auto",
    paddingBottom: 10
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  }
});
