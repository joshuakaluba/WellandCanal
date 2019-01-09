import {
  AsyncStorage,
  Vibration
} from "react-native";

const favAsyncKey = 'WellandCanalFavouritesStorageKey';

export default {

  async saveFavourites(favToSav) {

    let favourites = await this.getSplitFavourites();

    if (!favourites.includes(`${favToSav}`)) {
      let favString = await this.getFavourites();

      var newFav = `${favString}|${favToSav}|`;

      newFav = newFav.replace("||", "|");

      await AsyncStorage.setItem(favAsyncKey, newFav);
    }
  },

  async removeFav(favouriteToRemove) {

    let favourites = await this.getSplitFavourites();

    while ((i = favourites.indexOf(`${favouriteToRemove}`)) != -1) {
      favourites.splice(i, 1);
    }

    await AsyncStorage.removeItem(favAsyncKey, );

    for (i = 0; i < favourites.length; i++) {
      await this.saveFavourites(favourites[i]);
    }
  },

  async getFavourites() {

    let value = await AsyncStorage.getItem(favAsyncKey) || "|";
    return value;
  },

  async getSplitFavourites() {

    let favourite = await this.getFavourites();
    favourite = favourite.substring(1, favourite.length - 1);
    let value = favourite.split('|');

    if (value.length < 1) {
      return {};
    }

    return value;
  },

  async handleFavouritesClick(item) {

    Vibration.vibrate(200);
    const favs = await this.getSplitFavourites();
    let found = false;

    for (i = 0; i < favs.length; i++) {
      if (favs[i] == item.bridge_id) {
        found = true;
        break;
      }
    }
    if (found == false) {
      await this.saveFavourites(item.bridge_id);
    } else {
      await this.removeFav(item.bridge_id);
    }
  }
};
