// const oof = require('./operationsOnFiles')


const progFiles = oof.getAllPngFiles('img', ['base.png', 'base2.png', 'prog.png', 'prog2.png', 'old_base_img', 'base'])

Spritesmith.run({ src: progFiles, padding: 3 },  (err: Error, result: any) => {
    oof.save('img\\prog.png', result.image)

    let cssResult = `.prog {
    background-image: url(./img/prog.png);
    background-repeat: no-repeat;
    display: block;
}

`
    Object.keys(result.coordinates).forEach(key => {
        const splitted = key.split('\\')
        const name = splitted[splitted.length - 1].replace('.png', '')

        const data = result.coordinates[key]

        cssResult += `.prog-${name} {
    width: ${data.width}px;
    height: ${data.height}px;
    background-position: -${data.x}px -${data.y}px;
}

`
    })
    oof.save('_html\\prog.css', cssResult)
})

const baseFiles = oof.getAllPngFiles('img', ['base.png', 'base2.png', 'prog.png', 'prog2.png', 'old_prog_img', 'prog'])

Spritesmith.run({ src: baseFiles, padding: 3 }, (err: Error, result: any) => {
    oof.save('img\\base.png', result.image)

    let cssResult = `.base {
    background-image: url(./img/base.png);
    background-repeat: no-repeat;
    display: block;
}

`
    Object.keys(result.coordinates).forEach(key => {
        const splitted = key.split('\\')
        const name = splitted[splitted.length - 1].replace('.png', '')

        const data = result.coordinates[key]

        cssResult += `.base-${name} {
    width: ${data.width}px;
    height: ${data.height}px;
    background-position: -${data.x}px -${data.y}px;
}

`
    })
    oof.save('_html\\base.css', cssResult)
})
