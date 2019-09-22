import { AsyncStorage, Vibration } from "react-native";

const FAV_STORAGE_KEY = "WellandCanalFavoritesStorageKey";

export default (Favorites = {
  async saveFavorites(favToSav) {
    let favorites = await this.getSplitFavorites();

    if (!favorites.includes(`${favToSav}`)) {
      let favString = await this.getFavorites();

      var newFav = `${favString}|${favToSav}|`;

      newFav = newFav.replace("||", "|");

      await AsyncStorage.setItem(FAV_STORAGE_KEY, newFav);
    }
  },

  async removeFav(favoriteToRemove) {
    let favorites = await this.getSplitFavorites();

    while ((i = favorites.indexOf(`${favoriteToRemove}`)) != -1) {
      favorites.splice(i, 1);
    }

    await AsyncStorage.removeItem(FAV_STORAGE_KEY);

    for (i = 0; i < favorites.length; i++) {
      await this.saveFavorites(favorites[i]);
    }
  },

  async getFavorites() {
    let value = (await AsyncStorage.getItem(FAV_STORAGE_KEY)) || "|";
    return value;
  },

  async getSplitFavorites() {
    let favorite = await this.getFavorites();
    favorite = favorite.substring(1, favorite.length - 1);
    let value = favorite.split("|");

    if (value.length < 1) {
      return {};
    }

    return value;
  },

  async handleFavoritesClick(item) {
    Vibration.vibrate(200);
    const favorites = await this.getSplitFavorites();
    let found = false;

    for (i = 0; i < favorites.length; i++) {
      if (favorites[i] == item.bridge_id) {
        found = true;
        break;
      }
    }
    if (found == false) {
      await this.saveFavorites(item.bridge_id);
    } else {
      await this.removeFav(item.bridge_id);
    }
  }
});
