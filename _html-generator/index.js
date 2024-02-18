const express = require('express')
const { watch } = require('gulp')
const browserSync = require('browser-sync')
// const path = require('path')
const oof = require('./operationsOnFiles')
const generator = require('./generator')
const sprites = require('./sprites')

const getZero = num => num < 10 ? '0' + num : num

const PORT = 2024
const PROXY_PORT = 2025

const myServer = browserSync.create('myServer')

myServer.init({
        server: {
            baseDir: "./",
        },
        ui: {
            port: PROXY_PORT
        },
        port: PORT,
        open: false
    })

const server = browserSync.get('myServer')

// const app = express()
// app.listen(2030, () => console.log(`Listening Web on ------->>>>>`))

// sprites.cerate()

const info = (name) => {
    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()
    const res = `>> ${getZero(h)}:${getZero(m)}:${getZero(s)} - ${name}`
    console.log(res)
}

const watchChanges = () => {
    info('watch changes');
    const watchFiles = oof.getAllHtmlFiles('_html', []).concat(oof.getAllHtmlFiles('img', []))
    // console.log('%c watchFiles.watch:', 'background: #ffcc00; color: #003300', watchFiles)
    watch(
        watchFiles,
        () => {
            setTimeout(() => {
                info('watch changes')
                generator.start()
                watchChanges()
                server.reload()
            }, 1000)
        });
}
generator.start()
watchChanges()



// const server = app.listen(PORT, () => {
//     console.log('Listening on: http://localhost:' + PORT + '/');
//     console.log('Listening on: http://localhost:' + PROXY_PORT + '/');
// });