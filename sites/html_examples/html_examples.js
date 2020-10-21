window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Tab is hidden')
    } else {
        console.log('Tab is focused')
    }
})

//-------------------------------------------------------------------------------
function networkStatus(e) {
    console.log(e.type)
}
window.addEventListener('offline', networkStatus)
window.addEventListener('online', networkStatus)

//-------------------------------------------------------------------------------
function vibrate() {
    navigator.vibrate([500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500]);
}

//-------------------------------------------------------------------------------
// window.addEventListener('deviceorientation', (e) => {
//     console.log('Alpha: ', e.alpha);
//     console.log('Beta: ', e.beta);
//     console.log('Gamma: ', e.gamma);
//     document.getElementById('a').innerHTML = e.alpha;
//     document.getElementById('b').innerHTML = e.beta;
//     document.getElementById('g').innerHTML = e.gamma;
// })
document.getElementById('a').innerHTML = 'alpha';
document.getElementById('b').innerHTML = 'beta';
document.getElementById('g').innerHTML = 'gamma';

//-------------------------------------------------------------------------------
function copytest() {
    let aaa = document.querySelector('textarea');
    aaa.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error(err)
    }
    console.log('%c aaa:', 'background: #ffcc00; color: #003300', aaa.value)
}

//-------------------------------------------------------------------------------
window.addEventListener('devicelight', (e) => {
    let aaa = e.value;
    console.log('%c aaa:', 'background: #ffcc00; color: #003300', aaa)
    let item = document.getElementById('light')
    item.innerHTML = aaa;
})

