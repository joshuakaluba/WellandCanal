//Supply your admob ids and rename this document to `AdmobIds.js`
import {
    Platform
} from 'react-native';

const androidClosureBannerId = "";
const androidFavouritesBannerId = "";
const iosClosureBannerId = "";
const iosFavouritesBannerId = "";

export default {
    closureBannerId: Platform.OS === 'ios' ? iosClosureBannerId : androidClosureBannerId,
    favouritesBannerId: Platform.OS === 'ios' ? iosFavouritesBannerId : androidFavouritesBannerId
}