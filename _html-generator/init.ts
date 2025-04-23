type ExpressRequestT = typeof express.request
type ExpressResponseT = typeof express.response

const init = (function () {
    const moveFile = (path: string) => {

        const file = oof.load(`${globalPath}${path}`)
        if (file) {
            const pathWithoutFolderPathIn = path.replace(configuration.folderPathIn, '')
            const newPath = `${globalPath}${configuration.folderPathOut}${pathWithoutFolderPathIn}`
            if (fs.existsSync(newPath)) {
                oof.save(newPath, file)
            }
        }
    }

    const IGNORED = (configuration.addSvgToHtml ? ['.html', '.css', 'svg'] : ['.html', '.css'])

    // Ścieżka do katalogu, który ma być obserwowany
    const watcherIn = chokidar.watch(`./${configuration.folderPathIn}`, {
        ignored: (path: string, stats: any) => stats?.isFile() && path.endsWith('ts'),
        persistent: true // Kontynuowanie działania procesu
    })

    const getPathOut = (srcPath: string) => {
        const relativePath = path.relative(`./${configuration.folderPathIn}`, srcPath)
        const tempPath = path.join(`./${configuration.folderPathOut}`, relativePath)
        return tempPath
    }

    const start = () => {
        // Obsługa różnych zdarzeń
        watcherIn
            .on('add', (path: string) => {
                if (IGNORED.some((elem: string) => path.endsWith(elem))) return
                moveFile(path) // w zamian "startFilesAnalyzer"
                info(`Plik dodany: ${path}`)
            })
            .on('change', (path: string) => {
                moveFile(path)
                info(`Plik zmieniony: ${path}`)
            })
            .on('unlink', (path: string) => {
                oof.removeFile(getPathOut(path))
                info(`Plik usunięty: ${path}`)
            })
            .on('addDir', (path: string) => {
                if (configuration.dirsToCopy.some((dir: string) => path.endsWith(dir))) {
                    oof.ensureDir(getPathOut(path))
                    info(`Katalog dodany: ${path}`)
                }
            })
            .on('unlinkDir', (path: string) => {
                oof.removeDir(getPathOut(path))
                info(`Katalog usunięty: ${path}`)
            })
            .on('error', (error: any) => info(`Błąd: ${error}`))
            .on('ready', async () => {
                watcherIn
                    .on('add', (path: string) => {
                        if (path.endsWith('html') || path.endsWith('css')) {
                            generator.start()
                        } else {
                            moveFile(path) // w zamian "startFilesAnalyzer"
                            info(`Plik dodany: ${path}`)
                        }
                    })
                    .on('change', (path: string) => {
                        if (path.endsWith('html') || path.endsWith('css')) {
                            generator.start()
                        } else {
                            moveFile(path) // w zamian "startFilesAnalyzer"
                            info(`Plik dodany: ${path}`)
                        }
                    })

                info(`✅ Wszystkie pliki i katalogi z ./${configuration.folderPathIn} zostały załadowane!`)
            })


        info(`Obserwowanie katalogu ./${configuration.folderPathIn}...`)

        // setTimeout(() => {
        //     generator.start()
        // }, 300)
    }

    return {
        start
    }
}())

init.start()
