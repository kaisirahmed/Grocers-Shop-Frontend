

export function flatten(obj, final = {}) {
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] != null) {
      flatten(obj[key], final)
    } else {
      final[key] = obj[key]
    }
  }
  return final
}