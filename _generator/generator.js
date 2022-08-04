const oof = require('./operationsOnFiles');

const start = () => {
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

    const minify = code => {
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

            res += line
        }

        return res;
    }

    const htmlList = [
        'head',

        'base/main',
        'base/video',
        'base/shopping',
        'base/news',
        'base/life',
        'base/time',
        'base/inspirations',
        'base/helpers',
        'base/knowledge',
        'base/portals',
        'base/maps',
        'base/programmes',
        'base/searchEngines',
        'base/sounds',
        'base/retro',
        'base/games',
        'base/business',
        'base/chill',

        'programingSection',

        'programming/work',
        'programming/css',
        'programming/html',
        'programming/fonts',
        'programming/javaScript',
        'programming/colors',
        'programming/otherStuff',
        'programming/graphics',
        'programming/canvas',
        'programming/frameworks',
        'programming/mobileApps',
        'programming/specials',
        'programming/materials',
        'programming/codeNotes',
        'programming/waitingRoom',

        'end',
    ]

    htmlList.forEach(e => combinedHtml += minify(oof.load(e + '.html')));

    console.log('---------------------------------');
    oof.save('index', combinedHtml);
}

module.exports = { start };