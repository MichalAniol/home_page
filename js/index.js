var fold = [];
const title = document.querySelector('title').innerHTML;


function rememberFload() {
    localStorage.setItem(
        'fold' + title, fold.toString()
    );
}

function remindFload() {
    let fol = localStorage.getItem('fold' + title)
    if (fol != null) {
        fol = fol.split(',');
        for (let i = 0; i < fol.length; i += 2) {
            if (fol[i] != '') {
                let f = document.querySelector('#' + fol[i] + ' h1');
                f.click();
            }
        }
    }
}

function foldArea(item) {
    let id = item.parentElement.id,
        area = document.querySelector('#' + id + ' .fold'),
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
        oldH = fold.find(i => i[0] == id);
        area.style.height = oldH[1] + 'px';
        area.style.borderBottom = '0px solid var(--color_1)';
        setTimeout(() => { area.style.overflow = '' }, 600);
        let ind = fold.findIndex(i => i[0] == id);
        fold.splice(ind, 1);
    }
    rememberFload();
}

function start() {
    let parts = document.querySelectorAll('.part');
    for (let i = 0; i < parts.length; i++) {
        parts[i].id = 'part_' + i;
    }

    let as = document.querySelectorAll('a');
    for (let a of as) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        if (!a.alt) a.alt = a.title;
    }

    let progA = document.querySelectorAll('#programing .part .part a');
    for (let i = 0; i < progA.length; i++) {
        if (progA[i].childNodes[0].nodeName == 'IMG') {
            progA[i].classList.add('img');
        }
    }

    remindFload();

    setTimeout(() => {
        let floo = document.querySelectorAll('.part .fold');
        for (let f of floo) {
            f.style.setProperty('-webkit-transition', 'all .6s');
            f.style.setProperty('transition', 'all .6s');
        }
    }, 100);

    let basic = [];
    for (let i = 0; i < 17; i++) {
        let elem = document.querySelector('#part_' + i)
        basic.push(elem);
    }

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

start();


const CopyToClipboard = (but, containerid) => {
    if (document.selection) {
        console.log('%c document:', 'background: #ffcc00; color: #003300')
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand('copy');
        setTimeout(() => {
            range.moveToElementText(document.getElementById('end_copy'));
            range.select().createTextRange();
        }, 30);
    } else if (window.getSelection) {
        console.log('%c window:', 'background: #ffcc00; color: #003300')
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand('copy');
        setTimeout(() => {
            range.selectNode(document.getElementById('end_copy'));
            window.getSelection().addRange(range);
        }, 30);
    }
    but.innerHTML = 'c o p i e d &nbsp; ! ! !';
    setTimeout(() => {
        but.innerHTML = 'copy';
    }, 500);
}

{
    let styles = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 18px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 14px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');

    console.log('%c👉 𝐇𝐎𝐌𝐄 𝐏𝐀𝐆𝐄 👈\nautor: Michal Aniol 😎11', styles);
}