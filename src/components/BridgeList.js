import React from "react";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import FavoriteButton from "./FavoriteButton";

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import { StringDictionary } from "../constants";

export default class BridgeList extends React.Component {
  static propTypes = {
    bridges: PropTypes.array.isRequired,
    noOutputText: PropTypes.string.isRequired,
    onItemPress: PropTypes.func.isRequired
  };

  getBackgroundColor(status) {
    return status.toLowerCase() === "available"
      ? Colors.success
      : Colors.danger;
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {this.props.bridges.map(item => (
          <View key={item.id} style={styles.container}>
            <View style={styles.row}>
              <Text
                style={{
                  width: "70%",
                  fontWeight: "bold",
                  fontSize: 15,
                  color: this.getBackgroundColor(item.status)
                }}
              >
                {item.location}
              </Text>
              <Text
                style={[
                  styles.defaultText,
                  { width: "30%", textAlign: "right" }
                ]}
              >
                {item.name}
              </Text>
            </View>

            <View style={styles.row}>
              <Text
                style={[
                  styles.defaultText,
                  { fontWeight: "bold", width: "70%", fontSize: 14 }
                ]}
              >
                {item.status}
              </Text>
              <View style={{ width: "30%", alignItems: "flex-end" }}>
                <TouchableOpacity onPress={() => this.props.onItemPress(item)}>
                  <FavoriteButton bridge_id={item.bridge_id} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              {item.nextClosure && item.nextClosure.length > 3 && (
                <Text style={[styles.defaultText]}>
                  {StringDictionary.nextClosure}
                </Text>
              )}
              <Text style={[styles.defaultText, styles.closureText]}>
                {item.nextClosure}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: Colors.listBackgroundColor,
    alignItems: "flex-start"
  },
  defaultText: {
    color: Colors.darkGrey
  },
  closureText: {
    fontWeight: "bold"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10
  },
  scrollView: {
    marginLeft: 15,
    marginRight: 15
  },
  noResults: {
    marginLeft: 15,
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold"
  }
});
