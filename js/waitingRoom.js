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
    }, ]

    for (const site of newSites) {
        const a = document.createElement('a');
        a.href = site.href;
        a.innerHTML = site.name;
        a.className = 'smallpseudoicon';

        waitingRoom.appendChild(a);
    }
}

waitingRoomFoo();