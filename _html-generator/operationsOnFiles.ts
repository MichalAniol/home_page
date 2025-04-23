const oof = (function () {
    // const path = require('path')

    // const path_in = path.join(__dirname, 'splittedHtml')

    let splitted = __dirname.split('\\')
    let path_out = '';
    splitted.forEach((e: string, i: number) => i < splitted.length - 1 ? path_out += e + '/' : null);

    // const htmlPath = `${globalPath}_html\\`


    const load = (filePath: string) => {
        // console.log('%c filePath:', 'background: #ffcc00; color: #003300', filePath)
        let data = null

        try {
            if (fs.existsSync(filePath)) {
                data = fs.readFileSync(filePath)
            }
        } catch (err) {
            console.error(err)
        }

        return data
    }

    const loadSvg = (name: string) => {
        const filePath = globalPath + name
        let data = null

        try {
            if (fs.existsSync(filePath)) {
                data = fs.readFileSync(filePath)
            }
        } catch (err) {
            console.error(err)
        }

        // console.log(' loaded: ' + name);

        return data
    }

    const loadJson = (name: string) => {
        const filePath = globalPath + name;
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

    const getAllHtmlFiles = (folder: string, exceptions: string[]) => {
        let result: string[] = []

        const getDir = (path: string, suffix: string) => {
            const files = fs.readdirSync(path);

            if (files.length > 0) {
                files.forEach((e: string) => {
                    const forbidden = exceptions.some(f => f === e)
                    if (forbidden) return

                    const hasDot = e.indexOf('.') === -1
                    const condition = configuration.watchedFilesTypes.some((f: string) => e.indexOf(f) > -1)

                    if (condition) {
                        result.push(`${suffix}\\${e}`)
                        return
                    }
                    if (hasDot) getDir(`${path}\\${e}`, `${suffix}\\${e}`)
                })
            }
        }

        const filePath = globalPath + folder
        getDir(filePath, folder)

        return result
    }

    const getAllPngFiles = (folder: string, exceptions: string[]) => {
        let result: string[] = []

        const getDir = (path: string, suffix: string) => {
            const files = fs.readdirSync(path);

            if (files.length > 0) {
                files.forEach((e: string) => {
                    const forbidden = exceptions.some(f => f === e)
                    if (forbidden) return

                    const hasDot = e.indexOf('.') === -1
                    const isPng = e.indexOf('.png') > -1

                    if (isPng) {
                        result.push(`${suffix}\\${e}`)
                        return
                    }
                    if (hasDot) getDir(`${path}\\${e}`, `${suffix}\\${e}`)
                })
            }
        }

        const filePath = globalPath + folder
        getDir(filePath, folder)

        return result
    }

    const save = (filePath: string, data: string) => {
        fs.writeFileSync(filePath, data)
    }

    const ensureDir = (srcPath: string) => {
        if (!fs.existsSync(srcPath)) {
            fs.mkdirSync(srcPath, { recursive: true })
            console.log(`Katalog utworzony w ./${configuration.folderPathOut}: ${srcPath}`)
        }
    }

    const removeDir = (srcPath: string) => {
        if (fs.existsSync(srcPath)) {
            fs.rmSync(srcPath, { recursive: true, force: true })
            console.log(`Katalog usunięty w ./${configuration.folderPathOut}: ${srcPath}`)
        }
    }

    const removeFile = (srcPath: string) => {
        if (fs.existsSync(srcPath)) {
            fs.unlinkSync(srcPath);
            console.log(`Plik usunięty w ./${configuration.folderPathOut}: ${srcPath}`)
        }
    }

    const getSizeOfCreateFile = async (srcPath: string) => {
        let result = null
        if (fs.existsSync(srcPath)) {
            try {
                const stats = fs.statSync(srcPath)
                result = stats.size
            } catch (err) {
                console.error(err)
            }
        }
        return result
    }


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
    }
}())
