const search = (function() {
    const searcher = document.getElementById('searcher');
    const finder = document.getElementById('finder');
    const searchMessage = document.getElementById('search-message');
    const closeFinder = document.getElementById('close-finder');
    const finderOutput = document.getElementById('finder-output');
    const curtain = document.getElementById('curtain');

    const message = document.createElement('span');
    searchMessage.append(message);

    let allLinks = document.querySelectorAll('a');
    const linksData = [];
    for (let a of allLinks) {
        if (a.id === 'hidden') continue;

        let tags = a.getAttribute('data-tags')
        linksData.push({
            web: a.href.replace('https://', ''),
            title: a.title,
            tags: tags ? tags : '',
            elem: a,
        })
    }

    const timeOuts = [];
    const setTimeOut = (callback, time) => timeOuts.push(setTimeout(() => { callback(); }, time));

    const escape = e => {
        if (e.key == 'Escape') {
            finderHide();
            curtainHide();
            searcher.blur();
        }
    }

    const finderShow = () => {
        if (finder.style.display = 'none') {
            timeOuts.forEach(e => clearTimeout(e));
            finder.style.display = 'block';
            setTimeOut(() => finder.style.opacity = 1, 50);
            document.addEventListener('keydown', escape);
        }
    }

    const finderHide = () => {
        if (finder.style.display = 'block') {
            timeOuts.forEach(e => clearTimeout(e));
            finder.style.opacity = 0;
            setTimeOut(() => finder.style.display = 'none', 350);
            document.removeEventListener('keydown', escape);
        }
    }

    const curtainShow = () => {
        curtain.style.opacity = .7;
        curtain.style.width = '100%';
        curtain.style.height = '100%';
    }

    const curtainHide = () => {
        curtain.style.opacity = 0;
        curtain.style.width = '0px';
        curtain.style.height = '0px';
    }

    const setMessage = (type, num) => {
        switch (type) {
            case 'start':
                {
                    message.innerHTML = 'enter at least 3 letters';
                    break;
                };
            case 'found':
                {
                    message.innerHTML = 'found ' + num + (num > 1 ? ' sites' : ' site');
                    break;
                };
            case 'no found':
                {
                    message.innerHTML = 'nothing was found';
                    break;
                };
        }

        lastMessageType = type;
    }

    let finderElems = [];
    let finderList = [];
    const onkeypress = event => {
        let value = event.target.value.toLowerCase();

        finderElems.forEach(e => e.remove());
        finderElems = [];
        finderList = [];
        finder.style.width = '';
        finder.style.maxHeight = '400px';
        finderOutput.style.maxHeight = '370px';

        if (value.length < 3) {
            setMessage('start');
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
            setMessage('found', finderList.length);
        } else {
            setMessage('no found');
        }

        curtainShow();

        finderList.forEach(e => {
            let elem = e.elem.cloneNode(true);
            finderOutput.append(elem);
            finderElems.push(elem);
            if (elem.children.length === 0) {
                elem.style.width = 'max-content';
            }
        })

        if (finderElems.length > 0) {
            let first = finderElems[0].getBoundingClientRect();
            let lastWidest = null;

            const finderWidth = () => {
                let lastWidestRect = { x: 0, width: 0 };
                finderElems.forEach(e => {
                    let rect = e.getBoundingClientRect();
                    if (rect.x >= lastWidestRect.x) {
                        if (rect.x > lastWidestRect.x) lastWidestRect.width = 0;
                        if (rect.width > lastWidestRect.width) {
                            lastWidestRect.x = rect.x;
                            lastWidestRect.width = rect.width;
                            lastWidest = e;
                        }
                    }
                });

                return lastWidestRect.x + lastWidestRect.width - first.x + 24;
            }

            let width = finderWidth();
            let stretchHeight = 0;
            if (width + 400 > window.innerWidth) {
                do {
                    width = window.innerWidth - 300;
                    finder.style.maxHeight = '' + (400 + stretchHeight) + 'px';
                    finderOutput.style.maxHeight = '' + (370 + stretchHeight) + 'px';
                    stretchHeight += 120;
                    width = finderWidth();
                } while (width + 400 > window.innerWidth)
            }

            finder.style.width = '' + width + 'px';
        }
    }

    const onfocus = () => {
        setMessage('start');
        finderShow();
        if (finderList.length > 0) curtainShow();
    }

    const onfocusout = () => {
        if (finderList.length == 0) {
            finderHide();
            curtainHide();
        }
    }

    { // start html elems settings
        setTimeout(() => { searcher.value = ''; }, 50);
        finder.style.display = 'none';
        finder.style.opacity = 0;
        finder.style.transition = 'all .30s';

        const closeSearcher = () => {
            finderHide();
            curtainHide();
        }

        setTimeOut(() => {
            curtain.style.transition = 'opacity .30s';
            curtain.addEventListener('click', closeSearcher);
        }, 350)

        closeFinder.addEventListener('click', closeSearcher);
    }

    return {
        onkeypress,
        onfocus,
        onfocusout,
    }
}());