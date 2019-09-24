import { AsyncStorage, Vibration } from "react-native";

const FAV_STORAGE_KEY = "WELLAND_CANAL_FAV_KEY";

export default Favorites = {
  async saveFavorites(favoriteId) {
    let favorites = await this.getFavorites();
    favorites.push({ id: favoriteId });
    await AsyncStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
  },

  async removeFavorite(favoriteId) {
    const favorites = await this.getFavorites();
    var filtered = favorites.filter(favorite => {
      return favorite.id != favoriteId;
    });

    await AsyncStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(filtered));
  },

  async getFavorites() {
    const favorites = await AsyncStorage.getItem(FAV_STORAGE_KEY);
    if (favorites && favorites.length > 0) {
      return JSON.parse(favorites);
    }
    return [];
  },

  async handleFavoritesClick(item) {
    Vibration.vibrate(200);
    const favorites = await this.getFavorites();
    console.log(item);

    var result = favorites.find(obj => {
      return obj.id === item.bridge_id;
    });

    if (!result) {
      console.log(`Saving: ${item.bridge_id}`);
      await this.saveFavorites(item.bridge_id);      
    } else {
      console.log(`Removing: ${item.bridge_id}`);
      await this.removeFavorite(item.bridge_id);
    }
  }

};