const fs = require('fs');
const path = require('path');

const path_in = path.join(__dirname, 'splittedHtml');

let splitted = __dirname.split('\\');
let path_out = '';
splitted.forEach((e, i) => i < splitted.length - 1 ? path_out += e + '/' : null);



const load = name => {
    const filePath = path_in + '/' + name;
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath);
        }
    } catch (err) {
        console.error(err)
    }

    // console.log(' loaded: ' + name);

    return data;
}

const loadSvg = name => {
    const filePath = path_out + '/' + name;
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath);
        }
    } catch (err) {
        console.error(err)
    }

    // console.log(' loaded svg: ' + name);

    return data;
}

const loadCss = name => {
    const filePath = path_out + '/css/' + name;
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath);
        }
    } catch (err) {
        console.error(err)
    }

    console.log(' loaded css: ' + name);

    return data;
}

const loadJs = name => {
    const filePath = path_out + '/js/' + name;
    let data = null;

    try {
        if (fs.existsSync(filePath)) {
            data = fs.readFileSync(filePath);
        }
    } catch (err) {
        console.error(err)
    }

    console.log(' loaded js: ' + name);

    return data;
}

const loadByPat = path => {
    let data = null;

    try {
        if (fs.existsSync(path)) {
            data = fs.readFileSync(path);
        }
    } catch (err) {
        console.error(err)
    }

    console.log(' loaded: ' + path);

    return data;
}

const readAllFiles = folder => {
    const getDir = path => {
        var files = fs.readdirSync(path);
        let res = [];

        for (let file of files) {
            const newPath = path + '/' + file;
            const obj = {};
            if (fs.lstatSync(newPath).isDirectory()) {
                const dir = getDir(newPath);
                obj[file] = dir;
                res.push(obj);
            } else {
                obj[file] = loadByPat(newPath).toString();
                res.push(obj);
            }
        }

        return res;
    }

    const filePath = path_in + '/' + folder;

    return getDir(filePath);
}

const save = (name, data) => {
    filePath = path_out + '/' + name + '.html';
    fs.writeFileSync(filePath, data);

    // console.log(' saved file: ' + filePath);
}

module.exports = { load, loadSvg, loadCss, loadJs, readAllFiles, save }