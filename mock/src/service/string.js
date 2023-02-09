export const getShortAddress = (string) => {
  const res = string.slice(0, 7) + "..." + string.slice(string.length - 6)
  return res
}