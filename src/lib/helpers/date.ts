export function convertDate(date: Date) {
  const nonLocaleDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const localeDate = new Date(nonLocaleDate.getTime() + (7 * 60 * 60 * 1000)).toISOString().split("T")[0]

  return localeDate
}

export function convertDateToday(date: Date) {
  const nonLocaleDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getDay())

  return nonLocaleDate
}
