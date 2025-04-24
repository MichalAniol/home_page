
(function () {
    const fold: [string, number][] = []
    const title = document.querySelector('title').innerHTML
    console.log('%c title:', 'background: #ffcc00; color: #003300', title)


    const rememberFold = () => {
        localStorage.setItem(
            'fold' + title, fold.toString()
        );
    }

    const remindFold = () => {
        const fold = localStorage.getItem('fold' + title)
        if (!!fold) {
            const foldSplitted = fold.split(',');
            for (let i = 0; i < foldSplitted.length; i += 2) {
                if (foldSplitted[i] != '') {
                    let foldH1: HTMLElement = document.querySelector(`#${foldSplitted[i]} h1`)
                    foldH1.click()
                }
            }
        }
    }

    const foldArea = (item: HTMLElement) => {
        const id = item.parentElement.id,
            area: HTMLElement = document.querySelector(`#${id} .fold`),
            h = area.getBoundingClientRect().height;

        if (h > 2) {
            fold.push([id, h]);
            area.style.height = h + 'px';
            setTimeout(() => {
                area.style.height = '0px';
                area.style.borderBottom = '2px solid var(--color_1)';
                area.style.overflow = 'hidden';
            }, 20);
        } else {
            const oldH = fold.find(i => i[0] == id);
            area.style.height = oldH[1] + 'px';
            area.style.borderBottom = '0px solid var(--color_1)';
            setTimeout(() => { area.style.overflow = '' }, 600);
            let ind = fold.findIndex(i => i[0] == id);
            fold.splice(ind, 1);
        }
        rememberFold();
    }

    const start = () => {
        let parts = document.querySelectorAll('.part');
        for (let i = 0; i < parts.length; ++i) {
            let part = parts[i]
            part.id = 'part_' + i;
            let h1 = part.querySelector('h1')
            h1.addEventListener('click', () => foldArea(h1))
        }

        let as = document.querySelectorAll('a');
        for (let a of as) {
            a.target = '_blank'
            a.rel = 'noopener noreferrer'
        }

        let progA = document.querySelectorAll('#programing .part .part a');
        for (let i = 0; i < progA.length; i++) {
            if (progA[i].childNodes[0].nodeName == 'IMG') {
                progA[i].classList.add('img');
            }
        }

        remindFold();

        setTimeout(() => {
            let folds: NodeListOf<HTMLElement> = document.querySelectorAll('.part .fold')
            for (let f of folds) {
                f.style.setProperty('-webkit-transition', 'all .6s')
                f.style.setProperty('transition', 'all .6s')
            }
        }, 100);

        // let basic = [];
        // for (let i = 0; i < 17; i++) {
        //     let elem = document.querySelector('#part_' + i)
        //     basic.push(elem);
        // }

        // document.addEventListener('keydown', e => {

        //     let fol = localStorage.getItem('fold' + title)
        //     if (fol != null) {
        //         fol = fol.split(',');
        //     } else { fol == [] }

        //     if (e.key == 'p') {
        //         for (let item of basic) {
        //             let h1 = item.querySelector('h1');
        //             if (!fol.some(e => e == item.id)) h1.click();
        //         }
        //     }

        //     if (e.key == 'o') {
        //         for (let item of basic) {
        //             let h1 = item.querySelector('h1');
        //             if (fol.some(e => e == item.id)) h1.click();
        //         }
        //     }
        // })
    }

    start()
}())


const CopyToClipboard = (button: HTMLElement, containerId: string) => {
    if (window.getSelection) {
        const range = document.createRange()
        range.selectNode(document.getElementById(containerId))
        window.getSelection().addRange(range)
        document.execCommand('copy')

        setTimeout(() => {
            range.selectNode(document.getElementById('end_copy'))
            window.getSelection().addRange(range)
        }, 30)

        button.innerHTML = 'c o p i e d &nbsp; ! ! !'
        setTimeout(() => {
            button.innerHTML = 'copy'
        }, 500)
    }
}