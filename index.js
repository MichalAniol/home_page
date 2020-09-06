var fold = [];
// document.cookie = "";

const title = document.querySelector('title').innerHTML;

// let b = [1, 2, 3, 4, 5, 6, 7].toString()
// localStorage.setItem(
//     'test', b
// );

// // localStorage.getItem(test)
// setTimeout(() => {
//     let a = localStorage.getItem('test');
//     console.log('%c localStorage.getItem(test):', 'background: #ffcc00; color: #003300', a[0])
// }, 100);


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
            if (fol[i] != "") {
                let f = document.querySelector("#" + fol[i] + " h1");
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

    remindFload();

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


const CopyToClipboard = (but, containerid) => {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
        range.moveToElementText(document.getElementById('end_copy'));
        range.select().createTextRange();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        range.selectNode(document.getElementById('end_copy'));
        window.getSelection().addRange(range);
    }
    but.innerHTML = "c o p i e d &nbsp; ! ! !";
    setTimeout(() => {
        but.innerHTML = "copy";
    }, 500);
}
