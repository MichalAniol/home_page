// const express = require('express')
const { watch } = require('gulp')
// const browserSync = require('browser-sync').create()
// const path = require('path')
const oof = require('./operationsOnFiles')
const generator = require('./generator')

// const app = express()
// const PORT = 5000
// const PROXY_PORT = 3000

// app.use(express.static('./src/index'))

// browserSync.init({
//     proxy: 'http://localhost:' + PORT + '/',
// });
const getZero = num => num < 10 ? '0' + num : num

// const watchHtml = () => {
//     watch([
//         '../*.html',
//     ], () => {
//         const now = new Date(Date.now())
//         const time = now.getFullYear() + '.' + getZero(now.getMonth() + 1) + '.' + getZero(now.getDate()) + ' ' + getZero(now.getHours()) + ':' + getZero(now.getMinutes()) + ':' + getZero(now.getSeconds())
//         console.log(' --- reloaded at: ' + time + ' ---')
//         // browserSync.reload()
//         watchHtml()
//     });
// }
// watchHtml()

// const MAIN_REALIZE_FILE = 'index.html'

const info = (name) => {
    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()
    const res = `>> ${getZero(h)}:${getZero(m)}:${getZero(s)} - ${name}`
    console.log(res)
}

// const watchHtmlOutput = () => {
//     info('watch html output')
//     watch([
//         MAIN_REALIZE_FILE,
//     ], () => {
//         info('watch html output')
//         htmlOutput.change()
//         setTimeout(() => {
//             watchHtmlOutput()
//         }, 1000)
//     });
// }
// htmlOutput.change()
// watchHtmlOutput()


const watchChanges = () => {
    info('watch changes');
    const watchFiles = oof.getAllHtmlFiles('_html', [])
    // console.log('%c watchFiles.watch:', 'background: #ffcc00; color: #003300', watchFiles)
    watch(
        watchFiles,
        () => {
            setTimeout(() => {
                info('watch changes')
                generator.start()
                watchChanges()
            }, 1000)
        });
}
generator.start()
watchChanges()



// const server = app.listen(PORT, () => {
//     console.log('Listening on: http://localhost:' + PORT + '/');
//     console.log('Listening on: http://localhost:' + PROXY_PORT + '/');
// });