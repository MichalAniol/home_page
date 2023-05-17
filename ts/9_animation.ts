/*
SunCalc form:
(c) 2011-2015, Vladimir Agafonkin
SunCalc is a JavaScript library for calculating sun/moon position and light phases.
https://github.com/mourner/suncalc
*/

const SunCalc = (function () {
    'use strict';

    const PI = Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        tan = Math.tan,
        asin = Math.asin,
        atan = Math.atan2,
        acos = Math.acos,
        rad = PI / 180;

    // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


    // date/time constants and conversions

    const dayMs = 1000 * 60 * 60 * 24,
        J1970 = 2440588,
        J2000 = 2451545

    const toJulian = (date: Date) => { return date.valueOf() / dayMs - 0.5 + J1970 }
    const fromJulian = (j: number) => { return new Date((j + 0.5 - J1970) * dayMs); }
    const toDays = (date: Date) => { return toJulian(date) - J2000 }


    // general calculations for position

    const e = rad * 23.4397 // obliquity of the Earth

    const rightAscension = (l: number, b: number) => { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)) }
    const declination = (l: number, b: number) => { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)) }

    const azimuth = (H: number, phi: number, dec: number) => { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)) }
    const altitude = (H: number, phi: number, dec: number) => { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)) }

    const siderealTime = (d: number, lw: number) => { return rad * (280.16 + 360.9856235 * d) - lw }

    const astroRefraction = (h: number) => {
        if (h < 0) // the following formula works for positive altitudes only.
            h = 0; // if h = -0.08901179 a div/0 would occur.

        // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
        return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
    }

    // general sun calculations

    const solarMeanAnomaly = (d: number) => { return rad * (357.5291 + 0.98560028 * d) }

    const eclipticLongitude = (M: number) => {

        const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
            P = rad * 102.9372 // perihelion of the Earth

        return M + C + P + PI
    }

    const sunCoords = (d: number) => {

        const M = solarMeanAnomaly(d),
            L = eclipticLongitude(M)

        return {
            dec: declination(L, 0),
            ra: rightAscension(L, 0)
        };
    }


    // calculates sun position for a given date and latitude/longitude

    const getPosition = (date: Date, lat: number, lng: number) => {

        const lw = rad * -lng,
            phi = rad * lat,
            d = toDays(date),

            c = sunCoords(d),
            H = siderealTime(d, lw) - c.ra

        return altitude(H, phi, c.dec)
        // return {
        //     azimuth: azimuth(H, phi, c.dec),
        //     altitude: altitude(H, phi, c.dec)
        // }
    }



    // sun times configuration (angle, morning name, evening name)

    const times: [number, string, string][] = [
        [-0.833, 'sunrise', 'sunset'],
        [-0.3, 'sunriseEnd', 'sunsetStart'],
        // [-6, 'dawn', 'dusk'],
        // [-12, 'nauticalDawn', 'nauticalDusk'],
        // [-18, 'nightEnd', 'night'],
        // [6, 'goldenHourEnd', 'goldenHour']
    ];

    // adds a custom time to the times config

    // const addTime = function (angle: number, riseName: string, setName: string) {
    //     times.push([angle, riseName, setName]);
    // };


    // calculations for sun times

    const J0 = 0.0009;

    const julianCycle = (d: number, lw: number) => { return Math.round(d - J0 - lw / (2 * PI)); }

    const approxTransit = (Ht: number, lw: number, n: number) => { return J0 + (Ht + lw) / (2 * PI) + n; }
    const solarTransitJ = (ds: number, M: number, L: number) => { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

    const hourAngle = (h: number, phi: number, d: number) => { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }
    const observerAngle = (height: number) => { return -2.076 * Math.sqrt(height) / 60; }

    // returns set time for the given sun altitude
    const getSetJ = (h: number, lw: number, phi: number, dec: number, n: number, M: number, L: number) => {

        const w = hourAngle(h, phi, dec),
            a = approxTransit(w, lw, n);
        return solarTransitJ(a, M, L);
    }


    // calculates sun times for a given date, latitude/longitude, and, optionally,
    // the observer height (in meters) relative to the horizon

    const getTimes = (date: Date, lat: number, lng: number, height: number) => {

        height = height || 0;

        const lw = rad * -lng,
            phi = rad * lat,

            dh = observerAngle(height),

            d = toDays(date),
            n = julianCycle(d, lw),
            ds = approxTransit(0, lw, n),

            M = solarMeanAnomaly(ds),
            L = eclipticLongitude(M),
            dec = declination(L, 0),

            Jnoon = solarTransitJ(ds, M, L)

        let i, len, time, h0, Jset, Jrise;


        const result: { [key: string]: Date } = {
            solarNoon: fromJulian(Jnoon),
            // nadir: fromJulian(Jnoon - 0.5)
        };

        for (i = 0, len = times.length; i < len; i += 1) {
            time = times[i]
            h0 = (time[0] + dh) * rad

            Jset = getSetJ(h0, lw, phi, dec, n, M, L)
            Jrise = Jnoon - (Jset - Jnoon)

            result[time[1]] = fromJulian(Jrise)
            result[time[2]] = fromJulian(Jset)
        }

        return result
    };


    // moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

    const moonCoords = (d: number) => { // geocentric ecliptic coordinates of the moon

        var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
            M = rad * (134.963 + 13.064993 * d), // mean anomaly
            F = rad * (93.272 + 13.229350 * d),  // mean distance

            l = L + rad * 6.289 * sin(M), // longitude
            b = rad * 5.128 * sin(F),     // latitude
            dt = 385001 - 20905 * cos(M)  // distance to the moon in km

        return {
            ra: rightAscension(l, b),
            dec: declination(l, b),
            dist: dt
        };
    }

    const getMoonPosition = (date: Date, lat: number, lng: number) => {

        const lw = rad * -lng,
            phi = rad * lat,
            d = toDays(date),

            c = moonCoords(d),
            H = siderealTime(d, lw) - c.ra,
            // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
            pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H))

        let h = altitude(H, phi, c.dec)

        h = h + astroRefraction(h); // altitude correction for refraction

        return {
            azimuth: azimuth(H, phi, c.dec),
            altitude: h,
            distance: c.dist,
            parallacticAngle: pa
        };
    };


    // calculations for illumination parameters of the moon,
    // based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
    // Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

    const getMoonIllumination = (date: Date) => {

        const d = toDays(date || new Date()),
            s = sunCoords(d),
            m = moonCoords(d),

            sdist = 149598000, // distance from Earth to Sun in km

            phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
            inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
            angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra))

        return {
            fraction: (1 + cos(inc)) / 2,
            phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
            angle: angle
        }
    }


    const hoursLater = (date: Date, h: number) => {
        return new Date(date.valueOf() + h * dayMs / 24)
    }

    // calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

    const getMoonTimes = function (date: Date, lat: number, lng: number, inUTC: boolean) {
        const t = new Date(date)
        if (inUTC) t.setUTCHours(0, 0, 0, 0)
        else t.setHours(0, 0, 0, 0);

        const hc = 0.133 * rad
        let h0 = getMoonPosition(t, lat, lng).altitude - hc

        let h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx

        // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
        for (var i = 1; i <= 24; i += 2) {
            h1 = getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc
            h2 = getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc

            a = (h0 + h2) / 2 - h1
            b = (h2 - h0) / 2
            xe = -b / (2 * a)
            ye = (a * xe + b) * xe + h1
            d = b * b - 4 * a * h1
            roots = 0

            if (d >= 0) {
                dx = Math.sqrt(d) / (Math.abs(a) * 2)
                x1 = xe - dx
                x2 = xe + dx
                if (Math.abs(x1) <= 1) roots++
                if (Math.abs(x2) <= 1) roots++
                if (x1 < -1) x1 = x2
            }

            if (roots === 1) {
                if (h0 < 0) rise = i + x1
                else set = i + x1

            } else if (roots === 2) {
                rise = i + (ye < 0 ? x2 : x1)
                set = i + (ye < 0 ? x1 : x2)
            }

            if (rise && set) break

            h0 = h2
        }

        const result: any = {};

        if (rise) result.rise = hoursLater(t, rise)
        if (set) result.set = hoursLater(t, set)

        if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true

        return result
    };

    return {
        getPosition,
        // addTime,
        getTimes,
        // getMoonPosition,
        getMoonIllumination,
        getMoonTimes
    }
}());

type RgbT = { r: number, g: number, b: number }
type ColorFractionT = 'r' | 'g' | 'b'
type DayNightT = {
    day: RgbT,
    night: RgbT
}
type ColorsT = {
    earth: DayNightT,
    ocean: DayNightT
}

(function () {
    // hard data
    const SECOND = 1000
    const MINUTE = 60 * SECOND
    const HOUR = 60 * MINUTE
    const DAY = 24 * HOUR
    const MOON_PHASES = DAY * 29.5306

    const SPREAD = 40
    const BODY_BORDER_HORIZONTAL = 50
    const BODY_BORDER_VERTICAL = 15
    const TOLERANCE = .4

    const ORIGIN_SCALE = .8
    let scale = ORIGIN_SCALE

    const worldCanvas = <HTMLCanvasElement>document.getElementById("worldCanvas")
    const worldContext: CanvasRenderingContext2D = worldCanvas.getContext("2d")

    const moonCanvas = <HTMLCanvasElement>document.getElementById("moonCanvas")
    const moonContext: CanvasRenderingContext2D = moonCanvas.getContext("2d")

    const worldImageData = new ImageData(world.width, world.height)
    const moonImageData = new ImageData(moon.width, moon.height)

    let now: Date
    let worldRecountTime: number
    let moonRecountTime: number
    let timeToDayEnd: number

    let colors: ColorsT

    const position = {
        latitude: 54.3258694,
        longitude: 18.6075532,
    }

    const celestialAnimationElem = document.getElementById('celestialAnimation')

    const sunriseElem = document.getElementById('sunrise')
    const solarNoonElem = document.getElementById('solarNoon')
    const sunsetElem = document.getElementById('sunset')

    const moonRiseElem = document.getElementById('moonRise')
    const moonSetElem = document.getElementById('moonSet')

    const timerElem = document.getElementById('timer')

    // helpers
    const updateNow = () => now = new Date()
    const getTime = (date: Date) => {
        const getWithZero = (num: number) => num < 10 ? '0' + num : num.toString()

        const h = getWithZero(date.getHours())
        const m = getWithZero(date.getMinutes())
        const s = getWithZero(date.getSeconds())

        return `${h}:${m}:${s}`
    }

    const hexColors = {
        earth: {
            day: '#073a07',
            night: '#062106',
        },
        ocean: {
            day: '#072d07',
            night: '#061b06',
        },
    }
    type AquaTerraT = keyof typeof hexColors

    const countColors = () => {
        const hexToNumber = (hex: string) => {
            const r = parseInt(hex.substring(1, 3), 16)
            const g = parseInt(hex.substring(3, 5), 16)
            const b = parseInt(hex.substring(5, 7), 16)
            return { r, g, b }
        }

        return {
            earth: {
                day: hexToNumber(hexColors.earth.day),
                night: hexToNumber(hexColors.earth.night)
            },
            ocean: {
                day: hexToNumber(hexColors.ocean.day),
                night: hexToNumber(hexColors.ocean.night)
            }
        }
    }

    //
    const init = () => {
        celestialAnimationElem.style.width = ((SPREAD + world.width + SPREAD) * scale) + 'px'
        worldCanvas.width = world.width
        worldCanvas.height = world.height
        worldCanvas.style.width = (world.width * scale) + 'px'
        worldCanvas.style.height = (world.height * scale) + 'px'
        worldCanvas.style.left = (SPREAD * scale) + 'px'

        moonCanvas.width = moon.width
        moonCanvas.height = moon.height
        moonCanvas.style.width = (moon.width * scale) + 'px'
        moonCanvas.style.height = (moon.height * scale) + 'px'
        moonCanvas.style.left = '0px'
        moonCanvas.style.top = ((world.height - moon.height) * scale) + 'px'

        updateNow()
        worldRecountTime = Math.floor(DAY / (world.width * 2))
        moonRecountTime = Math.floor(MOON_PHASES / (moon.width * 2))
        timeToDayEnd = DAY - (now.getHours() * HOUR) - (now.getMinutes() * MINUTE) - (now.getSeconds() * SECOND) - now.getMilliseconds() + 500

        colors = countColors()

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((p) => {
                position.latitude = p.coords.latitude
                position.longitude = p.coords.longitude
            });
        } else {
            console.log("Geolocation is not supported by this browser.")
        }

        timerElem.style.left = (((world.width - 125 + SPREAD) * scale)) + 'px'
        timerElem.style.top = (((world.height - 50) * scale)) + 'px'
        timerElem.style.fontSize = (40 * scale) + 'px'

        const celestialTimesElem = document.querySelectorAll('.celestialTime')
        celestialTimesElem.forEach((e: HTMLElement) => e.style.fontSize = (20 * scale) + 'px')
        const celestialIconsElem = document.querySelectorAll('.celestialIcon')
        celestialIconsElem.forEach((e: HTMLElement) => {
            e.style.width = (40 * scale) + 'px'
            e.style.height = (30 * scale) + 'px'
        })

        const sunTimesElem = document.getElementById('sunTimes')
        sunTimesElem.style.left = ((world.width + SPREAD + SPREAD) * scale) + 'px'

        const moonTimesElem = document.getElementById('moonTimes')
        moonTimesElem.style.left = '0px'
    }

    const worldHeight = world.rowsLength.length
    const worldCenterHeight = worldHeight / 2
    const drawWorld = () => {
        const getColor = (altitude: number, earth: boolean) => {
            const countColor = (aquaTerra: AquaTerraT, altitude: number) => {
                if (altitude > 0) {
                    if (altitude < TOLERANCE) {
                        const day = colors[aquaTerra].day
                        const night = colors[aquaTerra].night
                        const ratio = altitude / TOLERANCE

                        const getGradient = (day: number, night: number) => Math.round(((day - night) * ratio) + night)
                        const r = getGradient(day.r, night.r)
                        const g = getGradient(day.g, night.g)
                        const b = getGradient(day.b, night.b)

                        return { r, g, b }
                    }
                    return colors[aquaTerra].day
                }
                else return colors[aquaTerra].night
            }

            if (earth) {
                return countColor('earth', altitude)
            }
            return countColor('ocean', altitude)
        }

        for (let y = 0; y < worldHeight; ++y) {
            const rowStart = world.rowsStart[y]
            const latitude = ((y - worldCenterHeight) / worldHeight) * -180

            const worldWidth = world.rowsLength[y]
            const worldCenterWidth = worldWidth / 2
            for (let x = 0; x < worldWidth; ++x) {
                const longitude = ((x - worldCenterWidth) / worldWidth) * 360
                const altitude = SunCalc.getPosition(now, latitude, longitude)
                let data = world.data[y][x]

                const { r, g, b } = getColor(altitude, data === 1)

                const pos = ((y * world.width) + x + rowStart) * 4
                worldImageData.data[pos] = r
                worldImageData.data[pos + 1] = g
                worldImageData.data[pos + 2] = b
                worldImageData.data[pos + 3] = 255
            }
        }

        worldContext.putImageData(worldImageData, 0, 0)
    }

    const moonHeight = moon.rowsLength.length
    const drawMoon = (now: Date) => {
        moonContext.fillStyle = hexColors.earth.day
        const radius = 56
        moonContext.arc(radius, radius, radius, 0, 2 * Math.PI)
        moonContext.fill()

        const { phase } = SunCalc.getMoonIllumination(now)
        const shadowLeftSide = phase < .5
        const shadow = shadowLeftSide ? phase * 2 : ((phase - .5) * 2)

        const getColor = (value: number, light: boolean) => {
            const getColor = (lowColor: RgbT, heightColor: RgbT) => {
                const countColor = (colorFraction: ColorFractionT) => ((heightColor[colorFraction] - lowColor[colorFraction]) * (value / 255)) + lowColor[colorFraction]
                const r = countColor('r')
                const g = countColor('g')
                const b = countColor('b')

                return { r, g, b }
            }

            if (light) {
                return getColor(colors.earth.night, colors.earth.day)
            } else {
                return getColor(colors.ocean.night, colors.ocean.day)
            }
        }

        for (let y = 0; y < moonHeight; ++y) {
            const rowStart = moon.rowsStart[y]

            const moonWidth = moon.rowsLength[y]
            const shadowLength = moonWidth * shadow
            for (let x = 0; x < moonWidth; ++x) {
                let value = moon.data[y][x]

                let light: boolean
                if (shadowLeftSide) {
                    light = x < shadowLength
                } else {
                    light = x > shadowLength
                }
                const color = getColor(value, light)

                const pos = ((y * moon.width) + x + rowStart) * 4
                moonImageData.data[pos] = color.r
                moonImageData.data[pos + 1] = color.g
                moonImageData.data[pos + 2] = color.b
                moonImageData.data[pos + 3] = 255
            }
        }

        moonContext.putImageData(moonImageData, 0, 0)
    }

    const setCelestialTimes = () => {
        const { solarNoon, sunrise, sunset } = SunCalc.getTimes(now, position.latitude, position.longitude, 17)
        sunriseElem.innerHTML = getTime(sunrise)
        solarNoonElem.innerHTML = getTime(solarNoon)
        sunsetElem.innerHTML = getTime(sunset)

        const { rise: moonRise, set: moonSet } = SunCalc.getMoonTimes(now, position.latitude, position.longitude, false)
        moonRiseElem.innerHTML = getTime(moonRise)
        moonSetElem.innerHTML = getTime(moonSet)
    }


    init()

    celestialAnimationElem.addEventListener('click', () => {
        console.log('%c scale:', 'background: #ffcc00; color: #003300', scale)
        const redraw = () => {
            init()
            drawWorld()
            drawMoon(now)
        }
        if (scale === ORIGIN_SCALE) {
            scale = window.innerWidth / (SPREAD + world.width + SPREAD + BODY_BORDER_HORIZONTAL)
            celestialAnimationElem.style.height = (world.height * scale) + 20 + 'px'
            redraw()
        } else {
            scale = ORIGIN_SCALE
            celestialAnimationElem.style.height = (world.height * scale) + 'px'
            redraw()
        }
    })

    drawWorld()
    setInterval(() => { updateNow(); drawWorld() }, worldRecountTime)

    drawMoon(now)
    setInterval(() => { updateNow(); drawMoon(now) }, moonRecountTime)

    setCelestialTimes()
    setTimeout(() => {
        updateNow()
        setCelestialTimes()
        setInterval(() => { updateNow(); setCelestialTimes() }, DAY)
    }, timeToDayEnd)

    const setTimerTime = () => timerElem.innerHTML = getTime(new Date())
    setTimerTime()

    let timerInterval: any
    const setTimerTicking = () => setTimeout(() => {
        setTimerTime()
        timerInterval = setInterval(() => setTimerTime(), SECOND)

        setTimeout(() => { // reset ticking, coz sometimes intervals doesn't run perfect
            clearInterval(timerInterval)
            setTimerTicking()
        }, (10 * MINUTE) + (SECOND * .5))
    }, (SECOND * 1.005) - (new Date().getMilliseconds()));
    setTimerTicking()

    // let moonIndex = 0
    // setInterval(() => {
    //     const date = now.getTime()
    //     const newDate = new Date(date + (moonRecountTime * moonIndex))
    //     drawMoon(newDate)
    //     ++moonIndex
    // }, 100)
}())