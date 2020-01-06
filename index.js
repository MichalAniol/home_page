var fold = [];
// document.cookie = "";

const title = document.querySelector('title').innerHTML;

let b = [1, 2, 3, 4, 5, 6, 7].toString()
localStorage.setItem(
    'test', b
);

// localStorage.getItem(test)
setTimeout(() => {
    let a = localStorage.getItem('test');
    console.log('%c localStorage.getItem(test):', 'background: #ffcc00; color: #003300', a[0])
}, 100);

function getCookie(name) {
    let cookStart = '<' + name + '>',
        cookEnd = '</' + name + '>';

    let cook = document.cookie,
        p1 = cook.indexOf(cookStart),
        p2 = cook.lastIndexOf(cookEnd),
        res = cook.slice(p1, p2).replace(cookStart, '');
    return res;
}

function setCookie(name, value) {
    let cookStart = '<' + name + '>',
        cookEnd = '</' + name + '>';

    function getP(c) {
        return [c.indexOf(cookStart), c.lastIndexOf(cookEnd)]
    }

    let cook = document.cookie,
        p = getP(cook);
    if (p[0] == -1) {
        cook = cookStart + cookEnd + cook;
        p = getP(cook);
    }

    res = cook.slice(0, p[0]) + cookStart + value + cook.slice(p[1], cook.length);

    document.cookie = res;
}

function foldToCookie() {
    let cook = '';
    for (let i = 0; i < fold.length; i++) {
        cook += fold[i][0] + ((i != fold.length - 1) ? ']%[' : '');
    }
    setCookie(title, cook);
}

function cookieToFload() {
    if (document.cookie) {
        let cook = getCookie(title).split(']%[');
        for (let c of cook) {
            if (c == '') { continue }
            let flod = document.querySelector("#" + c + " h1");
            flod.click();
        }
    }
}

function foldArea(item) {
    let id = item.parentElement.id,
        area = document.querySelector('#' + id + ' .fold'),
        h = area.getBoundingClientRect().height;
    console.log('%c id:', 'background: #ffcc00; color: #003300', id)
    console.log('%c area:', 'background: #ffcc00; color: #003300', area)

    if (h > 2) {
        fold.push([id, h]);
        area.style.height = h + "px";
        setTimeout(() => {
            area.style.height = "0px";
            // area.style.marginBottom = "0px";
            area.style.borderBottom = '2px solid var(--color_1)';
            area.style.overflow = 'hidden';
        }, 20);
    } else {
        oldH = fold.find(i => i[0] == id);
        area.style.height = oldH[1] + "px";
        area.style.borderBottom = '0px solid var(--color_1)';
        setTimeout(() => { area.style.overflow = '' }, 600);
        // area.style.marginBottom = "0";
        let ind = fold.findIndex(i => i[0] == id);
        fold.splice(ind, 1);
    }
    foldToCookie();
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

    // let h1s = document.querySelectorAll("h1");
    // for (let f of h1s) {
    //     if (f.dataset.close == "true") {
    //         f.onclick();
    //         // console.log('%c fff:', 'background: #ffcc00; color: #003300', f)
    //     }
    //     // console.log('%c f:', 'background: #ffcc00; color: #003300', f)
    // }

    let progA = document.querySelectorAll("#programing .part .part a");
    for (let i = 0; i < progA.length; i++) {
        // console.log('%c parts[i].childNodes:', 'background: #ffcc00; color: #003300', progA[i].childNodes[0].nodeName)
        if (progA[i].childNodes[0].nodeName == "IMG") {
            progA[i].classList.add("img");
        }
    }

    cookieToFload();

    setTimeout(() => {
        let floo = document.querySelectorAll('.part .fold');
        for (let f of floo) {
            f.style.setProperty('-webkit-transition', 'all .6s');
            f.style.setProperty('transition', 'all .6s');
        }
    }, 100);

    // setTimeout(() => {

    //     window.open("secret.html", '_blank', "height=500,width=500,toolbar=no,menubar=no,location=no,titlebar=no,status=no,directories=no,channelmode=no").focus();
    // }, 2000);

}

start();