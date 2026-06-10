const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })
console.log('WebSocket server started on port 8080')

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.send(JSON.stringify({
    type: 'CONNECTED',
  }))

  ws.on('message', (message) => {
    const event = JSON.parse(message)
    
    console.log('Received:', event)

    switch (event.type) {
      case 'FOLLOW_REQUEST':
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'FOLLOW',
              userId: event.userId,
            }))
          }
        })
        
        break
      }
    })

  ws.on('close', () => {
    clearInterval(interval)
    console.log('Client disconnected')
  })
})