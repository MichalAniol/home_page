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
const generator = (function () {
    const start = () => {
        const CHANGE_PATHS_IMAGES_AT_CSS_CLASS = true;
        const MINIFY = true;
        const minify = (code) => {
            if (!MINIFY)
                return code;
            let index = code.indexOf('\n');
            while (index > -1) {
                const splitted = code.split('\n');
                code = splitted.join(' ');
                index = code.indexOf('\n');
            }
            index = code.indexOf('  ');
            while (index > -1) {
                const splitted = code.split('  ');
                code = splitted.join(' ');
                index = code.indexOf('  ');
            }
            return code;
        };
        const aggregateFiles = (path, $) => {
            const fileElement = $('file');
            let folder = '';
            if (fileElement.length > -1) {
                fileElement.each((index, element) => {
                    const src = element.attribs.src;
                    if (src) {
                        const file = oof.load(`${path}\\${src}`);
                        if (file) {
                            const splitted = src.split('/');
                            splitted.pop();
                            folder = '';
                            for (let i = 0; i < splitted.length; ++i) {
                                folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`;
                            }
                            const newCode = file.toString();
                            if (folder.length > 0) {
                                const code = aggregateFiles(`${path}\\${folder}`, cheerio.load(newCode));
                                $(element).replaceWith(minify(code.html()));
                            }
                            else {
                                $(element).replaceWith(minify(newCode));
                            }
                        }
                        else {
                            console.error(`>>>>>>>>>>Błędny "src" do pliku: ${path}\\${src}`);
                        }
                        console.log(`  >> added file: ${path}\\${src.replace(/\//g, '\\')}`, index + 1, fileElement.length);
                    }
                    else {
                        console.error(`Brakuje "src" w pliku: ${path}\\${src}`);
                    }
                });
            }
            return $;
        };
        const aggregateCss = ($) => {
            const fileElement = $('link');
            let css = '';
            fileElement.each((index, element) => {
                const href = element.attribs.href;
                const elementType = element.attribs.type;
                if (elementType === 'text/css' && href) {
                    const file = oof.load(`_html//${href}`);
                    if (file) {
                        const splitted = href.split('/');
                        splitted.pop();
                        let folder = '';
                        for (let i = 0; i < splitted.length; ++i) {
                            folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`;
                        }
                        css += file.toString();
                        $(element).replaceWith('');
                    }
                    console.log(`  >> added file: _html\\${href.replace(/\//g, '\\')}`, index + 1, fileElement.length);
                }
            });
            const styleCss = `<style>\n${minify(css)}\n</style>`;
            $('head').append(styleCss);
            oof.save('index.css', css);
        };
        const aggregateSvg = ($) => {
            const svgElement = $('img');
            svgElement.each((index, element) => {
                const src = element.attribs.src;
                if (!src)
                    return;
                const isSvg = src.indexOf('.svg') > -1;
                const isPng = src.indexOf('.png') > -1;
                if (!isSvg && !isPng)
                    return;
                if (isSvg) {
                    const relativePath = src.indexOf('./') > -1;
                    let svgFile = '';
                    if (relativePath) {
                        svgFile = oof.loadSvg(src.replace('./', ''));
                    }
                    else {
                        svgFile = oof.loadSvg(src);
                    }
                    $(element).replaceWith(minify(svgFile.toString()));
                }
                if (CHANGE_PATHS_IMAGES_AT_CSS_CLASS && isPng) {
                    const nameSplitted = src.split('/');
                    const name = nameSplitted[nameSplitted.length - 1].replace('.png', '');
                    const isProg = nameSplitted[nameSplitted.length - 2] === 'prog';
                    const cssFile = isProg ? 'prog' : 'base';
                    const cssImage = '<i class="' + cssFile + ' ' + cssFile + '-' + name + '"></i>';
                    $(element).replaceWith(cssImage);
                }
            });
        };
        const pathFile = '_html\\_index.html';
        const file = oof.load(pathFile);
        const $ = cheerio.load(file);
        aggregateFiles('_html', $);
        aggregateCss($);
        aggregateSvg($);
        const code = ($.html());
        oof.save('index.html', minify(code));
        console.log(`>>>> Saved!!! file: index.html`);
    };
    return { start };
}());
const getZero = (num) => num < 10 ? '0' + num : num;
const PORT = 2024;
const WS_PORT = 2025;
const server = express();
server.use(cors());
server.use(express.static('./'));
server.listen(PORT, () => console.log(`\x1b[32mServer on ---->>>>> http://localhost:${PORT}/`));
const websocketServer = http.createServer(server);
const myWebsocket = new websocket.Server({ server: websocketServer });
websocketServer.listen(WS_PORT, () => {
    console.log(`WebSocket on ->>>>> http://localhost:${WS_PORT}/\n`);
    console.log(`\x1b[35mWeb Page on -->>>>> http://localhost:${WS_PORT}/watch\x1b[37m`);
});
const sendChatMessage = (message) => {
    myWebsocket.clients.forEach((client) => client.send(message));
};
myWebsocket.on('connection', (webSocket) => {
    webSocket.on('open', () => {
    });
    webSocket.on('message', (message) => {
        console.log(`Otrzymano wiadomość: ${message.text}`);
    });
    webSocket.on('error', (error) => {
        console.error(`Wystąpił błąd: ${error.message}`);
    });
    webSocket.on('close', function () {
    });
});
const websocketFile = oof.load('websocket/websocket.js').toString().replace('>>>websocketPort<<<', WS_PORT);
const getSite = () => {
    const site = oof.load('./index.html').toString();
    return `${site}\n<script>\n${websocketFile}\n</script>`;
};
server.get('/watch', (req, res) => res.send(getSite()));
const info = (name) => {
    const time = new Date();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();
    const res = `>> ${getZero(h)}:${getZero(m)}:${getZero(s)} - ${name}`;
    console.log(res);
};
const globalPath = __dirname.replace('_html-generator', '');
let watchFiles;
const fileDates = {};
const myWatch = () => {
    watchFiles = oof.getAllHtmlFiles('_html', []).concat(oof.getAllHtmlFiles('img', []));
    watchFiles.forEach((elem) => {
        const path = globalPath + elem;
        const time = fs.statSync(path)?.mtime?.getTime();
        const item = fileDates[elem];
        if (time) {
            if (!item) {
                fileDates[elem] = time;
            }
            else {
                if (item !== time) {
                    fileDates[elem] = time;
                    generator.start();
                    sendChatMessage('reload');
                    info(elem);
                    return;
                }
            }
        }
    });
};
setInterval(() => {
    myWatch();
}, 300);
