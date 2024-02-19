const initWebSocket = () => {
    const webSocketUrl = 'ws://localhost:>>>websocketPort<<<';
    const webSocket = {
        open: () => { },
        close: () => { },
        socket: null
    };
    let firstConnection = true;
    const startWebSocketConnection = () => {
        let interval = undefined;
        const setWebSocket = () => {
            webSocket.socket = new WebSocket(webSocketUrl);
        };
        const setNewWebSocket = () => {
            try {
                setWebSocket();
            }
            catch {
                interval = setInterval(() => {
                    try {
                        setWebSocket();
                    }
                    finally { }
                }, 1000);
            }
            finally {
                if (!firstConnection)
                    location.reload();
                firstConnection = false;
                clearInterval(interval);
                if (webSocket.socket) {
                    webSocket.socket.addEventListener('open', () => {
                        webSocket.open();
                        webSocket.socket?.addEventListener('message', (event) => {
                            const messages = event.data;
                            if (messages === 'reload') {
                                location.reload();
                            }
                        });
                        webSocket.socket?.addEventListener('close', () => {
                            webSocket.close();
                            setNewWebSocket();
                        });
                        webSocket.socket?.addEventListener('error', (error) => {
                        });
                        webSocket.socket?.addEventListener('connection', () => {
                        });
                    });
                }
            }
        };
        setNewWebSocket();
    };
    startWebSocketConnection();
};
initWebSocket();
