const generator = (function () {
    const minify = (code: string) => {
        if (!configuration.minifyFiles) return code

        const stringsToRemove = ['\n', '\r', '  ']

        stringsToRemove.forEach(s => {
            let index = code.indexOf(s)
            while (index > -1) {
                const splitted = code.split(s)
                code = splitted.join(' ')
                index = code.indexOf(s)
            }
        })

        return code
    }

    let css = ''

    const aggregateCss = (myPath: string, $: any) => {
        const linkElements = $('link')

        linkElements.each((index: number, element: any) => {
            const href = element.attribs.href
            // const elementType = element.attribs.type
            const rel = element.attribs.rel

            if (rel === 'stylesheet' && href) {
                const cssPath = `${globalPath}${myPath}//${href}`
                const file = oof.load(cssPath)
                if (file) {
                    const splitted = href.split('/')
                    splitted.pop()

                    let folder = ''
                    for (let i = 0; i < splitted.length; ++i) {
                        folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`
                    }

                    const newCss = minify(file.toString())
                    css += ` ${minify(newCss)}`
                    $(element).replaceWith('')
                }
                // console.log(`  >> added file: _html\\${href.replace(/\//g, '\\')}`, index + 1, linkElements.length)
            }
        })

        return $
    }

    let indexSvg = 1
    const putSvgToHtmlFile = (myPath: string, $: any) => {
        const imgElements = $('img')
        console.log('%c imgElements:', 'background: #ffcc00; color: #003300', imgElements.length)

        imgElements.each((index: number, element: any) => {
            const src = element.attribs.src

            if (!src) return
            const isSvg = src.indexOf('.svg') > -1
            if (!isSvg) return

            if (isSvg) {
                const relativePath = src.indexOf('./') > -1
                console.log('%c src:', 'background: #ffcc00; color: #003300', src, indexSvg)
                indexSvg++

                let svgFile = ''
                if (relativePath) {
                    svgFile = oof.loadSvg(src.replace('./', ''))
                } else {
                    svgFile = oof.loadSvg(src)
                }

                const svg = svgFile.toString()
                svg.replace('xmlns="http://www.w3.org/2000/svg"', '')
                svg.replace('xmlns:xlink="http://www.w3.org/1999/xlink"', '')

                // const indexLink = svg.indexOf('xmlns:xlink="http://www.w3.org/1999/xlink"')
                // if (indexLink > -1) {
                //     console.log(indexLink)
                // }
                $(element).replaceWith(minify(svg))
            }
        })

        return $
    }

    const changePathsImagesAtCssClass = (myPath: string, $: any) => {
        const imgElements = $('img')

        imgElements.each((index: number, element: any) => {
            const src = element.attribs.src

            if (!src) return
            const isPng = src.indexOf('.png') > -1
            if (!isPng) return

            if (isPng) {
                const nameSplitted = src.split('/')
                const name = nameSplitted[nameSplitted.length - 1].replace('.png', '');
                const isProg = nameSplitted[nameSplitted.length - 2] === 'prog';
                const cssFile = isProg ? 'prog' : 'base';
                const cssImage = '<i class="' + cssFile + ' ' + cssFile + '-' + name + '"></i>'
                // console.log('%c cssImage:', 'background: #ffcc00; color: #003300', cssImage)

                $(element).replaceWith(cssImage)
            }
        })

        return $
    }

    const aggregateFiles = (myPath: string, $: any) => {
        const fileElements = $('file')
        let folder = ''
        if (fileElements.length > -1) {
            fileElements.each((index: number, element: any) => {
                const src = element.attribs.src

                if (src) {
                    const file = oof.load(`${globalPath}${myPath}\\${src}`)
                    if (file) {
                        const splitted = src.split('/')
                        splitted.pop()

                        folder = ''
                        for (let i = 0; i < splitted.length; ++i) {
                            folder += `${splitted[i]}${i < splitted.length - 1 ? '\\' : ''}`
                        }

                        const newCode = file.toString()
                        const $$ = cheerio.load(newCode)

                        if (folder.length > 0) {
                            const code = aggregateFiles(`${myPath}\\${folder}`, $$)
                            $(element).replaceWith(minify(code.html()))
                        } else {
                            $(element).replaceWith(minify(newCode))
                        }

                    } else {
                        console.error(`>>>>>>>>>>Błędny "src" do pliku: ${myPath}\\${src}`)
                    }
                    // console.log(`  >> added file: ${myPath}\\${src.replace(/\//g, '\\')}`, index + 1, fileElements.length)
                } else {
                    console.error(`Brakuje "src" w pliku: ${myPath}\\${src}`)
                }
            })
        }

        return $
    }


    const start = async () => {
        const pathFile = `${globalPath}${configuration.folderPathIn}\\${configuration.htmlStartFile}.html`
        const file = oof.load(pathFile)
        const $ = cheerio.load(file)

        // copyFiles(configuration.folderPathIn, configuration.folderPathOut)
        //     .then(() => console.log('Kopiowanie zakończone!'))
        //     .catch(err => console.error('Błąd:', err))

        await aggregateFiles(configuration.folderPathIn, $)
        await aggregateCss(configuration.folderPathIn, $)

        if (configuration.addSvgToHtml) {
            await putSvgToHtmlFile(configuration.folderPathIn, $)
        }

        if (configuration.changePathsImagesAtCssClass) {
            await changePathsImagesAtCssClass(configuration.folderPathIn, $)
        }

        // Dodaj <link> do <head>, jeśli jeszcze go tam nie ma
        if ($('head link[rel="stylesheet"][href="style.css"]').length === 0) {
            $('head').append('<link rel="stylesheet" href="style.css">')
        }

        const code = ($.html())

        oof.save(`${globalPath}${configuration.folderPathOut}\\index.html`, minify(code))
        oof.save(`${globalPath}${configuration.folderPathOut}\\style.css`, minify(minify(css)))
        console.log(`>>>> Saved!!! file: prod\\index.html`)
        css = ''
    }
    start()

    return { start }
}())
