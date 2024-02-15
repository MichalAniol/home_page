const puppeteer = require('puppeteer');

const START_FROM = 534
const now = new Date().getTime()

const getTime = () => {
    const time = new Date().getTime() - now
    const milliseconds = time % 1000
    const sec = Math.floor((time - milliseconds) / 1000) % 60
    const min = Math.floor((time - (sec * 1000)) / (1000 * 60)) % 60

    const getZero = (num: number) => num < 10 ? '0' + num : '' + num

    return `${getZero(min)}:${getZero(sec)}`
}

const exceptions: string[] = [
    'http://192.168.0.21/admin/', // ok, chwilowo odłączony
    'https://www.javatpoint.com/javascript-tutorial', // ok, cookies blokuje zamknięcie
    'https://ninateka.pl/', // ok, cookies blokuje zamknięcie
    'https://xerocho.github.io/svgomg/',
    'https://andreasbm.github.io/web-skills/',

    'https://kpbc.ukw.edu.pl/dlibra/publication/14721/edition/24338?language=pl',
    'https://poradnik.kz1.pl/index.php?page=znakihtml1',
    'http://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx',
    'https://lelinhtinh.github.io/de4js/',
    ' https://formsubmit.co/',
    'https://docs.egret.com/dragonbones/en',
    'https://docs.egret.com/dragonbones/en/docs/dbPro/introduction/introduction',
    'https://docs.egret.com/dragonbones/en/docs/api/dragonBones.Animation',
    'https://zerologin.co/',
];

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--window-size=800,600',
            '--no-sandbox',
        ],
    })
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/');

    const links = await page.$$eval('a', (anchors: any) => anchors.map((anchor: any) => anchor.href));
    const errorLinks: string[] = []
    for (let i = START_FROM; i < links.length; i++) {
        const link = links[i]
        console.log(`${getTime()} --> próba otwarcia (${i}/${links.length}): ${link}`)

        if (exceptions.some((e: string) => e === link)) {
            console.log(`${getTime()} <<< exceptions (${i}/${links.length}): ${link}`)
            continue
        }

        const newPage = await browser.newPage()
        await newPage.goto(link);

        newPage.on('pageerror', (err: any) => {
            console.error(`${getTime()} Błąd otwierania linka (${i}/${links.length}): ${link}`)
            errorLinks.push(link)
        });

        await newPage.close();
    }

    await browser.close()

    for (let i = 0; i < errorLinks.length; ++i) {
        const err = errorLinks[i]
        console.log(`err ${i}:`, err)
    }
})();