export default {
  currencyFormat: function (sum, currency) {
    sum = sum || 0
    currency = currency || import.meta.env.VITE_CURRENCY_CODE

    const options = {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: sum % 1 === 0 ? 0 : 2
    }

    return new Intl.NumberFormat(import.meta.env.VITE_LOCALE, options).format(sum)
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

    return new Intl.DateTimeFormat(import.meta.env.VITE_LOCALE, options).format(date)
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
      year = " " + new Intl.DateTimeFormat(import.meta.env.VITE_LOCALE, {year:"numeric"}).format(date)

    return new Intl.DateTimeFormat(import.meta.env.VITE_LOCALE, options).format(date) + year
  }
}