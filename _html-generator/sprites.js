"use strict";
const express = require('express');
const fs = require('fs');
const websocket = require('ws');
const http = require('http');
const cors = require('cors');
const cheerio = require('cheerio');
const Spritesmith = require('spritesmith');
const oof = (function () {
    let splitted = __dirname.split('\\');
    let path_out = '';
    splitted.forEach((e, i) => i < splitted.length - 1 ? path_out += e + '/' : null);
    const globalPath = __dirname.replace('_html-generator', '');
    const load = (name) => {
        const filePath = globalPath + name;
        let data = null;
        try {
            if (fs.existsSync(filePath)) {
                data = fs.readFileSync(filePath);
            }
        }
        catch (err) {
            console.error(err);
        }
        return data;
    };
    const loadSvg = (name) => {
        const filePath = globalPath + name;
        let data = null;
        try {
            if (fs.existsSync(filePath)) {
                data = fs.readFileSync(filePath);
            }
        }
        catch (err) {
            console.error(err);
        }
        return data;
    };
    const loadJson = (name) => {
        const filePath = globalPath + name;
        let data = null;
        try {
            if (fs.existsSync(filePath)) {
                data = JSON.parse(fs.readFileSync(filePath));
            }
        }
        catch (err) {
            console.error(err);
        }
        return data;
    };
    const getAllHtmlFiles = (folder, exceptions) => {
        let result = [];
        const getDir = (path, suffix) => {
            const files = fs.readdirSync(path);
            if (files.length > 0) {
                files.forEach((e) => {
                    const forbidden = exceptions.some(f => f === e);
                    if (forbidden)
                        return;
                    const hasDot = e.indexOf('.') === -1;
                    const isHtml = e.indexOf('.html') > -1;
                    const isJs = e.indexOf('.css') > -1;
                    const isSvg = e.indexOf('.svg') > -1;
                    if (isHtml || isJs || isSvg) {
                        result.push(`${suffix}\\${e}`);
                        return;
                    }
                    if (hasDot)
                        getDir(`${path}\\${e}`, `${suffix}\\${e}`);
                });
            }
        };
        const filePath = globalPath + folder;
        getDir(filePath, folder);
        return result;
    };
    const getAllPngFiles = (folder, exceptions) => {
        let result = [];
        const getDir = (path, suffix) => {
            const files = fs.readdirSync(path);
            if (files.length > 0) {
                files.forEach((e) => {
                    const forbidden = exceptions.some(f => f === e);
                    if (forbidden)
                        return;
                    const hasDot = e.indexOf('.') === -1;
                    const isPng = e.indexOf('.png') > -1;
                    if (isPng) {
                        result.push(`${suffix}\\${e}`);
                        return;
                    }
                    if (hasDot)
                        getDir(`${path}\\${e}`, `${suffix}\\${e}`);
                });
            }
        };
        const filePath = globalPath + folder;
        getDir(filePath, folder);
        return result;
    };
    const save = (name, data) => {
        const filePath = path_out.replace('__interface/', '') + name;
        fs.writeFileSync(filePath, data);
    };
    return {
        load,
        loadSvg,
        loadJson,
        getAllHtmlFiles,
        getAllPngFiles,
        save
    };
}());
const progFiles = oof.getAllPngFiles('img', ['base.png', 'base2.png', 'prog.png', 'prog2.png', 'old_base_img', 'base']);
Spritesmith.run({ src: progFiles, padding: 3 }, (err, result) => {
    oof.save('img\\prog.png', result.image);
    let cssResult = `.prog {
    background-image: url(./img/prog.png);
    background-repeat: no-repeat;
    display: block;
}

`;
    Object.keys(result.coordinates).forEach(key => {
        const splitted = key.split('\\');
        const name = splitted[splitted.length - 1].replace('.png', '');
        const data = result.coordinates[key];
        cssResult += `.prog-${name} {
    width: ${data.width}px;
    height: ${data.height}px;
    background-position: -${data.x}px -${data.y}px;
}

`;
    });
    oof.save('_html\\prog.css', cssResult);
});
const baseFiles = oof.getAllPngFiles('img', ['base.png', 'base2.png', 'prog.png', 'prog2.png', 'old_prog_img', 'prog']);
Spritesmith.run({ src: baseFiles, padding: 3 }, (err, result) => {
    oof.save('img\\base.png', result.image);
    let cssResult = `.base {
    background-image: url(./img/base.png);
    background-repeat: no-repeat;
    display: block;
}

`;
    Object.keys(result.coordinates).forEach(key => {
        const splitted = key.split('\\');
        const name = splitted[splitted.length - 1].replace('.png', '');
        const data = result.coordinates[key];
        cssResult += `.base-${name} {
    width: ${data.width}px;
    height: ${data.height}px;
    background-position: -${data.x}px -${data.y}px;
}

`;
    });
    oof.save('_html\\base.css', cssResult);
});
