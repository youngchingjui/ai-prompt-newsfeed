const generatePermutations = (input) => {
  const pattern = /{([^{}]+)}/g
  const matches = input.match(pattern)

  if (!matches) {
    return null
  }

  const options = matches.map((match) => match.slice(1, -1).split(", "))
  const cartesianProduct = (a, b) => a.flatMap((x) => b.map((y) => [...x, y]))
  const permutations = options.reduce(cartesianProduct, [[]])

  return permutations.map((permutation) => {
    let output = input
    permutation.forEach((option, index) => {
      output = output.replace(matches[index], option)
    })
    return output
  })
}

export default generatePermutations
