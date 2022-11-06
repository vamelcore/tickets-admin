export default {
  currencyFormat: function (sum, currency) {
    sum = sum || 0
    currency = currency || process.env.VUE_APP_CURRENCY_CODE

    const options = {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: sum % 1 === 0 ? 0 : 2
    }

    return new Intl.NumberFormat(process.env.VUE_APP_LOCALE, options).format(sum)
  },
  fullDateFormat: function (date) {
    if (!date)
      return ''

    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }

    return new Intl.DateTimeFormat(process.env.VUE_APP_LOCALE, options).format(date)
  },
  shortDateFormat: function (date) {
    if (!date)
      return ''

    const options = {
      month: "long",
      day: "numeric",
    }
    let year = "";
    if (new Date(date).getFullYear() !== new Date().getFullYear())
      year = " " + new Intl.DateTimeFormat(process.env.VUE_APP_LOCALE, {year:"numeric"}).format(date)

    return new Intl.DateTimeFormat(process.env.VUE_APP_LOCALE, options).format(date) + year
  }
}