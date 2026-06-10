let socket = null
export const connectSocket = () => {
  socket = new WebSocket('ws://localhost:8080')
  return socket
}

export const getSocket = () => socket

export const sendEvent = (event) => {
  if( socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(event))
  }
}

export default { connectSocket, getSocket, sendEvent }