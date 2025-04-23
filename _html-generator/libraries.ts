const express = require('express')
const fs = require('fs')
const websocket = require('ws')
const http = require('http')
const cors = require('cors')
const cheerio = require('cheerio')
const path = require('path')
// const { createServer } = require('vite')
const chokidar = require('chokidar')

const configuration = require('../gConfig.js')
// console.log('%c configuration:', 'background: #ffcc00; color: #003300', configuration)

const globalPath = __dirname.replace('_html-generator', '')

const getZero = (num: number) => num < 10 ? '0' + num : num

const info = (name: string) => {
    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()
    const res = `>> ${getZero(h)}:${getZero(m)}:${getZero(s)} - ${name}`
    console.log(res)
}