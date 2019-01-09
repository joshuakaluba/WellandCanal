export default {
  generateGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },

  getNextDirection(direction) {
    return direction.toLowerCase().indexOf("--") > -1 ?
      "No data currently provided" :
      direction;
  },

  getAvailability(status) {
    return status.toLowerCase() == "available" ?
      "available" : "unavailable";
  },

  replaceMonths(result) {
    return result.toLowerCase()
      .replace(/jan/g, 'Jan')
      .replace(/feb/g, 'Feb')
      .replace(/mar/g, 'Mar')
      .replace(/apr/g, 'Apr')
      .replace(/may/g, 'May')
      .replace(/jun/g, 'Jun')
      .replace(/jul/g, 'Jul')
      .replace(/aug/g, 'Aug')
      .replace(/sep/g, 'Sep')
      .replace(/oct/g, 'Oct')
      .replace(/nov/g, 'Nov')
      .replace(/dec/g, 'Dec');
  }
}
