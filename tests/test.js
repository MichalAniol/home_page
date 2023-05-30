const puppeteer = require('puppeteer');
const START_FROM = 40;
const now = new Date().getTime();
const getTime = () => {
    const time = new Date().getTime() - now;
    const milliseconds = time % 1000;
    const sec = Math.floor((time - milliseconds) / 1000) % 60;
    const min = Math.floor((time - (sec * 1000)) / (1000 * 60)) % 60;
    const getZero = (num) => num < 10 ? '0' + num : '' + num;
    return `${getZero(min)}:${getZero(sec)}`;
};
const exceptions = [
    'http://192.168.0.21/admin/',
    'https://www.javatpoint.com/javascript-tutorial',
    'https://ninateka.pl/',
];
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
        ],
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    const links = await page.$$eval('a', (anchors) => anchors.map((anchor) => anchor.href));
    const errorLinks = [];
    for (let i = START_FROM; i < links.length; i++) {
        const link = links[i];
        console.log(`${getTime()} --> próba otwarcia (${i}/${links.length}): ${link}`);
        if (exceptions.some((e) => e === link)) {
            console.log(`${getTime()} <<< exceptions (${i}/${links.length}): ${link}`);
            continue;
        }
        const newPage = await browser.newPage();
        await newPage.goto(link);
        newPage.on('pageerror', (err) => {
            console.error(`${getTime()} Błąd otwierania linka (${i}/${links.length}): ${link}`);
            errorLinks.push(link);
        });
        await newPage.close();
    }
    await browser.close();
    for (let i = 0; i < errorLinks.length; ++i) {
        const err = errorLinks[i];
        console.log(`err ${i}:`, err);
    }
})();
