import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {Colors} from '../constants';
import * as Icon from "@expo/vector-icons";

export default class NoDataCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Icon.Entypo 
        name={this.props.icon} 
        size={35} 
        color={Colors.lightGrey} />
        <Text style={styles.noRecords}>
          {this.props.noDataOutput}
        </Text>        
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  card: {
    margin: 15,
    paddingTop: 50,
    paddingBottom: 50,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft:25,
    paddingRight:25,
    borderColor: Colors.lightGrey,
    borderWidth: 2,
    borderRadius: 12
  },
  noRecords: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 30,
    textAlign:'center',
    color: Colors.darkGrey
  }
});
