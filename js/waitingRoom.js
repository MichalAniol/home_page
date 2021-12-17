const waitingRoomFoo = () => {
    const waitingRoom = document.getElementById('waiting-room');

    const newSites = [{
            name: 'kroniki myrtany',
            href: 'https://kronikimyrtany.pl/pl/',
        },
        {
            name: 'ASP.NET authorization',
            href: 'https://www.c-sharpcorner.com/article/authentication-and-authorization-in-asp-net-core-web-api-with-json-web-tokens/',
        },
        {
            name: 'ASP.NET authorization',
            href: 'https://jasonwatmore.com/post/2019/10/14/aspnet-core-3-simple-api-for-authentication-registration-and-user-management',
        },
    ]

    for (const site of newSites) {
        const a = document.createElement('a');
        a.href = site.href;
        a.innerHTML = site.name;
        a.className = 'smallpseudoicon';

        waitingRoom.appendChild(a);
    }
}

waitingRoomFoo();