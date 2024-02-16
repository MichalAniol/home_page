const oof = require('./operationsOnFiles')
const cheerio = require('cheerio')

const start = () => {
    const CHANGE_PATHS_IMAGES_AT_CSS_CLASS = false;
    const MINIFY = true

    const minify = (code) => {
        if (!MINIFY) return code

        let index = code.indexOf('\n')
        while (index > -1) {
            const splitted = code.split('\n')
            code = splitted.join(' ')
            index = code.indexOf('\n')
        }

        index = code.indexOf('  ')
        while (index > -1) {
            const splitted = code.split('  ')
            code = splitted.join(' ')
            index = code.indexOf('  ')
        }

        return code
    }

    const aggregateFiles = (path, $,) => {
        const fileElement = $('file')
        let folder = ''
        if (fileElement.length > -1) {
            fileElement.each((index, element) => {
                const src = element.attribs.src

                if (src) {
                    const file = oof.load(`${path}\\${src}`)
                    if (file) {
                        const splitted = src.split('/')
                        splitted.pop()

                        folder = ''
                        for (let i = 0; i < splitted.length; ++i) {
                            folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`
                        }

                        const newCode = file.toString()
                        if (folder.length > 0) {
                            const code = aggregateFiles(`${path}\\${folder}`, cheerio.load(newCode))
                            $(element).replaceWith(minify(code.html()))
                        } else {
                            $(element).replaceWith(minify(newCode))
                        }
                    } else {
                        console.error(`>>>>>>>>>>Błędny "src" do pliku: ${path}\\${src}`)
                    }
                    console.log(`  >> added file: ${path}\\${src.replace(/\//g, '\\')}`, index + 1, fileElement.length)
                } else {
                    console.error(`Brakuje "src" w pliku: ${path}\\${src}`)
                }
            })
            console.log('-----------------------')
        }

        return $
    }

    const aggregateCss = ($) => {
        const fileElement = $('link')

        let css = ''
        fileElement.each((index, element) => {
            const href = element.attribs.href
            const elementType = element.attribs.type

            if (elementType === 'text/css' && href) {
                const file = oof.load(`_html//${href}`)
                if (file) {
                    const splitted = href.split('/')
                    splitted.pop()

                    folder = ''
                    for (let i = 0; i < splitted.length; ++i) {
                        folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`
                    }

                    css += file.toString()
                    $(element).replaceWith('')
                } 
                console.log(`  >> added file: ${href.replace(/\//g, '\\')}`, index + 1, fileElement.length)
            } 
        })

        const styleCss = `<style>\n${minify(css)}\n</style>`
        console.log('styleCss: ', styleCss)
        $('head').append(styleCss)

        oof.save('index.css', css)
    }

    const aggregateSvg = ($) => {
        const svgElement = $('img')

        svgElement.each((index, element) => {
            const src = element.attribs.src
            if (!src) return
            const isSvg = src.indexOf('.svg') > -1
            const isPng = src.indexOf('.png') > -1
            if (!isSvg && !isPng) return

            if (isSvg) {
                const relativePath = src.indexOf('./') > -1
                let svgFile = ''
                if (relativePath) {
                    svgFile = oof.loadSvg(src.replace('./', ''))
                } else {
                    svgFile = oof.loadSvg(src)
                }

                $(element).replaceWith(minify(svgFile.toString()))
            }

            if (CHANGE_PATHS_IMAGES_AT_CSS_CLASS && isPng) {
                const nameSplitted = src.split('/')
                const name = nameSplitted[nameSplitted.length - 1].replace('.png', '');
                const isProg = nameSplitted[nameSplitted.length - 2] === 'prog';
                const cssFile = isProg ? 'prog' : 'base';
                const cssImage = '<i class="' + cssFile + ' ' + cssFile + '-' + name + '"></i>'

                $(element).replaceWith(cssImage)
            }
        })
    }



    const pathFile = '_html\\_index.html'
    const file = oof.load(pathFile)
    const $ = cheerio.load(file)

    aggregateFiles('_html', $)
    aggregateCss($)
    aggregateSvg($)
    const code = ($.html())

    oof.save('index.html', minify(code))
    console.log(`Saved!!! file: ${pathFile}`)
}

module.exports = { start }