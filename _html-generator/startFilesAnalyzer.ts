// moduł porównujący stare pliki z nowymi przy uruchomieniu watchera
// tak aby nie kasować wszystkich plików i budować całego drzewa
// katalogów na nowo, tylko podmieniając różniące się pliki +
// uzupełnienie brakujących i usunięcie nadmiarowych plików i katalogów

const startFilesAnalyzer = (function () {

    const FileType = {
        dir: 'DIR',
        file: 'FILE'
    } as const

    type FileTypeKeysT = keyof typeof FileType
    type FileTypeValuesT = typeof FileType[FileTypeKeysT]

    // Funkcja do normalizacji ścieżek (obcinanie prefixu src/ lub temp/)
    const normalizePath = (filePath: string, baseFolder: string): string => path.relative(`./${baseFolder}`, filePath)

    // Funkcja do przekształcania struktury getWatched() w mapę { ścieżka: typ }
    const flattenPaths = (watched: Record<string, string[]>, baseFolder: string): Map<string, FileTypeValuesT> => {
        const result = new Map<string, FileTypeValuesT>()

        Object.entries(watched).forEach(([dir, files]) => {
            const normalizedDir = normalizePath(dir, baseFolder)
            result.set(normalizedDir, FileType.dir); // Katalog

            files.forEach(file => {
                const filePath = normalizePath(path.join(dir, file), baseFolder)
                result.set(filePath, FileType.file); // Plik
            })
        })

        return result
    }

    // Funkcja do porównywania katalogów
    const compareDirectories = (watchedIn: Record<string, string[]>, watchedOut: Record<string, string[]>) => {
        const pathsIn = flattenPaths(watchedIn, configuration.folderPathIn)
        const pathsOut = flattenPaths(watchedOut, configuration.folderPathOut)

        const onlyInPathsIn: [string, FileTypeValuesT][] = [...pathsIn.entries()]
            .filter(([p]) => !pathsOut.has(p))
            .map(([p, type]) => [p, type]) // Dodajemy 'DIR' lub 'FILE'

        const onlyInPathsOut: [string, FileTypeValuesT][] = [...pathsOut.entries()]
            .filter(([p]) => !pathsIn.has(p))
            .map(([p, type]) => [p, type]) // Dodajemy 'DIR' lub 'FILE'

        const inBothPaths: [string, FileTypeValuesT][] = [...pathsIn.entries()]
            .filter(([p]) => pathsOut.has(p))
            .map(([p, type]) => [p, type]) // Dodajemy 'DIR' lub 'FILE'

        return {
            onlyInPathsIn,
            onlyInPathsOut,
            inBothPaths
        }
    }

    // Funkcja do kopiowania katalogu/pliku
    const copyItem = async (srcPath: string, destPath: string, type: FileTypeValuesT) => {
        try {
            if (type === FileType.dir) {
                oof.removeDir(destPath)
            } else {
                const file = oof.load(srcPath)
                if (file) {
                    oof.save(destPath, file)
                }
            }
            info(`✅ Skopiowano: ${srcPath} ➝ ${destPath}`)
        } catch (error) {
            console.error(`❌ Błąd kopiowania ${srcPath}:`, error)
        }
    }

    // Funkcja do usuwania katalogu/pliku
    const removeItem = async (pathToRemove: string, type: FileTypeValuesT) => {
        try {
            if (type === FileType.dir) {
                oof.removeDir(pathToRemove)
            } else {
                oof.removeFile(pathToRemove)
            }
            info(`🗑️ Usunięto: ${pathToRemove}`)
        } catch (error) {
            console.error(`❌ Błąd usuwania ${pathToRemove}:`, error)
        }
    }

    // Funkcja synchronizująca katalogi
    const syncDirectories = async (diff: {
        onlyInPathsIn: string[][];
        onlyInPathsOut: string[][];
    }) => {
        const { onlyInPathsIn, onlyInPathsOut } = diff

        // Dodaj brakujące pliki/katalogi do temp
        for (const relativePath of onlyInPathsIn) {
            const srcPath = path.join(globalPath, configuration.folderPathIn, relativePath[0])
            const destPath = path.join(globalPath, configuration.folderPathOut, relativePath[0])
            await copyItem(srcPath, destPath, relativePath[1] as FileTypeValuesT)
        }

        // Usuń nadmiarowe pliki/katalogi z temp
        for (const relativePath of onlyInPathsOut) {
            const pathToRemove = path.join(globalPath, configuration.folderPathOut, relativePath[0])
            await removeItem(pathToRemove, relativePath[1] as FileTypeValuesT)
        }
    }


    // Funkcja do kopiowania pliku
    const copyFileToOut = async (filePathIn: string, filePathOut: string) => {
        try {
            // await fs.copyFile(filePathIn, filePathOut)
            const file = oof.load(filePathIn)
            if (file) {
                oof.save(filePathOut, file)
            }
            info(`✅ Skopiowano plik: ${filePathIn} ➝ ${filePathOut}`)
        } catch (error) {
            console.error(`❌ Błąd kopiowania pliku: ${filePathIn} ➝ ${filePathOut}`, error)
        }
    }

    // Funkcja sprawdzająca, czy pliki są takie same po dacie modyfikacji
    const compareFileDates = async (filePathIn: string, filePathOut: string): Promise<boolean> => {
        try {
            const statIn = await oof.getSizeOfCreateFile(filePathIn)
            const statOut = await oof.getSizeOfCreateFile(filePathOut)
            // info('%c ------ >> :', 'background: #ffcc00; color: #003300', statIn, statOut)

            // Porównujemy czas ostatniej modyfikacji pliku
            return statIn === statOut
        } catch (error) {
            console.error(`❌ Błąd podczas sprawdzania dat pliku: ${filePathIn} i ${filePathOut}`, error)
            return false
        }
    }

    // Funkcja iterująca po `inBothPaths` i porównująca rozmiar plików, podmieniając plik, jeśli jest różny
    const checkFilesDatesAndSync = async (inBothPaths: [string, FileTypeValuesT][]) => {
        for (const [relativePath, type] of inBothPaths) {
            const filePathIn = path.join(globalPath, configuration.folderPathIn, relativePath)
            const filePathOut = path.join(globalPath, configuration.folderPathOut, relativePath)

            if (type === FileType.file) {
                // Sprawdzamy, czy pliki są takie same
                const areFilesSame = await compareFileDates(filePathIn, filePathOut)
                if (!areFilesSame) {
                    // Jeśli plik jest różny, kopiujemy go do folderu out
                    await copyFileToOut(filePathIn, filePathOut);
                } else {
                    // info(`✅ Pliki są takie same: ${filePathIn} i ${filePathOut}`)
                }
            }
        }
    }


    const start = async (watchedPathsIn: Record<string, string[]>, watchedPathsOut: Record<string, string[]>) => {
        const diff = compareDirectories(watchedPathsIn, watchedPathsOut)
        await syncDirectories(diff)
        checkFilesDatesAndSync(diff.inBothPaths)
    }

    return {
        start
    }
}())
