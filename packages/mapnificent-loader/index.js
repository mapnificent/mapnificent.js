import {mapnificent} from '@mapnificent/network'

const MapnificentNetwork = mapnificent.MapnificentNetwork

const fromBuffer = (buffer) => {
  return MapnificentNetwork.decode(new Uint8Array(buffer))
}

// const fromFile = (filename) => {
//   let buffer = fs.readFileSync(filename)
//   let network = MapnificentNetwork.decode(buffer)
//   return new Promise()
// }

const fromCity = (city, options) => {
  if (window && window.location) {
    let url = `./${city}.bin`
    return fromURL(url, options)
  }
  let url = `https://www.mapnificent.net/${city}/${city}.bin`
  return window.fetch(url).then((response) => response.arrayBuffer()).then(fromBuffer)
}

const fromURL = (url, options) => {
  return new Promise((resolve, reject) => {
    var req = new window.XMLHttpRequest()
    req.open('GET', url, true)
    req.responseType = 'arraybuffer'

    req.addEventListener('load', (ev) => {
      resolve(fromBuffer(ev.target.response))
    })
    if (options.progress) {
      req.addEventListener('progress', (ev) => {
        if (ev.lengthComputable) {
          let percentComplete = ev.loaded / ev.total * 100
          options.progress(percentComplete, ev.total)
        }
      })
    }
    req.send()
  })
}

export {
  // fromFile,
  fromURL,
  fromBuffer,
  fromCity
}
