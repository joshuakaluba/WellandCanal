import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import * as Icon from "@expo/vector-icons";
import { Colors } from "../constants";
import { Favorites } from "../utilities";

export default class FavoriteButton extends React.Component {
  static propTypes = {
    bridge_id: PropTypes.number.isRequired
  };

  state = {
    stared: false
  };

  async componentWillMount() {
    let stared = false;

    const currentFavorites = await Favorites.getFavorites();

    const favorite = currentFavorites.find(favorite => {
      return favorite.id === this.props.bridge_id;
    });

    if (favorite) {
      stared = true;
    }

    this.setState({ stared });
  }

  render() {
    return (
      <View>
        {this.state.stared && this.state.stared == true ? (
          <Icon.AntDesign name={"star"} size={30} color={Colors.orange} />
        ) : (
          <Icon.AntDesign name={"staro"} size={30} color={Colors.darkGrey} />
        )}
      </View>
    );
  }
}
