const waitingRoomFoo = () => {
    const waitingRoom = document.getElementById('waiting-room');
    const newSites = [{
            name: 'kroniki myrtany',
            href: 'https://kronikimyrtany.pl/pl',
        }, {
            name: 'TensorFlow',
            href: 'http://majcher.net/sieci-neuronowe-definicja-klasy-i-modelu-z-uzyciem-tensorflow',
        }, {
            name: 'czyste funkcje',
            href: 'https://www.magicweb.pl/programowanie/programowanie-funkcyjne-czyste-funkcje',
        }, {
            name: 'GraphQL',
            href: 'https://frontlive.pl/blog/graphql-podstawy',
        }, {
            name: 'GraphQL',
            href: 'https://cezarywalenciuk.pl/blog/programing/odczytywanie-graphql-api-klient-w-aspnet-core',
        }, {
            name: 'Graph Drawing',
            href: 'https://cs.brown.edu/people/rtamassi/gdhandbook/',
        }, {
            name: 'cs.brown.edu',
            href: 'https://cs.brown.edu/research/pubs/theses/phd/',
        },];
    for (const site of newSites) {
        const a = document.createElement('a');
        a.href = site.href;
        a.innerHTML = site.name;
        a.className = 'smallpseudoicon';
        waitingRoom.appendChild(a);
    }
};
waitingRoomFoo();
(function () {
    const fold = [];
    const title = document.querySelector('title').innerHTML;
    const rememberFold = () => {
        localStorage.setItem('fold' + title, fold.toString());
    };
    const remindFold = () => {
        const fold = localStorage.getItem('fold' + title);
        if (!!fold) {
            const foldSplitted = fold.split(',');
            for (let i = 0; i < foldSplitted.length; i += 2) {
                if (foldSplitted[i] != '') {
                    let foldH1 = document.querySelector(`#${foldSplitted[i]} h1`);
                    foldH1.click();
                }
            }
        }
    };
    const foldArea = (item) => {
        const id = item.parentElement.id, area = document.querySelector(`#${id} .fold`), h = area.getBoundingClientRect().height;
        if (h > 2) {
            fold.push([id, h]);
            area.style.height = h + 'px';
            setTimeout(() => {
                area.style.height = '0px';
                area.style.borderBottom = '2px solid var(--color_1)';
                area.style.overflow = 'hidden';
            }, 20);
        }
        else {
            const oldH = fold.find(i => i[0] == id);
            area.style.height = oldH[1] + 'px';
            area.style.borderBottom = '0px solid var(--color_1)';
            setTimeout(() => { area.style.overflow = ''; }, 600);
            let ind = fold.findIndex(i => i[0] == id);
            fold.splice(ind, 1);
        }
        rememberFold();
    };
    const start = () => {
        let parts = document.querySelectorAll('.part');
        for (let i = 0; i < parts.length; ++i) {
            let part = parts[i];
            part.id = 'part_' + i;
            let h1 = part.querySelector('h1');
            h1.addEventListener('click', () => foldArea(h1));
        }
        let as = document.querySelectorAll('a');
        for (let a of as) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }
        let progA = document.querySelectorAll('#programing .part .part a');
        for (let i = 0; i < progA.length; i++) {
            if (progA[i].childNodes[0].nodeName == 'IMG') {
                progA[i].classList.add('img');
            }
        }
        remindFold();
        setTimeout(() => {
            let folds = document.querySelectorAll('.part .fold');
            for (let f of folds) {
                f.style.setProperty('-webkit-transition', 'all .6s');
                f.style.setProperty('transition', 'all .6s');
            }
        }, 100);
    };
    start();
}());
const CopyToClipboard = (button, containerId) => {
    if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(document.getElementById(containerId));
        window.getSelection().addRange(range);
        document.execCommand('copy');
        setTimeout(() => {
            range.selectNode(document.getElementById('end_copy'));
            window.getSelection().addRange(range);
        }, 30);
        button.innerHTML = 'c o p i e d &nbsp; ! ! !';
        setTimeout(() => {
            button.innerHTML = 'copy';
        }, 500);
    }
};
(function () {
    const canvas = document.getElementById("mycanvas"), ctx = canvas.getContext("2d"), s = 1.1;
    canvas.width = (425 * s);
    canvas.height = (240 * s);
    const width = canvas.width, height = canvas.height, cA = canvas.getBoundingClientRect(), browser = navigator.appVersion == "5.0 (Windows)" ? false : true, now = Date.now(), wC = 2 * Math.PI, pos = {
        x: 0,
        y: 0,
        n: null,
        m: null,
        s: null
    }, counter = [0, 0, 0], snake = [];
    let lock = [0, 0, 0, 0];
    let LAdate = new Date(new Date(Date.now()).toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
    let mouseOnClock = false, simple = true, clock = true, moveMem = 0, memX = 0, memY = 0, moveRound = true, snMove = 0, firstRound = true;
    const back = "#000800", col = "#006600";
    for (let i = 0; i < 66; i++) {
        let val = (Math.sin((Math.PI * (i / 66))) * 300) + 300;
        if (i > 33) {
            val = 600 - val;
        }
        snake[i] = val;
    }
    document.querySelector('body').addEventListener('mousemove', (evt) => {
        pos.x = evt.clientX;
        pos.y = evt.clientY;
        if (browser) {
            pos.n = evt.path[1].href;
        }
        else {
            if (evt.target.id !== 'searcher') {
                pos.n = evt.originalTarget.parentElement.href;
            }
        }
        const moX = Math.abs(evt.movementX), moY = Math.abs(evt.movementY);
        pos.m = Math.sqrt((moX * moX) + (moY * moY));
        pos.s = pos.m;
        if (pos.m > 20)
            pos.m = 20;
        if (clock) {
            let cx = cA.left + (width / 2) - pos.x, cy = cA.top + (height / 2) - pos.y, ss = 1.9 * s;
            if ((cx * cx) + (cy * cy) < (60 * 60 * ss) + (60 * 60 * ss)) {
                mouseOnClock = true;
                return;
            }
            else {
                mouseOnClock = false;
            }
        }
        else {
            mouseOnClock = false;
        }
    }, false);
    canvas.addEventListener('click', evt => {
        let c = cA, { clientX: x, clientY: y } = evt;
        if (!simple && !clock) {
            if (x > cA.left && x < cA.left + 30 && y > cA.top && y < cA.top + 30) {
                lock[0] = 1;
                return;
            }
            if (x > cA.right - 30 && x < cA.right && y > cA.top && y < cA.top + 30) {
                lock[1] = 1;
                return;
            }
            if (x > cA.left && x < cA.left + 30 && y > cA.bottom - 30 && y < cA.bottom) {
                lock[2] = 1;
                return;
            }
            if (x > cA.right - 30 && x < cA.right && y > cA.bottom - 30 && y < cA.bottom) {
                lock[3] = 1;
                return;
            }
        }
        if (clock) {
            let cx = cA.left + (width / 2) - x, cy = cA.top + (height / 2) - y, ss = 1.9 * s;
            if ((cx * cx) + (cy * cy) < (60 * 60 * ss) + (60 * 60 * ss)) {
                return;
            }
        }
        if (x > cA.left && x < cA.right && y > cA.top && y < cA.bottom) {
            changeView();
        }
        if (lock[0] == 1 && lock[1] == 1 && lock[2] == 1 && lock[3] == 1) {
            let hidden = document.getElementById("hidden");
            hidden.style.width = "20px";
            hidden.style.height = "20px";
            hidden.style.top = "30px";
            hidden.style.left = "525px";
            hidden.style.border = `1px dashed ${col}88`;
        }
    }, false);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.textBaseline = "bottom";
    ctx.textAlign = "left";
    ctx.lineWidth = 0;
    const changeView = () => {
        if (!simple && !clock) {
            simple = true;
            clock = true;
            return;
        }
        if (simple && !clock) {
            simple = false;
            return;
        }
        if (simple && clock)
            clock = false;
    };
    const animation = () => {
        const date = new Date(), p = {
            yea: date.getFullYear(),
            mou: date.getUTCMonth() + 1,
            day: date.getUTCDate(),
            hou: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds(),
            mil: date.getMilliseconds()
        };
        {
            ctx.beginPath();
            ctx.fillStyle = back;
            ctx.rect(0, 0, width, height);
            ctx.fill();
        }
        ctx.fillStyle = col;
        if (!simple) {
            {
                ctx.translate(315 * s, -130 * s);
                ctx.rotate((Math.PI / 12) * (Math.sin((Math.PI * 2) * (counter[0] / 80))));
                ctx.beginPath();
                ctx.arc(0, 345 * s, 12 * s, 0, wC, true);
                ctx.fill();
                ctx.rect(-1 * s, -1 * s, 2 * s, 360 * s);
                ctx.fill();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            {
                ctx.translate(350 * s, 145 * s);
                ctx.save();
                ctx.fillStyle = back;
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.arc(0, 0, 67 * s, 0, wC, true);
                ctx.fill();
                ctx.restore();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            {
                ctx.translate(235 * s, 130 * s);
                const time = Date.now() - now, rot = (wC * ((time % 60000) / 60000)) + Math.PI + (Math.PI / 40), rot2 = Math.PI;
                let tabStr = wC / 40;
                ctx.rotate(rot2);
                ctx.save();
                ctx.fillStyle = back;
                ctx.globalAlpha = 0.7;
                ctx.beginPath();
                ctx.arc(0, 0, 45 * s, 0, wC, true);
                ctx.fill();
                ctx.restore();
                const base = 35;
                for (let i = 0; i < 40; i++) {
                    ctx.beginPath();
                    if (firstRound == true) {
                        if (i < counter[0] / 2) {
                            if (i % 10 == 0) {
                                ctx.rect(-1.5 * s, (base + 2) * s, 3 * s, 11 * s);
                            }
                            else {
                                ctx.rect(-1 * s, base * s, 2 * s, 6 * s);
                            }
                        }
                        else {
                            if (i % 10 == 0) {
                                ctx.rect(-1 * s, (base + 1) * s, 2 * s, 9 * s);
                            }
                            else {
                                ctx.rect(-0.5 * s, (base - 1) * s, 1 * s, 4 * s);
                            }
                        }
                    }
                    else {
                        if (i < counter[0] / 2) {
                            if (i % 10 == 0) {
                                ctx.rect(-1 * s, (base + 1) * s, 2 * s, 9 * s);
                            }
                            else {
                                ctx.rect(-0.5 * s, (base - 1) * s, 1 * s, 4 * s);
                            }
                        }
                        else {
                            if (i % 10 == 0) {
                                ctx.rect(-1.5 * s, (base + 2) * s, 3 * s, 11 * s);
                            }
                            else {
                                ctx.rect(-1 * s, base * s, 2 * s, 6 * s);
                            }
                        }
                    }
                    ctx.fill();
                    ctx.rotate(tabStr);
                }
                ctx.beginPath();
                ctx.strokeStyle = col;
                ctx.lineWidth = 0.3 * s;
                ctx.arc(0, 0, 17 * s, 0, wC, true);
                ctx.stroke();
                ctx.rotate(-rot2 + Math.PI - (Math.PI / 40));
                tabStr = wC / 15;
                ctx.lineWidth = 1 * s;
                let balT = Math.floor(time / 4000) % 15;
                let bal = (time - (Math.floor(time / 4000) * 4000)) / 4000;
                for (let i = 0; i < 15; i++) {
                    if (balT == i) {
                        if (Math.floor((time) / 60000) % 2 == 0) {
                            ctx.lineWidth = bal * s;
                            ctx.beginPath();
                            ctx.arc(-2 * s, 23 * s, 3.5 * bal * s, 0, wC, true);
                            ctx.stroke();
                        }
                        else {
                            ctx.lineWidth = (1 - bal) * s;
                            ctx.beginPath();
                            ctx.arc(-2 * s, 23 * s, (3.5 - (3.5 * bal)) * s, 0, wC, true);
                            ctx.stroke();
                        }
                    }
                    if (Math.floor((time) / 60000) % 2 == 0) {
                        if (balT > i) {
                            ctx.lineWidth = 1 * s;
                            ctx.beginPath();
                            ctx.arc(-2 * s, 23 * s, 3.5 * s, 0, wC, true);
                            ctx.stroke();
                        }
                    }
                    else {
                        if (balT < i) {
                            ctx.lineWidth = 1 * s;
                            ctx.beginPath();
                            ctx.arc(-2 * s, 23 * s, 3.5 * s, 0, wC, true);
                            ctx.stroke();
                        }
                    }
                    ctx.rotate(tabStr);
                }
                ctx.rotate(rot2);
                ctx.rotate(rot);
                ctx.strokeStyle = back;
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(0, 23 * s);
                ctx.lineTo(-7 * s, 9 * s);
                ctx.lineTo(7 * s, 9 * s);
                ctx.fill();
                ctx.stroke();
                ctx.rotate(-rot);
                ctx.rotate((wC / 80 * counter[0]) + Math.PI);
                ctx.beginPath();
                ctx.rect(-2 * s, -15 * s, 4 * s, 55 * s);
                ctx.fill();
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        if (!clock) {
            let time = Date.now() - now;
            ctx.save();
            ctx.fillStyle = back;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.rect(210 * s, 10 * s, 208 * s, 35 * s);
            ctx.fill();
            ctx.restore();
            let timeH = (Math.floor(time / 3600000)).toString();
            if (timeH.length < 2) {
                timeH = "0" + timeH;
            }
            else {
                timeH = timeH.toString();
            }
            let timeM = (Math.floor(time / 60000) % 60).toString();
            if (timeM.length < 2) {
                timeM = "0" + timeM;
            }
            let timeS = (Math.floor(time / 1000) % 60).toString();
            if (timeS.length < 2) {
                timeS = "0" + timeS;
            }
            let timeP = Math.round(time / (100)).toString();
            timeP = timeP.substr(timeP.length - 1, 1);
            const timeString = timeH + ":" + timeM + ":" + timeS + "." + timeP;
            ctx.font = (40 * s) + "px Rubik";
            ctx.fillText(timeString, 210 * s, 50 * s);
        }
        if (!simple) {
            {
                const trX = 130 - 14, trY = 80 - 14;
                ctx.translate(trX * s, trY * s);
                ctx.lineWidth = 1 * s;
                ctx.strokeStyle = col;
                ctx.fillStyle = back;
                let size = 15 * s, broo = (3 * s) + size, pu = ((counter[0] % 20) / 20) * broo, boxCase = Math.floor(counter[0] / 20) % 4;
                switch (boxCase) {
                    case 0:
                        ctx.beginPath();
                        ctx.rect(0, 0, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(broo, 0 + pu, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(0, broo, size, size);
                        ctx.stroke();
                        break;
                    case 1:
                        ctx.beginPath();
                        ctx.rect(0, broo, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(0 + pu, 0, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(broo, broo, size, size);
                        ctx.stroke();
                        break;
                    case 2:
                        ctx.beginPath();
                        ctx.rect(0, broo - pu, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(broo, 0, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(broo, broo, size, size);
                        ctx.stroke();
                        break;
                    case 3:
                        ctx.beginPath();
                        ctx.rect(0, 0, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(broo, 0, size, size);
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.rect(broo - pu, broo, size, size);
                        ctx.stroke();
                        break;
                }
                ctx.translate(-2 * s, -2 * s);
                ctx.strokeStyle = back;
                ctx.fillStyle = col;
                size = 10 * s;
                broo = (17 * s) + size;
                pu = ((counter[0] % 20) / 20) * broo;
                switch (boxCase) {
                    case 0:
                        ctx.beginPath();
                        ctx.rect(0, 0, size, size);
                        ctx.fill();
                        ctx.rect(broo, 0 + pu, size, size);
                        ctx.fill();
                        ctx.rect(0, broo, size, size);
                        ctx.fill();
                        break;
                    case 1:
                        ctx.beginPath();
                        ctx.rect(0, broo, size, size);
                        ctx.fill();
                        ctx.rect(0 + pu, 0, size, size);
                        ctx.fill();
                        ctx.rect(broo, broo, size, size);
                        ctx.fill();
                        break;
                    case 2:
                        ctx.beginPath();
                        ctx.rect(0, broo - pu, size, size);
                        ctx.fill();
                        ctx.rect(broo, 0, size, size);
                        ctx.fill();
                        ctx.rect(broo, broo, size, size);
                        ctx.fill();
                        break;
                    case 3:
                        ctx.beginPath();
                        ctx.rect(0, 0, size, size);
                        ctx.fill();
                        ctx.rect(broo, 0, size, size);
                        ctx.fill();
                        ctx.rect(broo - pu, broo, size, size);
                        ctx.fill();
                        break;
                }
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            {
                ctx.translate(325 * s, 167 * s);
                ctx.rotate((Math.PI / 250 * counter[1]) + (Math.PI));
                const rot = (Math.PI / 20) * counter[0];
                ctx.rotate(rot);
                ctx.beginPath();
                ctx.arc(0, 0, 14 * s, 0, Math.PI * 1.3, true);
                ctx.fill();
                ctx.rotate(-rot * 2);
                ctx.beginPath();
                ctx.arc(0, 0, 14 * s, 0, Math.PI * 1.3, true);
                ctx.fill();
                ctx.beginPath();
                ctx.strokeStyle = col;
                ctx.lineWidth = 0.5 * s;
                ctx.arc(0, 0, 18 * s, 0, wC, true);
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
            {
                ctx.translate(375 * s, 167 * s);
                ctx.rotate((Math.PI / 41 * counter[2]) + (Math.PI));
                ctx.beginPath();
                ctx.strokeStyle = col;
                ctx.lineWidth = 0.5 * s;
                ctx.arc(0, 0, 18 * s, 0, wC, true);
                ctx.stroke();
                let move = (p.mil / 1000) * 8 * s;
                if (moveMem > move) {
                    moveRound = moveRound == true ? false : true;
                }
                moveMem = move;
                if (moveRound == false) {
                    move = (8 * s) - move;
                }
                ctx.strokeStyle = back;
                ctx.beginPath();
                ctx.arc((8 * s) - (move * 1.8), 0, (10 * s) - move, 0, wC, true);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(-move, 0, (2 * s) + move, 0, wC, true);
                ctx.fill();
                ctx.stroke();
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        {
            let timeB = "" + (p.hou < 10 ? "0" : "") + p.hou + ":" + (p.min < 10 ? "0" : "") + p.min + ":" + (p.sec < 10 ? "0" : "") + p.sec;
            if (!clock) {
                ctx.font = (50 * s) + "px Rubik";
                ctx.fillText(timeB, 10 * s, 229 * s);
            }
            else {
                ctx.font = (40 * s) + "px Rubik";
                ctx.fillText(timeB, ((width / 2) - 99) * s, 180 * s);
            }
        }
        {
            let ss;
            if (clock) {
                ss = s * 1.9;
                ctx.translate((width / 2), (height / 2));
            }
            else {
                ss = s;
                ctx.translate(350 * s, 145 * s);
            }
            let rot = wC / (12 * 2 * 5);
            function binaryPin(x, y, on) {
                if (on) {
                    ctx.beginPath();
                    ctx.rect(x * ss, y * ss, 6 * ss, 6 * ss);
                    ctx.fill();
                }
                ctx.beginPath();
                ctx.rect((x - 1) * ss, (y - 1) * ss, 8 * ss, 8 * ss);
                ctx.stroke();
            }
            if (clock) {
                for (let i = 0; i < 12 * 2 * 5; i++) {
                    ctx.beginPath();
                    if (i % 5 == 0) {
                        if (i % 10 == 0) {
                            if (i % 30 == 0) {
                                ctx.rect(-1.5 * ss, 53 * ss, 3 * ss, 13 * ss);
                            }
                            else {
                                ctx.rect(-1 * ss, 55 * ss, 2 * ss, 8 * ss);
                            }
                        }
                        else {
                            ctx.rect(-0.5 * ss, 55 * ss, 1 * ss, 7 * ss);
                        }
                    }
                    else {
                        ctx.rect(-0.2 * ss, 55 * ss, .4 * ss, 4 * ss);
                    }
                    ctx.fill();
                    ctx.rotate(rot);
                }
                ctx.strokeStyle = col;
                let binY = -35;
                binaryPin(-31, binY, (p.hou & 32) >> 5);
                binaryPin(-20, binY, (p.hou & 16) >> 4);
                binaryPin(-9, binY, (p.hou & 8) >> 3);
                binaryPin(2, binY, (p.hou & 4) >> 2);
                binaryPin(13, binY, (p.hou & 2) >> 1);
                binaryPin(24, binY, (p.hou & 1));
                binY = -24;
                binaryPin(-31, binY, (p.min & 32) >> 5);
                binaryPin(-20, binY, (p.min & 16) >> 4);
                binaryPin(-9, binY, (p.min & 8) >> 3);
                binaryPin(2, binY, (p.min & 4) >> 2);
                binaryPin(13, binY, (p.min & 2) >> 1);
                binaryPin(24, binY, (p.min & 1));
                binY = -13;
                binaryPin(-31, binY, (p.sec & 32) >> 5);
                binaryPin(-20, binY, (p.sec & 16) >> 4);
                binaryPin(-9, binY, (p.sec & 8) >> 3);
                binaryPin(2, binY, (p.sec & 4) >> 2);
                binaryPin(13, binY, (p.sec & 2) >> 1);
                binaryPin(24, binY, (p.sec & 1));
            }
            else {
                ctx.font = (14 * ss) + "px Rubik";
                ctx.fillText("a  n  i  o  ł", -30 * ss, -20 * ss);
                for (let i = 0; i < 12 * 2 * 5; i++) {
                    ctx.beginPath();
                    if (i % 5 == 0) {
                        if (i % 10 == 0) {
                            if (i % 30 == 0) {
                                ctx.rect(-2.5 * ss, 53 * ss, 5 * ss, 13 * ss);
                            }
                            else {
                                ctx.rect(-2 * ss, 55 * ss, 4 * ss, 8 * ss);
                            }
                        }
                        else {
                            ctx.rect(-0.5 * ss, 55 * ss, 1 * ss, 7 * ss);
                        }
                    }
                    else {
                        ctx.rect(-0.5 * ss, 55 * ss, 1 * ss, 4 * ss);
                    }
                    ctx.fill();
                    ctx.rotate(rot);
                }
            }
            ctx.strokeStyle = back;
            ctx.lineWidth = 1 * ss;
            rot = Math.PI + ((wC / 720) * ((p.hou * 60) + p.min));
            ctx.rotate(rot);
            ctx.beginPath();
            if (clock) {
                ctx.rect(-1.6 * ss, -3 * ss, 3.2 * ss, 45 * ss);
            }
            else {
                ctx.rect(-3 * ss, -3 * ss, 6 * ss, 45 * ss);
            }
            ctx.fill();
            ctx.rotate(-rot);
            ctx.stroke();
            rot = Math.PI + ((wC / 3600) * ((p.min * 60) + p.sec));
            ctx.rotate(rot);
            ctx.beginPath();
            if (clock) {
                ctx.rect(-1.2 * ss, -2 * ss, 2.4 * ss, 65 * ss);
            }
            else {
                ctx.rect(-2 * ss, -2 * ss, 4 * ss, 65 * ss);
            }
            ctx.fill();
            ctx.rotate(-rot);
            ctx.stroke();
            ctx.lineWidth = .6 * ss;
            rot = Math.PI + ((wC / 60000) * ((p.sec * 1000) + p.mil));
            ctx.rotate(rot);
            ctx.beginPath();
            if (clock) {
                ctx.rect(-.6 * ss, -1 * ss, 1.2 * ss, 65 * ss);
            }
            else {
                ctx.rect(-1 * ss, -1 * ss, 2 * ss, 65 * ss);
            }
            ctx.fill();
            ctx.rotate(-rot);
            ctx.stroke();
            ctx.lineWidth = .5 * ss;
            ctx.beginPath();
            ctx.arc(0, 0, 3 * ss, 0, wC, true);
            ctx.fill();
            ctx.stroke();
            if (mouseOnClock) {
                ctx.save();
                ctx.fillStyle = back;
                ctx.globalAlpha = 0.95;
                ctx.lineWidth = 0;
                ctx.beginPath();
                ctx.arc(0, 0, 57 * ss, 0, wC, true);
                ctx.fill();
                ctx.restore();
                ctx.font = (35 * s) + "px Rubik";
                let txt = 'ADD ALARM';
                ctx.fillText(txt, (-ctx.measureText(txt).width) / 2, (37 * s) / 2);
                document.body.style.cursor = 'pointer';
            }
            else {
                document.body.style.cursor = 'default';
            }
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        if (!clock) {
            let dayName;
            switch (date.getDay()) {
                case 0:
                    dayName = "niedziela";
                    break;
                case 1:
                    dayName = "poniedziałek";
                    break;
                case 2:
                    dayName = "wtorek";
                    break;
                case 3:
                    dayName = "środa";
                    break;
                case 4:
                    dayName = "czwartek";
                    break;
                case 5:
                    dayName = "piątek";
                    break;
                case 6:
                    dayName = "sobota";
                    break;
            }
            ctx.font = (40 * s) + "px Rubik";
            ctx.fillText(dayName, 10 * s, 185 * s);
            let mouName;
            switch (p.mou) {
                case 1:
                    mouName = "styczeń";
                    break;
                case 2:
                    mouName = "luty";
                    break;
                case 3:
                    mouName = "marzec";
                    break;
                case 4:
                    mouName = "kwiecień";
                    break;
                case 5:
                    mouName = "maj";
                    break;
                case 6:
                    mouName = "czerwiec";
                    break;
                case 7:
                    mouName = "lipiec";
                    break;
                case 8:
                    mouName = "sierpień";
                    break;
                case 9:
                    mouName = "wrzesień";
                    break;
                case 10:
                    mouName = "październik";
                    break;
                case 11:
                    mouName = "listopad";
                    break;
                case 12:
                    mouName = "grudzień";
                    break;
            }
            ctx.font = (20 * s) + "px Rubik";
            ctx.fillText(mouName, 10 * s, 125 * s);
            const pp = {
                mou: p.mou.toString(),
                day: p.day.toString(),
            };
            if (pp.mou.length < 2) {
                pp.mou = "0" + pp.mou;
            }
            if (pp.day.length < 2) {
                pp.day = "0" + pp.day;
            }
            let timeP = p.yea.toString() + "." + pp.mou + "." + pp.day;
            ctx.font = (26 * s) + "px Rubik";
            ctx.fillText(timeP, 10 * s, 150 * s);
        }
        if (!simple) {
            {
                ctx.font = (16 * s) + "px Rubik";
                ctx.fillText(pos.x.toString(), 65 * s, 84 * s);
                ctx.fillText(pos.y.toString(), 65 * s, 104 * s);
                ctx.lineWidth = 0.7 * s;
                ctx.strokeStyle = col;
                ctx.beginPath();
                ctx.moveTo(10 * s, 83 * s);
                ctx.lineTo(100 * s, 83 * s);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(30 * s, (83 - 20) * s);
                ctx.lineTo(30 * s, (83 + 20) * s);
                ctx.stroke();
                ctx.beginPath();
                if (memX != pos.x || memY != pos.y) {
                    ctx.lineWidth = pos.m / 2;
                    ctx.arc(30 * s, 83 * s, (20 - (pos.m / 2)) * s, 0, wC, true);
                }
                else {
                    ctx.arc(30 * s, 83 * s, 16 * s, 0, wC, true);
                    pos.s = 1;
                }
                ctx.stroke();
                memX = pos.x;
                memY = pos.y;
                ctx.save();
                ctx.lineWidth = 1 * s;
                ctx.strokeStyle = col;
                ctx.fillStyle = back;
                if (lock[0] == 1) {
                    ctx.beginPath();
                    ctx.rect((30 - 7) * s, (83 - 7) * s, 3 * s, 3 * s);
                    ctx.stroke();
                }
                if (lock[1] == 1) {
                    ctx.beginPath();
                    ctx.rect((30 + 4) * s, (83 - 7) * s, 3 * s, 3 * s);
                    ctx.stroke();
                }
                if (lock[2] == 1) {
                    ctx.beginPath();
                    ctx.rect((30 - 7) * s, (83 + 4) * s, 3 * s, 3 * s);
                    ctx.stroke();
                }
                if (lock[3] == 1) {
                    ctx.beginPath();
                    ctx.rect((30 + 4) * s, (83 + 4) * s, 3 * s, 3 * s);
                    ctx.stroke();
                }
                ctx.restore();
            }
            {
                let sX = 30 * s, sY = 38 * s;
                ctx.lineWidth = 0.2 * s;
                ctx.beginPath();
                ctx.lineTo(sX + (3 * s), sY);
                ctx.lineTo(sX + (97 * s), sY);
                ctx.stroke();
                ctx.lineWidth = 0.7 * s;
                ctx.beginPath();
                let si;
                if (pos.s != 1) {
                    si = 0;
                }
                else {
                    si = Math.sin((counter[1] / 5) * pos.s) * 15;
                }
                ctx.lineTo(sX - (20 * s), sY + (si * s));
                ctx.lineTo(sX, sY + (si * s));
                ctx.stroke();
                ctx.lineWidth = 2.7 * s;
                ctx.beginPath();
                let multip;
                if (pos.s != 1) {
                    multip = 1 + (pos.s / 3);
                }
                else {
                    multip = 1;
                }
                for (let i = 0; i < 100; i++) {
                    si = Math.sin(((i / 11) + (counter[1] / 5)) * multip) * 15;
                    ctx.lineTo(sX + (i * s), sY + (si * s));
                }
                ctx.stroke();
                ctx.lineWidth = 0.7 * s;
                ctx.beginPath();
                if (pos.s != 1) {
                    si = 0;
                    ctx.lineTo(sX + (100 * s), sY + (si * s));
                }
                else {
                    si = Math.sin(((99 / 11) + (counter[1] / 5)) * pos.s) * 15;
                }
                ctx.lineTo(sX + (100 * s), sY + (si * s));
                ctx.lineTo(sX + 115, sY + (si * s));
                ctx.lineTo(sX + (120 * s), sY + ((si + 5) * s));
                ctx.lineTo(sX + (160 * s), sY + ((si + 5) * s));
                ctx.stroke();
                let siT;
                if (pos.s != 1) {
                    siT = pos.s.toString().substr(0, 6);
                }
                else {
                    siT = (Math.ceil(-si * 100) / 100).toString();
                }
                ctx.font = (12 * s) + "px Rubik";
                ctx.fillText(siT, sX + (122 * s), sY + ((si + 5) * s));
            }
            {
                if (pos.n != undefined) {
                    ctx.font = (16 * s) + "px Rubik";
                    ctx.save();
                    ctx.fillStyle = back;
                    ctx.globalAlpha = 0.7;
                    ctx.beginPath();
                    ctx.rect(7 * s, 220 * s, (ctx.measureText(pos.n).width + 5) * s, 20 * s);
                    ctx.fill();
                    ctx.restore();
                    ctx.fillText(pos.n, 10 * s, 239 * s);
                }
            }
            {
                let sMov = (Math.sin((wC * counter[0] / 80)) * 5);
                if (sMov < 0) {
                    sMov = -sMov;
                }
                let sMov2 = (Math.sin((wC * counter[1] / 250)) * 3) + 3, sMulti = 0.9 + (Math.sin((wC * counter[2] / 82)) * 0.4), sMulti2 = 1 + (Math.sin((wC * counter[1] / 500)) * 0.7), size = 0.5 + (sMov2 / 5) + (sMov / 10);
                let snW = width - size, snH = height - size, holeCycle = (snW * 2) + (snH * 2);
                snMove += sMov + sMov2;
                if (snMove > holeCycle) {
                    snMove -= holeCycle;
                }
                for (let i = 0; i < snake.length; i++) {
                    let sn = (snake[i] * sMulti * sMulti2) + snMove;
                    function tooMuch() {
                        if (sn > holeCycle) {
                            sn -= holeCycle;
                            tooMuch();
                        }
                    }
                    function tooLitle() {
                        if (sn < 0) {
                            sn += holeCycle;
                            tooLitle();
                        }
                    }
                    tooMuch();
                    tooLitle();
                    let snX, snY;
                    if (sn > snW) {
                        sn -= snW;
                        snX = snW;
                        snY = sn;
                        if (sn > snH) {
                            sn -= snH;
                            snX = snW - sn;
                            snY = snH;
                            if (sn > snW) {
                                sn -= snW;
                                snX = 0;
                                snY = snH - sn;
                            }
                        }
                    }
                    else {
                        snX = sn;
                        snY = 0;
                    }
                    ctx.beginPath();
                    ctx.rect(snX, snY, size * s, size * s);
                    ctx.fill();
                }
            }
        }
        if (!clock) {
            ctx.save();
            ctx.fillStyle = back;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.rect(214 * s, 46 * s, 192 * s, 33 * s);
            ctx.fill();
            ctx.restore();
            let dayName;
            switch (LAdate.getDay()) {
                case 0:
                    dayName = "niedziela";
                    break;
                case 1:
                    dayName = "poniedziałek";
                    break;
                case 2:
                    dayName = "wtorek";
                    break;
                case 3:
                    dayName = "środa";
                    break;
                case 4:
                    dayName = "czwartek";
                    break;
                case 5:
                    dayName = "piątek";
                    break;
                case 6:
                    dayName = "sobota";
                    break;
            }
            const p = {
                hou: LAdate.getHours(),
                min: LAdate.getMinutes(),
            };
            const pp = {
                hou: p.hou.toString(),
                min: p.min.toString(),
            };
            if (pp.hou.length < 2) {
                pp.hou = "0" + pp.hou;
            }
            if (pp.min.length < 2) {
                pp.min = "0" + pp.min;
            }
            const time = pp.hou + ":" + pp.min;
            ctx.font = (30 * s) + "px Rubik";
            ctx.measureText(time);
            let timeW = (410 * s) - ctx.measureText(time).width;
            ctx.fillText(time, timeW, 80 * s);
            ctx.font = (18 * s) + "px Rubik";
            let dayNameW = timeW - ctx.measureText(dayName).width - (7 * s);
            ctx.fillText(dayName, dayNameW, 77 * s);
            ctx.font = (8 * s) + "px Rubik";
            ctx.fillText("LOS ANGELES", dayNameW, 60 * s);
            ctx.strokeStyle = col;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.rect(dayNameW - (3 * s), 48 * s, (415 * s) - dayNameW, 29 * s);
            ctx.stroke();
        }
        if (!clock) {
            for (let i = 0; i < counter.length; i++) {
                counter[i]++;
            }
            if (counter[0] > 79) {
                counter[0] = 0;
                LAdate = new Date(new Date(Date.now()).toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
                if (firstRound == true) {
                    firstRound = false;
                }
                else {
                    firstRound = true;
                }
            }
            if (counter[1] > 500) {
                counter[1] = 0;
            }
            if (counter[2] > 574) {
                counter[2] = 0;
            }
        }
    };
    const hiddenClick = (hidden) => {
        hidden.style.width = "0";
        hidden.style.height = "0";
        hidden.style.top = "0";
        hidden.style.left = "0";
        hidden.style.border = "none";
        lock = [0, 0, 0, 0];
        const q = document.querySelector('#part_0 h1');
        q.click();
    };
    const hiddenElem = document.getElementById('hidden');
    hiddenElem.addEventListener('click', () => hiddenClick(hiddenElem));
    let anim = setInterval(animation, 50);
    window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(anim);
        }
        else {
            anim = setInterval(animation, 50);
        }
    });
})();
const search = (function () {
    const searcher = document.getElementById('searcher');
    const finder = document.getElementById('finder');
    const searchMessage = document.getElementById('search-message');
    const closeFinder = document.getElementById('close-finder');
    const finderOutput = document.getElementById('finder-output');
    const curtain = document.getElementById('curtain');
    const message = document.createElement('span');
    searchMessage?.append(message);
    let allLinks = document.querySelectorAll('a');
    const linksData = [];
    const messageType = {
        start: 'start',
        found: 'found',
        noFound: 'noFound',
    };
    for (let a of allLinks) {
        if (a.id === 'hidden')
            continue;
        let tags = a.getAttribute('data-tags');
        linksData.push({
            web: a.href.replace('https://', ''),
            title: a.title,
            tags: tags ? tags : '',
            elem: a,
        });
    }
    const timeOuts = [];
    const setTimeOut = (callback, time) => timeOuts.push(setTimeout(() => callback(), time));
    const escape = (e) => {
        if (e.key == 'Escape') {
            finderHide();
            curtainHide();
            searcher?.blur();
        }
    };
    const finderShow = () => {
        if (finder?.style.display === 'none') {
            timeOuts.forEach((e) => clearTimeout(e));
            finder.style.display = 'block';
            setTimeOut(() => finder.style.opacity = '1', 50);
            document.addEventListener('keydown', escape);
        }
    };
    const finderHide = () => {
        if (finder?.style.display === 'block') {
            timeOuts.forEach((e) => clearTimeout(e));
            finder.style.opacity = '0';
            setTimeOut(() => finder.style.display = 'none', 350);
            document.removeEventListener('keydown', escape);
        }
    };
    const curtainShow = () => {
        if (!!curtain) {
            curtain.style.opacity = '0.7';
            curtain.style.width = '100%';
            curtain.style.height = '100%';
        }
    };
    const curtainHide = () => {
        if (!!curtain) {
            curtain.style.opacity = '0';
            curtain.style.width = '0px';
            curtain.style.height = '0px';
        }
    };
    const setMessage = (type, num = 0) => {
        switch (type) {
            case messageType.start:
                {
                    message.innerHTML = 'enter at least 3 letters';
                    break;
                }
                ;
            case messageType.found:
                {
                    message.innerHTML = 'found ' + num + (num > 1 ? ' sites' : ' site');
                    break;
                }
                ;
            case messageType.noFound:
                {
                    message.innerHTML = 'nothing was found';
                    break;
                }
                ;
        }
    };
    let finderElems = [];
    let finderList = [];
    const onkeypress = (event) => {
        let value = event.target.value.toLowerCase();
        finderElems.forEach(e => e.remove());
        finderElems = [];
        finderList = [];
        if (!!finder) {
            finder.style.width = '';
            finder.style.maxHeight = '400px';
        }
        if (!!finderOutput)
            finderOutput.style.maxHeight = '370px';
        if (value.length < 3) {
            setMessage(messageType.start);
            curtainHide();
            return;
        }
        for (let ld of linksData) {
            if (ld.web.indexOf(value) > -1) {
                finderList.push(ld);
                continue;
            }
            if (ld.title.indexOf(value) > -1) {
                finderList.push(ld);
                continue;
            }
            if (ld.tags.indexOf(value) > -1) {
                finderList.push(ld);
                continue;
            }
        }
        if (finderList.length > 0) {
            setMessage(messageType.found, finderList.length);
        }
        else {
            setMessage(messageType.noFound);
        }
        curtainShow();
        finderList.forEach(e => {
            const elem = e.elem.cloneNode(true);
            finderOutput?.append(elem);
            finderElems.push(elem);
            if (elem.children.length === 0) {
                elem.style.width = 'max-content';
            }
        });
        if (finderElems.length > 0) {
            let first = finderElems[0].getBoundingClientRect();
            const finderWidth = () => {
                let lastWidestRect = { x: 0, width: 0 };
                finderElems.forEach(e => {
                    let rect = e.getBoundingClientRect();
                    if (rect.x >= lastWidestRect.x) {
                        if (rect.x > lastWidestRect.x)
                            lastWidestRect.width = 0;
                        if (rect.width > lastWidestRect.width) {
                            lastWidestRect.x = rect.x;
                            lastWidestRect.width = rect.width;
                        }
                    }
                });
                return lastWidestRect.x + lastWidestRect.width - first.x + 24;
            };
            let width = finderWidth();
            let stretchHeight = 0;
            if (width + 400 > window.innerWidth) {
                do {
                    width = window.innerWidth - 300;
                    if (!!finder)
                        finder.style.maxHeight = `${400 + stretchHeight}px`;
                    if (!!finderOutput)
                        finderOutput.style.maxHeight = `${370 + stretchHeight}px`;
                    stretchHeight += 120;
                    width = finderWidth();
                } while (width + 400 > window.innerWidth);
            }
            if (!!finder)
                finder.style.width = `${width}px`;
        }
    };
    const onfocus = () => {
        setMessage(messageType.start);
        finderShow();
        if (finderList.length > 0)
            curtainShow();
    };
    const onfocusout = () => {
        if (finderList.length == 0) {
            finderHide();
            curtainHide();
        }
    };
    {
        setTimeout(() => { if (!!searcher)
            searcher.value = ''; }, 50);
        if (finder) {
            finder.style.display = 'none';
            finder.style.opacity = '0';
            finder.style.transition = 'all .30s';
        }
        const closeSearcher = () => {
            finderHide();
            curtainHide();
        };
        setTimeOut(() => {
            if (!!curtain) {
                curtain.style.transition = 'opacity .30s';
                curtain.addEventListener('click', closeSearcher);
            }
        }, 350);
        closeFinder?.addEventListener('click', closeSearcher);
    }
    return {
        onkeypress,
        onfocus,
        onfocusout,
    };
}());
