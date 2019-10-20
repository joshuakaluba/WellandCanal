import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default (Layout = {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  componentWidth: 0.8 * width
});
