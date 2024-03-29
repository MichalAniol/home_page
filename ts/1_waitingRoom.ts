const waitingRoomFoo = () => {
    const waitingRoom = document.getElementById('waiting-room');

    const newSites = [
        {
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
        }, {
            name: 'kent on hoppas',
            href: 'https://kentonhoppas.com/',
        },{
            name: 'CERT-Polska',
            href: 'https://github.com/CERT-Polska',
        },{
            name: 'rangeengine',
            href: 'https://rangeengine.tech/',
        },{
            name: 'weather icons',
            href: 'https://erikflowers.github.io/weather-icons/',
        },{
            name: 'goal kicker',
            href: 'https://goalkicker.com/',
        },{
            name: 'zaprogramuj zycie',
            href: 'https://zaprogramujzycie.pl/',
        },{
            name: 'anysummary',
            href: 'https://www.anysummary.app/',
            title: 'do streszczania długich tekstów',
        },{
            name: 'alpha womp',
            href: 'https://alpha.womp.com',
            title: 'do robienia grafiki 3d',
        },{
            name: 'plasticity',
            href: 'https://www.plasticity.xyz/#pricing',
            title: 'do robienia grafiki 3d',
        },{
            name: 'qubes-os',
            href: 'https://www.qubes-os.org/intro/',
            title: 'system do bezpiecznego otwierania aplikacji',
        },{
            name: 'PiPot',
            href: 'https://github.com/PiPot/PiPot',
            title: 'PiPot (Micro Honeypot for RPi) - Main repository',
        },
    ]

    let column: HTMLDivElement
    const setNewColumn = () => {
        column = document.createElement('div')
        column.className = 'waiting-room-colum'
        waitingRoom.appendChild(column)
    }
    setNewColumn()

    for (let i = 0; i < newSites.length; ++i) {
        if (i % 10 === 0) setNewColumn()

        const a = document.createElement('a')

        const site = newSites[i]
        a.href = site.href
        a.innerHTML = site.name
        a.title = site.title ? site.title : ''
        a.className = 'smallpseudoicon'

        column.appendChild(a)
    }


}

waitingRoomFoo();