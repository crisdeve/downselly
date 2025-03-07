/**
 * Unique id in cart funnel logic
 * @returns {String} - Generate a string ID
 */
export const uid = () => {
  const now = Date.now().toString()
  const n = now.substr(4, 6)
  const subs = Math.random() * 10
  const random = `${Math.random().toString(36).substr(2).substr(subs, 2)}`

  return `${n}-${random}`
}