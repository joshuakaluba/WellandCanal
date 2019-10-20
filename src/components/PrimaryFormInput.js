import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput } from "react-native";
import { FormLabel, FormValidationMessage } from "react-native-elements";
import Layout from "../constants/Layout";

class PrimaryFormInput extends React.Component {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  };

  onFocus() {}

  onBlur() {}

  render() {
    var validationMessage;

    if (this.props.displayValidationMessage == true) {
      validationMessage = (
        <FormValidationMessage>
          {this.props.validationMessage}
        </FormValidationMessage>
      );
    }

    return (
      <View style={styles.container}>
        <FormLabel>{this.props.label}</FormLabel>
        <TextInput
          style={styles.input}
          editable={this.props.editable}
          onBlur={
            this.props.onBlur ? this.props.onBlur : this.onBlur.bind(this)
          }
          onFocus={
            this.props.onFocus ? this.props.onFocus : this.onFocus.bind(this)
          }
          placeholder={this.props.placeholder ? this.props.placeholder : ""}
          onChangeText={this.props.onChangeText}
          secureTextEntry={
            this.props.secureTextEntry ? this.props.secureTextEntry : false
          }
          autoCapitalize={
            this.props.autoCapitalize ? this.props.autoCapitalize : "none"
          }
        />
        {validationMessage}
      </View>
    );
  }
}

export default PrimaryFormInput;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    marginTop: 2,
    height: 40,
    marginHorizontal: 12,
    margin: 5,
    width: Layout.componentWidth,
    textAlign: "center",
    borderColor: "black",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 15,
    borderRadius: 10
  }
});
