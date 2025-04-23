"use strict";
const express = require('express');
const fs = require('fs');
const websocket = require('ws');
const http = require('http');
const cors = require('cors');
const cheerio = require('cheerio');
const path = require('path');
const chokidar = require('chokidar');
const configuration = require('../gConfig.js');
const globalPath = __dirname.replace('_html-generator', '');
const getZero = (num) => num < 10 ? '0' + num : num;
const info = (name) => {
    const time = new Date();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    const res = `>> ${getZero(h)}:${getZero(m)}:${getZero(s)} - ${name}`;
    console.log(res);
};
const oof = (function () {
    let splitted = __dirname.split('\\');
    let path_out = '';
    splitted.forEach((e, i) => i < splitted.length - 1 ? path_out += e + '/' : null);
    const load = (filePath) => {
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
                    const condition = configuration.watchedFilesTypes.some((f) => e.indexOf(f) > -1);
                    if (condition) {
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
    const save = (filePath, data) => {
        fs.writeFileSync(filePath, data);
    };
    const ensureDir = (srcPath) => {
        if (!fs.existsSync(srcPath)) {
            fs.mkdirSync(srcPath, { recursive: true });
            console.log(`Katalog utworzony w ./${configuration.folderPathOut}: ${srcPath}`);
        }
    };
    const removeDir = (srcPath) => {
        if (fs.existsSync(srcPath)) {
            fs.rmSync(srcPath, { recursive: true, force: true });
            console.log(`Katalog usunięty w ./${configuration.folderPathOut}: ${srcPath}`);
        }
    };
    const removeFile = (srcPath) => {
        if (fs.existsSync(srcPath)) {
            fs.unlinkSync(srcPath);
            console.log(`Plik usunięty w ./${configuration.folderPathOut}: ${srcPath}`);
        }
    };
    const getSizeOfCreateFile = async (srcPath) => {
        let result = null;
        if (fs.existsSync(srcPath)) {
            try {
                const stats = fs.statSync(srcPath);
                result = stats.size;
            }
            catch (err) {
                console.error(err);
            }
        }
        return result;
    };
    return {
        load,
        loadSvg,
        loadJson,
        getAllHtmlFiles,
        getAllPngFiles,
        save,
        ensureDir,
        removeDir,
        removeFile,
        getSizeOfCreateFile
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
