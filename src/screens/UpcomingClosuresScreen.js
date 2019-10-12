import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import * as Icon from "@expo/vector-icons";
import { BridgesRepository } from "../dataaccesslayer";
import { Colors, StringDictionary, AdmobIds } from "../constants";
import {NoDataCard} from '../components';
import {Lib} from '../utilities';

const outputStr = StringDictionary.noClosuresFound;

class UpcomingClosuresScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    onPress = () => {
      params.handleRefresh();
    };

    return {
      title: StringDictionary.upComingClosures,
      headerStyle: { backgroundColor: Colors.headerBackgroundColor },
      headerTintColor: Colors.headerTintColor,
      headerTitleStyle: { fontWeight: "bold" },
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

  state = {
    closures: [],
    loading: false,
    outputStr: outputStr
  };

  async componentWillMount() {
    this.props.navigation.setParams({
      handleRefresh: this.resetScreen.bind(this)
    });

    await this.resetScreen();
  }

  async resetScreen() {
    try {
      this.startLoading();

      let closures = await BridgesRepository.getBridgesClosures();

      this.setState({
        closures,
        outputStr: outputStr
      });

      this.endLoading();
    } catch (error) {
      this.setState({
        closures: [],
        loading: false,
        outputStr: error.message
      });
    }
  }

  bannerError(error) {
    Lib.showError(error);
  }

  render() {
    var output = {};

    if (this.state.closures.length > 0) {
      output = (
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.resetScreen.bind(this)}
            />
          }
        >
          {this.state.closures.map(item => (
            <View key={item.id} style={styles.row_container}>
              <View style={styles.row}>
                <Text
                  style={[
                    {
                      width: "70%",
                      fontWeight: "bold",
                      fontSize: 15,
                      color: Colors.danger
                    }
                  ]}
                >
                  {item.bridge_location}
                </Text>
                <Text style={[styles.defaultText, { width: "30%" }]}>
                  {item.name}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.defaultText}>
                  Impact: {item.closed_for}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.defaultText}>{item.purpose}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.defaultText}>{item.time_string}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    } else {
      output = <NoDataCard noDataOutput={StringDictionary.noUpcomingClosures} icon="emoji-happy" />;
    }

    return (
      <View style={styles.container}>
        <View style={[styles.box, styles.body]}>{output}</View>
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
export default UpcomingClosuresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  row_container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: Colors.listBackgroundColor,
    alignItems: "flex-start"
  },
  defaultText: {
    color: Colors.darkGrey
  },
  scrollView: {
    marginLeft: 15,
    marginRight: 15
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10
  },
  no_closures: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold"
  },
  box: {
    flex: 1
  },
  body: {
    flex: 10
  },
  footer: {
    flex: 1.5,
    marginTop: "auto"
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  }
});
