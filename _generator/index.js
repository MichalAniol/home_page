const connector = require('./generator');
const express = require('express');
const { watch } = require('gulp');
const path = require('path');
const browserSync = require('browser-sync').create();

const app = express();
const PORT = 5020;
const PROXY_PORT = 5010;

// app.use(express.static('../'));

browserSync.init({
    // proxy: 'http://localhost:' + PORT + '/',
    server: {
        baseDir: "../",
    },
    ui: {
        port: PROXY_PORT
    },
    port: PORT,
    open: false
});

const watchHtml = () => {
    watch([
        '../*.html',
    ], () => {
        const now = new Date(Date.now());
        const getZero = num => num < 10 ? '0' + num : num;
        const time = now.getFullYear() + '.' + getZero(now.getMonth() + 1) + '.' + getZero(now.getDate()) + ' ' + getZero(now.getHours()) + ':' + getZero(now.getMinutes()) + ':' + getZero(now.getSeconds());
        console.log(' --- reloaded at: ' + time + ' ---');
        browserSync.reload();
        watchHtml();
    });
}
watchHtml();


const watchChanges = () => {
    watch([
        'splittedHtml/*.html',
        'splittedHtml/base/*.html',
        'splittedHtml/programming/*.html',
        '../*.css',
        '../favicon.ico',
        '../img/*svg',
        '../img/base/*.png',
        '../img/prog/*.png',
        '../img/update/*.png'
    ], () => {
        connector.start();
        watchChanges();
    });
}
watchChanges();

const server = app.listen(PORT, () => {
    console.log('Listening on: http://localhost:' + PORT + '/');
    console.log('Listening on: http://localhost:' + PROXY_PORT + '/');
});