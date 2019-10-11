import uuid from 'uuid';
import moment from 'moment';

export default Lib = {
  showError(error) {
    try {
      console.error(error);
      setTimeout(() => {
        alert(error);
      }, 500);
      //TODO send bugs to bugsnag
    } catch {}
  },

  generateGuid() {
    return uuid();
  },

  getNextClosure(next) {
    if(!!next){
      return moment.utc(next).local().format("hh:mm A - MMM DD");
    }
    return " ";
  },

  getAvailability(status) {
    return status.toLowerCase() == "available" ? "available" : "unavailable";
  },

  replaceMonths(result) {
    return result
      .toLowerCase()
      .replace(/jan/g, "Jan")
      .replace(/feb/g, "Feb")
      .replace(/mar/g, "Mar")
      .replace(/apr/g, "Apr")
      .replace(/may/g, "May")
      .replace(/jun/g, "Jun")
      .replace(/jul/g, "Jul")
      .replace(/aug/g, "Aug")
      .replace(/sep/g, "Sep")
      .replace(/oct/g, "Oct")
      .replace(/nov/g, "Nov")
      .replace(/dec/g, "Dec");
  }
};
