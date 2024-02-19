const express = require('express')
const fs = require('fs')
const websocket = require('ws')
const http = require('http')
const cors = require('cors')
const cheerio = require('cheerio')

type ExpressRequestT = typeof express.request
type ExpressResponseT = typeof express.response

const getZero = (num: number) => num < 10 ? '0' + num : num

const PORT = 2024
const WS_PORT = 2025



const server = express()
server.use(cors())
server.use(express.static('./'))
server.listen(PORT, () => console.log(`\x1b[32mServer on ---->>>>> http://localhost:${PORT}/`))



const websocketServer = http.createServer(server)
const myWebsocket = new websocket.Server({ server: websocketServer })

websocketServer.listen(WS_PORT, () => {
    console.log(`WebSocket on ->>>>> http://localhost:${WS_PORT}/\n`)
    console.log(`\x1b[35mWeb Page on -->>>>> http://localhost:${WS_PORT}/watch\x1b[37m`)
})

const sendChatMessage = (message: string) => {
    myWebsocket.clients.forEach((client: any) => client.send(message))
}

myWebsocket.on('connection', (webSocket: typeof websocket) => {
    webSocket.on('open', () => {
        // console.log('Połączono z serwerem WebSocket.')
    })
    webSocket.on('message', (message: any) => {
        console.log(`Otrzymano wiadomość: ${message.text}`)
    })
    webSocket.on('error', (error: any) => {
        console.error(`Wystąpił błąd: ${error.message}`)
    })
    webSocket.on('close', function () {
        // console.log('deleted: webSocket.chat')
    })
})



const websocketFile = oof.load('websocket/websocket.js').toString().replace('>>>websocketPort<<<', WS_PORT)
const getSite = () => {
    const site = oof.load('./index.html').toString()
    return `${site}\n<script>\n${websocketFile}\n</script>`
}

server.get('/watch', (req: ExpressRequestT, res: ExpressResponseT) => res.send(getSite()))



const info = (name: string) => {
    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()
    const res = `>> ${getZero(h)}:${getZero(m)}:${getZero(s)} - ${name}`
    console.log(res)
}

const globalPath = __dirname.replace('_html-generator', '')
let watchFiles
const fileDates: { [k: string]: number } = {}

const myWatch = () => {
    watchFiles = oof.getAllHtmlFiles('_html', []).concat(oof.getAllHtmlFiles('img', []))

    watchFiles.forEach((elem: string) => {
        const path = globalPath + elem
        const time = fs.statSync(path)?.mtime?.getTime()
        const item = fileDates[elem]

        if (time) {
            if (!item) {
                fileDates[elem] = time
            } else {
                if (item !== time) {
                    fileDates[elem] = time
                    generator.start()
                    sendChatMessage('reload')
                    info(elem)
                    return
                }
            }
        }
    })
}

setInterval(() => {
    myWatch()
}, 300)
