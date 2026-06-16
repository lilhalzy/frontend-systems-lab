const users = require('./data/users')
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })
console.log('WebSocket server started on port 8080')

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    type: 'USERS_SYNC',
    users,
  }))

  ws.on('message', (message) => {
    const event = JSON.parse(message)
    
    console.log('Received:', event)

    switch (event.type) {
      case 'FOLLOW_REQUEST':
        const user = users.find((user) => user.id === event.userId)

          if (!user) return

          user.followers += 1

          const followEvent = {
            type: 'FOLLOW',
            userId: user.id,
            followers: user.followers,
          }

          wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(followEvent))
              }
            }
          )
        break
      }
    })

  ws.on('close', () => {
    clearInterval(interval)
    console.log('Client disconnected')
  })
})