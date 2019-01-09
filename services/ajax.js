import Bridges from '../constants/Bridges';
import util from './util';

const apiHost = 'https://canalstatus.com';

export default {

  async fetchWellandCanalBridgeStatus() {

    const response = await fetch(apiHost + '/api/v1/bridges');
    const responseJson = await response.json();
    const bridges = responseJson.bridges;

    const results = [];

    for (i = 0; i < bridges.length; i++) {

      const bridge = bridges[i];

      const coordinate = Bridges.bridges.find(b => b.id === bridge.id);

      const result = {
        id: `${util.generateGuid()}`,
        bridge_id: bridge.id,
        name: bridge.name,
        location: bridge.location,
        status: bridge.status.status,
        availability: util.getAvailability(bridge.status.status),
        next_direction: util.getNextDirection(bridge.status.next_direction),
        coordinates: coordinate.coordinates
      };

      results.push(result);
    }

    console.log("results fetched");

    return results;
  },

  async fetchWellandCanalClosures() {
    const bridges = await this.fetchWellandCanalBridgeStatus();

    const response = await fetch(apiHost + '/api/v1/closures');
    const responseJson = await response.json();
    var closures = responseJson.closures;

    var results = [];

    for (i = 0; i < closures.length; i++) {

      const bridge = bridges.find(function (element) {
        return element.bridge_id === closures[i].bridge_id;
      });

      const result = {
        id: `${util.generateGuid()}`,
        bridge_id: closures[i].bridge_id,
        bridge_location: bridge.location,
        name: bridge.name,
        closed_for: closures[i].closed_for,
        purpose: closures[i].purpose,
        time_string: util.replaceMonths(closures[i].time_string)
      };

      results.push(result);
    }

    return results;
  }
};
