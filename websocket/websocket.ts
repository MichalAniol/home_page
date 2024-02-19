type WebSocketT = {
    open: Function,
    close: Function,
    socket: WebSocket | null
}


const initWebSocket = () => {
    const webSocketUrl = 'ws://localhost:>>>websocketPort<<<'

    const webSocket: WebSocketT = {
        open: () => { },
        close: () => { },
        socket: null
    }

    let firstConnection = true

    const startWebSocketConnection = () => {
        let interval: ReturnType<typeof setInterval> | undefined = undefined

        const setWebSocket = () => {
            webSocket.socket = new WebSocket(webSocketUrl)
            // console.log('----> Próba połączenia z websocket.')
        }

        const setNewWebSocket = () => {
            try {
                setWebSocket()
            } catch {
                interval = setInterval(() => {
                    try {
                        setWebSocket()
                    } finally { }
                }, 1000)
            } finally {
                if (!firstConnection) location.reload()
                firstConnection = false

                clearInterval(interval)
                if (webSocket.socket) {
                    webSocket.socket.addEventListener('open', () => {
                        // console.log('--> Połączono z serwerem WebSocket.')
                        webSocket.open()

                        webSocket.socket?.addEventListener('message', (event) => {
                            const messages = event.data
                            // console.log('%c messages:', 'background: #ffcc00; color: #003300', messages)
                            if (messages === 'reload') {
                                location.reload()
                            }
                            //
                        })

                        webSocket.socket?.addEventListener('close', () => {
                            // console.log('--> Połączenie z serwerem WebSocket zostało zamknięte.')
                            webSocket.close()
                            setNewWebSocket()
                        })

                        webSocket.socket?.addEventListener('error', (error: any) => {
                            // console.error(`--> Wystąpił błąd: ${error.message}`)
                        })

                        webSocket.socket?.addEventListener('connection', () => {
                            // console.log(`--> connection`)
                        })
                    })
                }
            }
        }
        setNewWebSocket()
    }

    startWebSocketConnection()
}

initWebSocket()