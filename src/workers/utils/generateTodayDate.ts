export function generateTodayDate(): Date {
  const newDate = new Date()
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  const since = new Date(`${month}/${day}/${year}`)

  return since
}