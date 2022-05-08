export default {
  validationSet: function(items, responce, successClass, errorClass, messageItem) {
    const classes = {
      success: successClass || "checked",
      error: errorClass || "error"
    }
    const message = messageItem || "message"
    const errors = responce.errors ?? {}
    Object.entries(items).forEach(([item]) => {
      items[item] = errors[item]?classes.error:classes.success
    })
    items[message] = responce.message ?? ''
  },
  validationClean: function(items, item, cleanClass, messageItem) {
    const message = messageItem || "message"
    items[item] = cleanClass || ''
    items[message] = ''
  },

  isNumberKeyPressed: function(event) {
    if (/[\d]/g.test(event.key)) {
      return true;
    } else {
      return event.preventDefault();
    }
  },
  isAlphabeticKeyPressed: function (event) {
    if (/[a-zа-яё,.'-\s]/g.test(event.key)) {
      return true;
    } else {
      return event.preventDefault();
    }
  }
}