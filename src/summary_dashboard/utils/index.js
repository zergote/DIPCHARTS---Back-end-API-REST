function obtainStationName(name) {
  let sample = parseInt(name.slice(-1), 10)
  if (Number.isInteger(sample)) {
    return name.slice(0, -1)
  } else return name
}

export { obtainStationName }
