const oof = require('./operationsOnFiles');

const start = () => {
    const CHANGE_PATHS_IMAGES_AT_CSS_CLASS = true;

    let combinedHtml = '';

    const svgMinify = code => {
        let splitted = code.toString().split('\n');
        let res = '';

        for (let s of splitted) {
            let lineStart = 0;
            for (let char of s) {
                if (char === ' ') {
                    lineStart++;
                } else {
                    break;
                }
            }

            let line = s.replace('\r', '').substring(lineStart, 10000000);

            res += line
        }

        return res;
    }

    const minify = (code, replaceSvg = true) => {
        let splitted = code.toString().split('\n');
        let res = '';

        for (let s of splitted) {
            let lineStart = 0;
            for (let char of s) {
                if (char === ' ') {
                    lineStart++;
                } else {
                    break;
                }
            }

            let line = s.replace('\r', '').substring(lineStart, 10000000);

            if (replaceSvg) {
                let svgOccurs = line.indexOf('.svg');
                if (svgOccurs > -1) {
                    let img = line.indexOf('<img');
                    let restOfLine = line.substring(img);
                    let endImg = restOfLine.indexOf('/>');

                    let leftLine = line.substring(0, img);
                    let rightLine = line.substring(img + endImg + 2, 10000000);

                    let srcSplitted = restOfLine.split('"');
                    let src = srcSplitted[1].substring(2, 10000000);

                    let svg = svgMinify(oof.loadSvg(src));

                    line = leftLine + svg + rightLine;
                }

                if (CHANGE_PATHS_IMAGES_AT_CSS_CLASS) {
                    let pngOccurs = line.indexOf('.png');
                    if (pngOccurs > -1) {
                        let img = line.indexOf('<img');
                        let restOfLine = line.substring(img);
                        let endImg = restOfLine.indexOf('/>');

                        let leftLine = line.substring(0, img);
                        let rightLine = line.substring(img + endImg + 2, 10000000);

                        let srcSplitted = restOfLine.split('"');
                        let nameSplitted = srcSplitted[1].split('/');
                        let name = nameSplitted[nameSplitted.length - 1].replace('.png', '');
                        let isProg = nameSplitted[nameSplitted.length - 2] === 'prog';
                        let cssFile = isProg ? 'prog' : 'base';
                        let cssImage = '<i class="' + cssFile + ' ' + cssFile + '-' + name + '"></i>'

                        line = leftLine + cssImage + rightLine;
                    }
                }
            }

            res += line;
        }

        return res;
    }

    const htmlList = [
        ['head-1.html', false],
        'index.css',
        // 'icons.css',
        ['head-2.html', false],

        'base/main.html',
        'base/video.html',
        'base/shopping.html',
        'base/news.html',
        'base/life.html',
        'base/time.html',
        'base/inspirations.html',
        'base/helpers.html',
        'base/knowledge.html',
        'base/portals.html',
        'base/maps.html',
        'base/programmes.html',
        'base/searchEngines.html',
        'base/sounds.html',
        'base/retro.html',
        'base/games.html',
        'base/business.html',

        'programingSection.html',

        'programming/work.html',
        'programming/css.html',
        'programming/html.html',
        'programming/fonts.html',
        'programming/javaScript.html',
        'programming/colors.html',
        'programming/otherStuff.html',
        'programming/graphics.html',
        'programming/canvas.html',
        'programming/csharp.html',
        'programming/frameworks.html',
        'programming/mobileApps.html',
        'programming/specials.html',
        'programming/materials.html',
        'programming/portals.html',
        'programming/codeNotes.html',
        'programming/waitingRoom.html',

        'end-1.html',
        // 'animation.js',
        'end-2.html',
    ]

    const loadFile = name => {
        if (Array.isArray(name)) {
            return minify(oof.load(name[0]), name[1]);
        }

        if (name.indexOf('.css') > -1) {
            return '<style>' + minify(oof.loadCss(name), false) + '</style>';
        }

        if (name.indexOf('.js') > -1) {
            return '<script>' + minify(oof.loadJs(name), false) + '</script>';
        }

        return minify(oof.load(name))
    }

    htmlList.forEach(e => combinedHtml += loadFile(e));

    console.log('>> done <<');
    oof.save('index', combinedHtml);
}

module.exports = { start };