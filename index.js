
const title = document.querySelector('title').innerHTML;
var fold = [];

function rememberFload() {
    localStorage.setItem(
        'fold' + title, fold.toString()
    );
}

function remindFload() {
    let fol = localStorage.getItem('fold' + title).split(',');
    for (let i = 0; i < fol.length; i += 2) {
        let f = document.querySelector("#" + fol[i] + " h1");
        f.click();
    }
}

function foldArea(item) {
    let id = item.parentElement.id,
        area = document.querySelector('#' + id + ' .fold'),
        h = area.getBoundingClientRect().height;

    if (h > 2) {
        fold.push([id, h]);
        area.style.height = h + "px";
        setTimeout(() => {
            area.style.height = "0px";
            area.style.borderBottom = '2px solid var(--color_1)';
            area.style.overflow = 'hidden';
        }, 20);
    } else {
        oldH = fold.find(i => i[0] == id);
        area.style.height = oldH[1] + "px";
        area.style.borderBottom = '0px solid var(--color_1)';
        setTimeout(() => { area.style.overflow = '' }, 600);
        let ind = fold.findIndex(i => i[0] == id);
        fold.splice(ind, 1);
    }
    rememberFload();
}

function start() {
    let parts = document.querySelectorAll(".part");
    for (let i = 0; i < parts.length; i++) {
        parts[i].id = "part_" + i;
    }

    let as = document.querySelectorAll("a");
    for (let a of as) {
        a.target = "_blank";
    }

    let progA = document.querySelectorAll("#programing .part .part a");
    for (let i = 0; i < progA.length; i++) {
        if (progA[i].childNodes[0].nodeName == "IMG") {
            progA[i].classList.add("img");
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
}

start();