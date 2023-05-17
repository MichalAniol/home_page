const search = (function () {
    const searcher = document.getElementById('searcher') as HTMLInputElement
    const finder = document.getElementById('finder')
    const searchMessage = document.getElementById('search-message')
    const closeFinder = document.getElementById('close-finder')
    const finderOutput = document.getElementById('finder-output')
    const curtain = document.getElementById('curtain')

    const message = document.createElement('span')
    searchMessage?.append(message);

    let allLinks = document.querySelectorAll('a')
    type LinksDataT = {
        web: string,
        title: string,
        tags: string,
        elem: HTMLAnchorElement,
    }
    const linksData: LinksDataT[] = []

    const messageType = {
        start: 'start',
        found: 'found',
        noFound: 'noFound',
    } as const
    type MessageTypeT = keyof typeof messageType


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

    const timeOuts: ReturnType<typeof setTimeout>[] = [];
    const setTimeOut = (callback: () => void, time: number) => timeOuts.push(setTimeout(() => callback(), time))

    const escape = (e: any) => {
        if (e.key == 'Escape') {
            finderHide()
            curtainHide()
            searcher?.blur()
        }
    }

    const finderShow = () => {
        if (finder?.style.display === 'none') {
            timeOuts.forEach((e: ReturnType<typeof setTimeout>) => clearTimeout(e))
            finder.style.display = 'block'
            setTimeOut(() => finder.style.opacity = '1', 50)
            document.addEventListener('keydown', escape)
        }
    }

    const finderHide = () => {
        if (finder?.style.display === 'block') {
            timeOuts.forEach((e: ReturnType<typeof setTimeout>) => clearTimeout(e))
            finder.style.opacity = '0'
            setTimeOut(() => finder.style.display = 'none', 350)
            document.removeEventListener('keydown', escape)
        }
    }

    const curtainShow = () => {
        if (!!curtain) {
            curtain.style.opacity = '0.7'
            curtain.style.width = '100%'
            curtain.style.height = '100%'
        }
    }

    const curtainHide = () => {
        if (!!curtain) {
            curtain.style.opacity = '0'
            curtain.style.width = '0px'
            curtain.style.height = '0px'
        }
    }

    const setMessage = (type: MessageTypeT, num: number = 0) => {
        switch (type) {
            case messageType.start:
                {
                    message.innerHTML = 'enter at least 3 letters'
                    break
                };
            case messageType.found:
                {
                    message.innerHTML = 'found ' + num + (num > 1 ? ' sites' : ' site')
                    break
                };
            case messageType.noFound:
                {
                    message.innerHTML = 'nothing was found'
                    break
                };
        }

        // lastMessageType = type;
    }

    let finderElems: HTMLElement[] = [];
    let finderList: LinksDataT[] = [];

    const onkeypress = (event: any) => {
        let value = event.target.value.toLowerCase();

        finderElems.forEach(e => e.remove());
        finderElems = [];
        finderList = [];
        if (!!finder) {
            finder.style.width = ''
            finder.style.maxHeight = '400px'
        }
        if (!!finderOutput) finderOutput.style.maxHeight = '370px'

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
        } else {
            setMessage(messageType.noFound);
        }

        curtainShow();

        finderList.forEach(e => {
            const elem = e.elem.cloneNode(true) as HTMLElement
            finderOutput?.append(elem)
            finderElems.push(elem as HTMLElement)
            if (elem.children.length === 0) {
                elem.style.width = 'max-content'
            }
        })

        if (finderElems.length > 0) {
            let first = finderElems[0].getBoundingClientRect()
            // let lastWidest: HTMLElement | null = null;

            const finderWidth = () => {
                let lastWidestRect = { x: 0, width: 0 };
                finderElems.forEach(e => {
                    let rect = e.getBoundingClientRect();
                    if (rect.x >= lastWidestRect.x) {
                        if (rect.x > lastWidestRect.x) lastWidestRect.width = 0;
                        if (rect.width > lastWidestRect.width) {
                            lastWidestRect.x = rect.x;
                            lastWidestRect.width = rect.width;
                            // lastWidest = e;
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
                    if (!!finder) finder.style.maxHeight = `${400 + stretchHeight}px`
                    if (!!finderOutput) finderOutput.style.maxHeight = `${370 + stretchHeight}px`
                    stretchHeight += 120
                    width = finderWidth();
                } while (width + 400 > window.innerWidth)
            }

            if (!!finder) finder.style.width = `${width}px`
        }
    }

    const onfocus = () => {
        setMessage(messageType.start);
        finderShow()
        if (finderList.length > 0) curtainShow()
    }

    const onfocusout = () => {
        if (finderList.length == 0) {
            finderHide()
            curtainHide()
        }
    }

    { // start html elems settings
        setTimeout(() => { if (!!searcher) searcher.value = '' }, 50)
        if (finder) {
            finder.style.display = 'none'
            finder.style.opacity = '0'
            finder.style.transition = 'all .30s'
        }

        const closeSearcher = () => {
            finderHide();
            curtainHide();
        }

        setTimeOut(() => {
            if (!!curtain) {
                curtain.style.transition = 'opacity .30s'
                curtain.addEventListener('click', closeSearcher)
            }
        }, 350)

        closeFinder?.addEventListener('click', closeSearcher);
    }

    return {
        onkeypress,
        onfocus,
        onfocusout,
    }
}());