import SocketIO from 'socket.io-client'

export function connectLinda(url, tuplespace) {
  const socket = SocketIO(url)
  var linda,ts
  linda = new Linda().connect(socket)
  ts = linda.tuplespace(tuplespace)
  return {linda, ts}
}
