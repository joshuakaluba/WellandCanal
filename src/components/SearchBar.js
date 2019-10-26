import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { TextInput, StyleSheet } from "react-native";
import { DeviceEventEmitter } from "react-native";

class SearchBar extends React.Component {
  static propTypes = {
    searchBridges: PropTypes.func.isRequired,
    initialSearchTerm: PropTypes.string.isRequired
  };
  state = {
    searchTerm: this.props.initialSearchTerm
  };

  componentWillMount() {
    DeviceEventEmitter.addListener("resetSearchBar", data => {
      this.handleChange("");
    });
  }

  searchBridges = searchTerm => {
    this.props.searchBridges(searchTerm);
    this.inputElement.blur();
  };

  debouncedSearchBridges = debounce(this.searchBridges, 500);

  handleChange = searchTerm => {
    this.setState(
      {
        searchTerm
      },
      () => {
        this.debouncedSearchBridges(this.state.searchTerm);
      }
    );
  };

  render() {
    return (
      <TextInput
        ref={inputElement => {
          this.inputElement = inputElement;
        }}
        value={this.state.searchTerm}
        placeholder="Search All Bridges"
        style={styles.input}
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
    margin: 5,
    paddingLeft: 15,
    borderColor: "black",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    borderRadius: 10
  }
});

export default SearchBar;
