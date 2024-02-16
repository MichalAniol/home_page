const fs = require('fs');
const path = require('path');

const path_in = path.join(__dirname, 'splittedHtml');

let splitted = __dirname.split('\\');
let path_out = '';
splitted.forEach((e, i) => i < splitted.length - 1 ? path_out += e + '/' : null);

const globalPath = __dirname.replace('_html-generator', '')
const htmlPath = `${globalPath}_html\\`;


const load = name => {
    filePath = globalPath + name;
    console.log('%c filePath:', 'background: #ffcc00; color: #003300', filePath)
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath)
        }
    } catch (err) {
        console.error(err)
    }

    // console.log(' loaded: ' + name);

    return data;
}

const loadSvg = name => {
    filePath = globalPath + name;
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath)
        }
    } catch (err) {
        console.error(err)
    }

    // console.log(' loaded: ' + name);

    return data;
}

const loadJson = name => {
    filePath = globalPath + name;
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath));
        }
    } catch (err) {
        console.error(err)
    }

    // console.log(' loaded JSON: ' + name);

    return data;
}

const getAllHtmlFiles = (folder, exceptions) => {
    let result = []

    const getDir = (path, suffix) => {
        const files = fs.readdirSync(path);

        if (files.length > 0) {
            files.forEach(e => {
                const forbidden = exceptions.some(f => f === e)
                if (forbidden) return

                const indexDot = e.indexOf('.')
                const indexHtml = e.indexOf('.html')
                const indexJs = e.indexOf('.css')

                if (indexHtml > -1 || indexJs > -1) {
                    result.push(`${suffix}\\${e}`)
                    return
                }
                if (indexDot === -1) getDir(`${path}\\${e}`, `${suffix}\\${e}`)
            })
        }
    }

    const filePath = globalPath + folder
    getDir(filePath, folder)

    return result
}

const save = (name, data) => {
    filePath = path_out.replace('__interface/', '') + name;
    // console.log('%c saved:', 'background: #ffcc00; color: #003300', filePath)
    fs.writeFileSync(filePath, data);

    // console.log(' saved file: ' + filePath);
}

module.exports = {
    load,
    loadSvg,
    loadJson,
    getAllHtmlFiles,
    save
}