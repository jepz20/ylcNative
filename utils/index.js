export const mapArrayOfLength = (length) => (fillFunction) => {
  const newArray = []
  for (let index = 1; index <= length; index++) {
    newArray.push(fillFunction(index))
  }
  return newArray
}
