const dom = (function () {
    const byId = (id) => {
        return document.getElementById(id);
    };
    const byQuery = (query) => document.querySelector(query);
    const byQueryAll = (query) => document.querySelectorAll(query);
    const byQ = (elem, query) => elem.querySelector(query);
    const byQAll = (elem, query) => elem.querySelectorAll(query);
    const getAllById = (obj) => {
        const results = {};
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (typeof value === "string") {
                results[key] = byId(value);
            }
            else if (Array.isArray(value)) {
                results[key] = value.map(id => byId(id));
            }
            else if (typeof value === "object" && value !== null) {
                results[key] = getAllById(value);
            }
        });
        return results;
    };
    const prepare = (node, options) => {
        const elem = typeof node === "string" ? document.createElement(node) : node;
        if (elem && elem instanceof HTMLElement) {
            if (options.delete) {
                elem.remove();
                return;
            }
            if (options?.id)
                elem.id = options.id;
            options?.classes?.forEach((c) => elem.classList.add(c));
            options?.children?.forEach((c) => elem.appendChild(c));
            if (options?.src && elem instanceof HTMLImageElement) {
                elem.src = options.src;
            }
            if (options?.inner) {
                elem.textContent = options.inner;
            }
            if (options?.position) {
                elem.style.left = `${options.position.x}px`;
                elem.style.top = `${options.position.y}px`;
            }
            return elem;
        }
    };
    const setStyle = (element, style, value) => element.style[style] = value;
    const setAllStyles = (styles) => styles.forEach((s) => setStyle(s[0], s[1], s[2]));
    const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);
    const setAllAttributes = (attributes) => attributes.forEach((a) => a[0].setAttribute(a[1], a[2]));
    const disable = (elem) => elem.setAttribute('disabled', '');
    const enable = (elem) => elem.removeAttribute('disabled');
    const check = (elem) => elem.checked = true;
    const uncheck = (elem) => elem.checked = false;
    const display = (elem, attribute) => elem.style.display = attribute;
    const setColor = (elem, color) => elem.style.color = color;
    const removeClass = (elem, attribute) => elem.classList.remove(attribute);
    const addClass = (elem, attribute) => elem.classList.add(attribute);
    const colors = {
        line: 'var(--line_color)',
        prime: 'var(--prime_color)',
        off1: 'var(--off_prime_color)',
        off2: 'var(--off_second_color)',
    };
    const add = (elem, name, fn) => elem.addEventListener(name, fn);
    const xmlns = 'http://www.w3.org/2000/svg';
    const newNS = (name) => document.createElementNS(xmlns, 'rect');
    return {
        byId,
        byQuery,
        byQueryAll,
        byQ,
        byQAll,
        getAllById,
        prepare,
        setStyle,
        setAllStyles,
        setAttribute,
        setAllAttributes,
        disable,
        enable,
        check,
        uncheck,
        display,
        setColor,
        removeClass,
        addClass,
        colors,
        add,
        newNS,
    };
}());
(function () {
    let styles = [
        'background: linear-gradient(169deg, #f60707 0%, #ffd600 38%, #edff00 51%, #c4ed18 62%, #00ff19 100%)',
        'border: 1px solid #3E0E02',
        'width: 220px',
        'color: black',
        'display: block',
        'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
        'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
        'line-height: 18px',
        'text-align: center',
        'font-weight: bold',
        'font-size: 14px',
        'margin: 10px 0',
        'padding: 10px 0 15px 0'
    ].join(';');
    console.log('%c👉 𝐇𝐎𝐌𝐄 𝐏𝐀𝐆𝐄 👈\nautor: Michal Aniol 😎', styles);
}());
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
        }, {
            name: 'CERT-Polska',
            href: 'https://github.com/CERT-Polska',
        }, {
            name: 'rangeengine',
            href: 'https://rangeengine.tech/',
        }, {
            name: 'weather icons',
            href: 'https://erikflowers.github.io/weather-icons/',
        }, {
            name: 'goal kicker',
            href: 'https://goalkicker.com/',
        }, {
            name: 'zaprogramuj zycie',
            href: 'https://zaprogramujzycie.pl/',
        }, {
            name: 'anysummary',
            href: 'https://www.anysummary.app/',
            title: 'do streszczania długich tekstów',
        }, {
            name: 'alpha womp',
            href: 'https://alpha.womp.com',
            title: 'do robienia grafiki 3d',
        }, {
            name: 'plasticity',
            href: 'https://www.plasticity.xyz/#pricing',
            title: 'do robienia grafiki 3d',
        }, {
            name: 'qubes-os',
            href: 'https://www.qubes-os.org/intro/',
            title: 'system do bezpiecznego otwierania aplikacji',
        }, {
            name: 'PiPot',
            href: 'https://github.com/PiPot/PiPot',
            title: 'PiPot (Micro Honeypot for RPi) - Main repository',
        },
    ];
    let column;
    const setNewColumn = () => {
        column = document.createElement('div');
        column.className = 'waiting-room-colum';
        waitingRoom.appendChild(column);
    };
    setNewColumn();
    for (let i = 0; i < newSites.length; ++i) {
        if (i % 10 === 0)
            setNewColumn();
        const a = document.createElement('a');
        const site = newSites[i];
        a.href = site.href;
        a.innerHTML = site.name;
        a.title = site.title ? site.title : '';
        a.className = 'smallpseudoicon';
        column.appendChild(a);
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
!function (e, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.axios = t() : e.axios = t(); }(window, (function () { return function (e) { var t = {}; function r(n) { if (t[n])
    return t[n].exports; var o = t[n] = { i: n, l: !1, exports: {} }; return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports; } return r.m = e, r.c = t, r.d = function (e, t, n) { r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n }); }, r.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, r.t = function (e, t) { if (1 & t && (e = r(e)), 8 & t)
    return e; if (4 & t && "object" == typeof e && e && e.__esModule)
    return e; var n = Object.create(null); if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
    for (var o in e)
        r.d(n, o, function (t) { return e[t]; }.bind(null, o)); return n; }, r.n = function (e) { var t = e && e.__esModule ? function () { return e.default; } : function () { return e; }; return r.d(t, "a", t), t; }, r.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); }, r.p = "", r(r.s = 10); }([function (e, t, r) {
        "use strict";
        var n = r(2), o = Object.prototype.toString;
        function i(e) { return "[object Array]" === o.call(e); }
        function s(e) { return void 0 === e; }
        function a(e) { return null !== e && "object" == typeof e; }
        function u(e) { if ("[object Object]" !== o.call(e))
            return !1; var t = Object.getPrototypeOf(e); return null === t || t === Object.prototype; }
        function c(e) { return "[object Function]" === o.call(e); }
        function f(e, t) { if (null != e)
            if ("object" != typeof e && (e = [e]), i(e))
                for (var r = 0, n = e.length; r < n; r++)
                    t.call(null, e[r], r, e);
            else
                for (var o in e)
                    Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e); }
        e.exports = { isArray: i, isArrayBuffer: function (e) { return "[object ArrayBuffer]" === o.call(e); }, isBuffer: function (e) { return null !== e && !s(e) && null !== e.constructor && !s(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e); }, isFormData: function (e) { return "undefined" != typeof FormData && e instanceof FormData; }, isArrayBufferView: function (e) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer; }, isString: function (e) { return "string" == typeof e; }, isNumber: function (e) { return "number" == typeof e; }, isObject: a, isPlainObject: u, isUndefined: s, isDate: function (e) { return "[object Date]" === o.call(e); }, isFile: function (e) { return "[object File]" === o.call(e); }, isBlob: function (e) { return "[object Blob]" === o.call(e); }, isFunction: c, isStream: function (e) { return a(e) && c(e.pipe); }, isURLSearchParams: function (e) { return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams; }, isStandardBrowserEnv: function () { return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document); }, forEach: f, merge: function e() { var t = {}; function r(r, n) { u(t[n]) && u(r) ? t[n] = e(t[n], r) : u(r) ? t[n] = e({}, r) : i(r) ? t[n] = r.slice() : t[n] = r; } for (var n = 0, o = arguments.length; n < o; n++)
                f(arguments[n], r); return t; }, extend: function (e, t, r) { return f(t, (function (t, o) { e[o] = r && "function" == typeof t ? n(t, r) : t; })), e; }, trim: function (e) { return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, ""); }, stripBOM: function (e) { return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e; } };
    }, function (e, t, r) {
        "use strict";
        var n = r(0), o = r(16), i = r(4), s = { "Content-Type": "application/x-www-form-urlencoded" };
        function a(e, t) { !n.isUndefined(e) && n.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t); }
        var u, c = { transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 }, adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (u = r(5)), u), transformRequest: [function (e, t) { return o(t, "Accept"), o(t, "Content-Type"), n.isFormData(e) || n.isArrayBuffer(e) || n.isBuffer(e) || n.isStream(e) || n.isFile(e) || n.isBlob(e) ? e : n.isArrayBufferView(e) ? e.buffer : n.isURLSearchParams(e) ? (a(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : n.isObject(e) || t && "application/json" === t["Content-Type"] ? (a(t, "application/json"), function (e, t, r) { if (n.isString(e))
                    try {
                        return (t || JSON.parse)(e), n.trim(e);
                    }
                    catch (e) {
                        if ("SyntaxError" !== e.name)
                            throw e;
                    } return (r || JSON.stringify)(e); }(e)) : e; }], transformResponse: [function (e) { var t = this.transitional, r = t && t.silentJSONParsing, o = t && t.forcedJSONParsing, s = !r && "json" === this.responseType; if (s || o && n.isString(e) && e.length)
                    try {
                        return JSON.parse(e);
                    }
                    catch (e) {
                        if (s) {
                            if ("SyntaxError" === e.name)
                                throw i(e, this, "E_JSON_PARSE");
                            throw e;
                        }
                    } return e; }], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, validateStatus: function (e) { return e >= 200 && e < 300; } };
        c.headers = { common: { Accept: "application/json, text/plain, */*" } }, n.forEach(["delete", "get", "head"], (function (e) { c.headers[e] = {}; })), n.forEach(["post", "put", "patch"], (function (e) { c.headers[e] = n.merge(s); })), e.exports = c;
    }, function (e, t, r) {
        "use strict";
        e.exports = function (e, t) { return function () { for (var r = new Array(arguments.length), n = 0; n < r.length; n++)
            r[n] = arguments[n]; return e.apply(t, r); }; };
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        function o(e) { return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]"); }
        e.exports = function (e, t, r) { if (!t)
            return e; var i; if (r)
            i = r(t);
        else if (n.isURLSearchParams(t))
            i = t.toString();
        else {
            var s = [];
            n.forEach(t, (function (e, t) { null != e && (n.isArray(e) ? t += "[]" : e = [e], n.forEach(e, (function (e) { n.isDate(e) ? e = e.toISOString() : n.isObject(e) && (e = JSON.stringify(e)), s.push(o(t) + "=" + o(e)); }))); })), i = s.join("&");
        } if (i) {
            var a = e.indexOf("#");
            -1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + i;
        } return e; };
    }, function (e, t, r) {
        "use strict";
        e.exports = function (e, t, r, n, o) { return e.config = t, r && (e.code = r), e.request = n, e.response = o, e.isAxiosError = !0, e.toJSON = function () { return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code }; }, e; };
    }, function (e, t, r) {
        "use strict";
        var n = r(0), o = r(17), i = r(18), s = r(3), a = r(19), u = r(22), c = r(23), f = r(6);
        e.exports = function (e) { return new Promise((function (t, r) { var p = e.data, l = e.headers, d = e.responseType; n.isFormData(p) && delete l["Content-Type"]; var h = new XMLHttpRequest; if (e.auth) {
            var m = e.auth.username || "", g = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
            l.Authorization = "Basic " + btoa(m + ":" + g);
        } var v = a(e.baseURL, e.url); function y() { if (h) {
            var n = "getAllResponseHeaders" in h ? u(h.getAllResponseHeaders()) : null, i = { data: d && "text" !== d && "json" !== d ? h.response : h.responseText, status: h.status, statusText: h.statusText, headers: n, config: e, request: h };
            o(t, r, i), h = null;
        } } if (h.open(e.method.toUpperCase(), s(v, e.params, e.paramsSerializer), !0), h.timeout = e.timeout, "onloadend" in h ? h.onloadend = y : h.onreadystatechange = function () { h && 4 === h.readyState && (0 !== h.status || h.responseURL && 0 === h.responseURL.indexOf("file:")) && setTimeout(y); }, h.onabort = function () { h && (r(f("Request aborted", e, "ECONNABORTED", h)), h = null); }, h.onerror = function () { r(f("Network Error", e, null, h)), h = null; }, h.ontimeout = function () { var t = "timeout of " + e.timeout + "ms exceeded"; e.timeoutErrorMessage && (t = e.timeoutErrorMessage), r(f(t, e, e.transitional && e.transitional.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", h)), h = null; }, n.isStandardBrowserEnv()) {
            var b = (e.withCredentials || c(v)) && e.xsrfCookieName ? i.read(e.xsrfCookieName) : void 0;
            b && (l[e.xsrfHeaderName] = b);
        } "setRequestHeader" in h && n.forEach(l, (function (e, t) { void 0 === p && "content-type" === t.toLowerCase() ? delete l[t] : h.setRequestHeader(t, e); })), n.isUndefined(e.withCredentials) || (h.withCredentials = !!e.withCredentials), d && "json" !== d && (h.responseType = e.responseType), "function" == typeof e.onDownloadProgress && h.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && h.upload && h.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then((function (e) { h && (h.abort(), r(e), h = null); })), p || (p = null), h.send(p); })); };
    }, function (e, t, r) {
        "use strict";
        var n = r(4);
        e.exports = function (e, t, r, o, i) { var s = new Error(e); return n(s, t, r, o, i); };
    }, function (e, t, r) {
        "use strict";
        e.exports = function (e) { return !(!e || !e.__CANCEL__); };
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        e.exports = function (e, t) { t = t || {}; var r = {}, o = ["url", "method", "data"], i = ["headers", "auth", "proxy", "params"], s = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"], a = ["validateStatus"]; function u(e, t) { return n.isPlainObject(e) && n.isPlainObject(t) ? n.merge(e, t) : n.isPlainObject(t) ? n.merge({}, t) : n.isArray(t) ? t.slice() : t; } function c(o) { n.isUndefined(t[o]) ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o])) : r[o] = u(e[o], t[o]); } n.forEach(o, (function (e) { n.isUndefined(t[e]) || (r[e] = u(void 0, t[e])); })), n.forEach(i, c), n.forEach(s, (function (o) { n.isUndefined(t[o]) ? n.isUndefined(e[o]) || (r[o] = u(void 0, e[o])) : r[o] = u(void 0, t[o]); })), n.forEach(a, (function (n) { n in t ? r[n] = u(e[n], t[n]) : n in e && (r[n] = u(void 0, e[n])); })); var f = o.concat(i).concat(s).concat(a), p = Object.keys(e).concat(Object.keys(t)).filter((function (e) { return -1 === f.indexOf(e); })); return n.forEach(p, c), r; };
    }, function (e, t, r) {
        "use strict";
        function n(e) { this.message = e; }
        n.prototype.toString = function () { return "Cancel" + (this.message ? ": " + this.message : ""); }, n.prototype.__CANCEL__ = !0, e.exports = n;
    }, function (e, t, r) { e.exports = r(11); }, function (e, t, r) {
        "use strict";
        var n = r(0), o = r(2), i = r(12), s = r(8);
        function a(e) { var t = new i(e), r = o(i.prototype.request, t); return n.extend(r, i.prototype, t), n.extend(r, t), r; }
        var u = a(r(1));
        u.Axios = i, u.create = function (e) { return a(s(u.defaults, e)); }, u.Cancel = r(9), u.CancelToken = r(26), u.isCancel = r(7), u.all = function (e) { return Promise.all(e); }, u.spread = r(27), u.isAxiosError = r(28), e.exports = u, e.exports.default = u;
    }, function (e, t, r) {
        "use strict";
        var n = r(0), o = r(3), i = r(13), s = r(14), a = r(8), u = r(24), c = u.validators;
        function f(e) { this.defaults = e, this.interceptors = { request: new i, response: new i }; }
        f.prototype.request = function (e) { "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = a(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get"; var t = e.transitional; void 0 !== t && u.assertOptions(t, { silentJSONParsing: c.transitional(c.boolean, "1.0.0"), forcedJSONParsing: c.transitional(c.boolean, "1.0.0"), clarifyTimeoutError: c.transitional(c.boolean, "1.0.0") }, !1); var r = [], n = !0; this.interceptors.request.forEach((function (t) { "function" == typeof t.runWhen && !1 === t.runWhen(e) || (n = n && t.synchronous, r.unshift(t.fulfilled, t.rejected)); })); var o, i = []; if (this.interceptors.response.forEach((function (e) { i.push(e.fulfilled, e.rejected); })), !n) {
            var f = [s, void 0];
            for (Array.prototype.unshift.apply(f, r), f = f.concat(i), o = Promise.resolve(e); f.length;)
                o = o.then(f.shift(), f.shift());
            return o;
        } for (var p = e; r.length;) {
            var l = r.shift(), d = r.shift();
            try {
                p = l(p);
            }
            catch (e) {
                d(e);
                break;
            }
        } try {
            o = s(p);
        }
        catch (e) {
            return Promise.reject(e);
        } for (; i.length;)
            o = o.then(i.shift(), i.shift()); return o; }, f.prototype.getUri = function (e) { return e = a(this.defaults, e), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, ""); }, n.forEach(["delete", "get", "head", "options"], (function (e) { f.prototype[e] = function (t, r) { return this.request(a(r || {}, { method: e, url: t, data: (r || {}).data })); }; })), n.forEach(["post", "put", "patch"], (function (e) { f.prototype[e] = function (t, r, n) { return this.request(a(n || {}, { method: e, url: t, data: r })); }; })), e.exports = f;
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        function o() { this.handlers = []; }
        o.prototype.use = function (e, t, r) { return this.handlers.push({ fulfilled: e, rejected: t, synchronous: !!r && r.synchronous, runWhen: r ? r.runWhen : null }), this.handlers.length - 1; }, o.prototype.eject = function (e) { this.handlers[e] && (this.handlers[e] = null); }, o.prototype.forEach = function (e) { n.forEach(this.handlers, (function (t) { null !== t && e(t); })); }, e.exports = o;
    }, function (e, t, r) {
        "use strict";
        var n = r(0), o = r(15), i = r(7), s = r(1);
        function a(e) { e.cancelToken && e.cancelToken.throwIfRequested(); }
        e.exports = function (e) { return a(e), e.headers = e.headers || {}, e.data = o.call(e, e.data, e.headers, e.transformRequest), e.headers = n.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), n.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (t) { delete e.headers[t]; })), (e.adapter || s.adapter)(e).then((function (t) { return a(e), t.data = o.call(e, t.data, t.headers, e.transformResponse), t; }), (function (t) { return i(t) || (a(e), t && t.response && (t.response.data = o.call(e, t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t); })); };
    }, function (e, t, r) {
        "use strict";
        var n = r(0), o = r(1);
        e.exports = function (e, t, r) { var i = this || o; return n.forEach(r, (function (r) { e = r.call(i, e, t); })), e; };
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        e.exports = function (e, t) { n.forEach(e, (function (r, n) { n !== t && n.toUpperCase() === t.toUpperCase() && (e[t] = r, delete e[n]); })); };
    }, function (e, t, r) {
        "use strict";
        var n = r(6);
        e.exports = function (e, t, r) { var o = r.config.validateStatus; r.status && o && !o(r.status) ? t(n("Request failed with status code " + r.status, r.config, null, r.request, r)) : e(r); };
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        e.exports = n.isStandardBrowserEnv() ? { write: function (e, t, r, o, i, s) { var a = []; a.push(e + "=" + encodeURIComponent(t)), n.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), n.isString(o) && a.push("path=" + o), n.isString(i) && a.push("domain=" + i), !0 === s && a.push("secure"), document.cookie = a.join("; "); }, read: function (e) { var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")); return t ? decodeURIComponent(t[3]) : null; }, remove: function (e) { this.write(e, "", Date.now() - 864e5); } } : { write: function () { }, read: function () { return null; }, remove: function () { } };
    }, function (e, t, r) {
        "use strict";
        var n = r(20), o = r(21);
        e.exports = function (e, t) { return e && !n(t) ? o(e, t) : t; };
    }, function (e, t, r) {
        "use strict";
        e.exports = function (e) { return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e); };
    }, function (e, t, r) {
        "use strict";
        e.exports = function (e, t) { return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e; };
    }, function (e, t, r) {
        "use strict";
        var n = r(0), o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
        e.exports = function (e) { var t, r, i, s = {}; return e ? (n.forEach(e.split("\n"), (function (e) { if (i = e.indexOf(":"), t = n.trim(e.substr(0, i)).toLowerCase(), r = n.trim(e.substr(i + 1)), t) {
            if (s[t] && o.indexOf(t) >= 0)
                return;
            s[t] = "set-cookie" === t ? (s[t] ? s[t] : []).concat([r]) : s[t] ? s[t] + ", " + r : r;
        } })), s) : s; };
    }, function (e, t, r) {
        "use strict";
        var n = r(0);
        e.exports = n.isStandardBrowserEnv() ? function () { var e, t = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a"); function o(e) { var n = e; return t && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), { href: r.href, protocol: r.protocol ? r.protocol.replace(/:$/, "") : "", host: r.host, search: r.search ? r.search.replace(/^\?/, "") : "", hash: r.hash ? r.hash.replace(/^#/, "") : "", hostname: r.hostname, port: r.port, pathname: "/" === r.pathname.charAt(0) ? r.pathname : "/" + r.pathname }; } return e = o(window.location.href), function (t) { var r = n.isString(t) ? o(t) : t; return r.protocol === e.protocol && r.host === e.host; }; }() : function () { return !0; };
    }, function (e, t, r) {
        "use strict";
        var n = r(25), o = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach((function (e, t) { o[e] = function (r) { return typeof r === e || "a" + (t < 1 ? "n " : " ") + e; }; }));
        var i = {}, s = n.version.split(".");
        function a(e, t) { for (var r = t ? t.split(".") : s, n = e.split("."), o = 0; o < 3; o++) {
            if (r[o] > n[o])
                return !0;
            if (r[o] < n[o])
                return !1;
        } return !1; }
        o.transitional = function (e, t, r) { var o = t && a(t); function s(e, t) { return "[Axios v" + n.version + "] Transitional option '" + e + "'" + t + (r ? ". " + r : ""); } return function (r, n, a) { if (!1 === e)
            throw new Error(s(n, " has been removed in " + t)); return o && !i[n] && (i[n] = !0, console.warn(s(n, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(r, n, a); }; }, e.exports = { isOlderVersion: a, assertOptions: function (e, t, r) { if ("object" != typeof e)
                throw new TypeError("options must be an object"); for (var n = Object.keys(e), o = n.length; o-- > 0;) {
                var i = n[o], s = t[i];
                if (s) {
                    var a = e[i], u = void 0 === a || s(a, i, e);
                    if (!0 !== u)
                        throw new TypeError("option " + i + " must be " + u);
                }
                else if (!0 !== r)
                    throw Error("Unknown option " + i);
            } }, validators: o };
    }, function (e) { e.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}'); }, function (e, t, r) {
        "use strict";
        var n = r(9);
        function o(e) { if ("function" != typeof e)
            throw new TypeError("executor must be a function."); var t; this.promise = new Promise((function (e) { t = e; })); var r = this; e((function (e) { r.reason || (r.reason = new n(e), t(r.reason)); })); }
        o.prototype.throwIfRequested = function () { if (this.reason)
            throw this.reason; }, o.source = function () { var e; return { token: new o((function (t) { e = t; })), cancel: e }; }, e.exports = o;
    }, function (e, t, r) {
        "use strict";
        e.exports = function (e) { return function (t) { return e.apply(null, t); }; };
    }, function (e, t, r) {
        "use strict";
        e.exports = function (e) { return "object" == typeof e && !0 === e.isAxiosError; };
    }]); }));
const checkWhenICanTakeOutTheGarbage = (function () {
    const { byId, byQuery, prepare, setStyle, add } = dom;
    const getTwoNearestFutureDates = (dates) => {
        const now = new Date();
        return dates
            .filter(date => date > now)
            .sort((a, b) => a.getTime() - b.getTime())
            .slice(0, 2);
    };
    const schedulePeriodsWithDataForCommunity = (fn1, fn2, fn3) => {
        const formData = new FormData();
        formData.append("communityId", "108");
        axios.post("https://pluginecoapi.ecoharmonogram.pl/v1/schedulePeriodsWithDataForCommunity", formData, {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "pl,en-US;q=0.7,en;q=0.3",
            },
            withCredentials: false
        })
            .then((response) => {
            fn1(fn2, fn3, response.data.data.schedulePeriods);
        })
            .catch((error) => {
            console.error(error);
        });
    };
    const getPlaceIds = (fn1, fn2, data) => {
        const form = new FormData();
        form.append('townId', '2149');
        form.append('periodId', data[0].id);
        axios.post('https://pluginecoapi.ecoharmonogram.pl/v1/streetsForTown', form, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'pl,en-US;q=0.7,en;q=0.3',
            },
            withCredentials: false
        })
            .then((response) => {
            const myStreet = response.data.data.find((item) => item.name.indexOf('Kurierów') > -1);
            fn1(fn2, myStreet);
        })
            .catch((error) => {
            console.error(error);
        });
    };
    const getInfoData = (fn, data) => {
        const form = new FormData();
        const splittedStreetIds = data.choosedStreetIds.split(',');
        const streetId = splittedStreetIds[splittedStreetIds.length - 1];
        form.append('townId', '2149');
        form.append('streetName', 'Kurierów Armii Krajowej');
        form.append('number', '7b');
        form.append('streetId', streetId);
        form.append('schedulePeriodId', data.perId);
        form.append('lng', 'pl');
        axios.post('https://pluginecoapi.ecoharmonogram.pl/v1/schedules', form, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'pl,en-US;q=0.7,en;q=0.3',
            }
        })
            .then((response) => {
            const data = response.data.data;
            const names = data.scheduleDescription.map((item) => ({ id: item.id, name: item.name }));
            const currentMonth = (new Date().getMonth() + 1).toString();
            const nextMonth = (new Date().getMonth() + 2).toString();
            const currentYear = new Date().getFullYear();
            const schedules = data.schedules
                .filter((item) => item.month === currentMonth || item.month === nextMonth)
                .map((item) => ({
                name: names.find((n) => n.id === item.scheduleDescriptionId)?.name,
                month: item.month,
                days: item.days.split(';'),
            }));
            const namesWithDates = [];
            schedules.forEach((item) => {
                const node = namesWithDates.find((n) => n.name === item.name);
                if (node) {
                    if (item.days && item.days.length > 0) {
                        item.days.forEach((d) => {
                            const day = new Date(currentYear, Number(item.month) - 1, Number(d), 6, 0, 0);
                            node.dates.push(day);
                        });
                    }
                    else {
                        node.dates = [];
                    }
                }
                else {
                    if (item.days && item.days.length > 0) {
                        namesWithDates.push({
                            name: item.name,
                            dates: item.days.map((d) => new Date(currentYear, Number(item.month) - 1, Number(d), 6, 0, 0)),
                        });
                    }
                    else {
                        namesWithDates.push({
                            name: item.name,
                            dates: []
                        });
                    }
                }
            });
            const result = namesWithDates.map((item) => ({
                name: item.name,
                dates: getTwoNearestFutureDates(item.dates),
            }));
            fn(result);
        })
            .catch((error) => {
            console.error('Błąd:', error);
        });
    };
    const showInfo = (pos, interval) => (data) => {
        const convertDatesToDayDiffs = (items) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const result = items.map(item => ({
                name: item.name,
                dates: item.dates.map(dateStr => {
                    const date = new Date(dateStr);
                    date.setHours(0, 0, 0, 0);
                    const diffTime = date.getTime() - today.getTime();
                    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
                })
            }));
            return result;
        };
        const convertDatesToDayNames = (items) => items.map((item) => {
            const newDates = item.dates.map(date => {
                if (date === 0)
                    return 'dziś';
                if (date === 1)
                    return 'jutro';
                if (date === 2)
                    return 'pojutrze';
                return `za ${date} dni`;
            });
            return {
                name: item.name,
                dates: newDates,
            };
        });
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        const timing = convertDatesToDayNames(convertDatesToDayDiffs(data));
        clearInterval(interval);
        const garbageTime = byId('garbage-time');
        prepare(garbageTime, { inner: '' });
        const oldGarbageBox = byQuery('#garbage-time #garbage-box');
        prepare(oldGarbageBox, { delete: true });
        const garbageBox = prepare('div', { id: 'garbage-box', classes: ['garbage-box'] });
        setStyle(garbageBox, 'visibility', 'hidden');
        prepare(garbageTime, { children: [garbageBox] });
        const tbody = timing.map((time) => {
            const name = prepare('td', { inner: capitalize(time.name) });
            const dates = prepare('td', { inner: time.dates.join(', ') });
            return prepare('tr', { children: [name, dates] });
        });
        prepare(garbageBox, {
            children: [
                prepare('table', {
                    children: [
                        prepare('tbody', { children: tbody })
                    ]
                })
            ]
        });
        const closeGarbageWidow = () => {
            setStyle(garbageTime, 'opacity', '0');
            setTimeout(() => {
                prepare(garbageBox, { delete: true });
                setStyle(garbageTime, 'display', 'none');
                setStyle(garbageTime, 'visibility', 'hidden');
                setStyle(garbageTime, 'width', '50px');
                setStyle(garbageTime, 'height', '50px');
            }, 320);
        };
        setTimeout(() => {
            const width = garbageBox.offsetWidth;
            const height = garbageBox.offsetHeight;
            setStyle(garbageTime, 'width', `${width}px`);
            setStyle(garbageTime, 'height', `${height}px`);
            setStyle(garbageTime, 'left', `${pos.side ? pos.x - width - 90 : pos.x - 30}px`);
            add(garbageTime, 'click', closeGarbageWidow);
            setStyle(garbageBox, 'visibility', 'visible');
        }, 300);
    };
    schedulePeriodsWithDataForCommunity(getPlaceIds, getInfoData, showInfo);
    const show = (event) => {
        const x = event.clientX + window.scrollX;
        const y = event.clientY + window.scrollY;
        const side = window.innerWidth / 2 < event.clientX;
        const garbageTime = byId('garbage-time');
        setStyle(garbageTime, 'display', 'block');
        setStyle(garbageTime, 'visibility', 'visible');
        setStyle(garbageTime, 'width', '50px');
        setStyle(garbageTime, 'height', '50px');
        setStyle(garbageTime, 'left', `${x - 30}px`);
        setStyle(garbageTime, 'top', `${y - 15}px`);
        setTimeout(() => setStyle(garbageTime, 'opacity', '1'), 10);
        let garbageBox = byId('garbage-box');
        if (!garbageBox) {
            garbageBox = prepare('div', { id: 'garbage-box', classes: ['garbage-box'] });
            setStyle(garbageBox, 'visibility', 'visible');
            prepare(garbageTime, { children: [garbageBox] });
        }
        let dots = '.';
        prepare(garbageBox, { inner: dots });
        let interval = setInterval(() => {
            dots += '.';
            prepare(garbageBox, { inner: dots });
            if (dots.length > 8)
                dots = '';
        }, 60);
        schedulePeriodsWithDataForCommunity(getPlaceIds, getInfoData, showInfo({ x, y, side }, interval));
    };
    return {
        show,
    };
}());
const world = {
    data: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 536756224, 0, 0, 0, 0, 0, 0,],
        [0, 0, 1073740800, 1073741283, 15, 0, 0, 0, 0, 0, 0,],
        [0, 0, 1073741664, 1073741823, 8191, 0, 14336, 32768, 0, 0, 0,],
        [0, 0, 134213616, 1073741823, 4095, 1040384, 327936, 2031616, 0, 0, 0,],
        [0, 402653184, 16777152, 1073741820, 4095, 1834496, 0, 331350016, 0, 0, 0,],
        [0, 29360128, 973077615, 1073741823, 8191, 3661824, 0, 0, 30, 0, 0,],
        [0, 29360128, 16748800, 1073741823, 131071, 26148864, 0, 0, 448, 0, 0,],
        [0, 69173248, 33546000, 1073741820, 393215, 1048576, 0, 192, 262016, 0, 0,],
        [0, 1040056320, 6320380, 1073733632, 1048575, 0, 0, 252, 8388600, 1540096, 0, 0,],
        [0, 1069547520, 33549440, 1073676288, 2097151, 0, 0, 60, 33554430, 956039168, 0, 0,],
        [0, 2080768, 0, 1073479680, 8388607, 0, 0, 120, 167772152, 0, 0, 0,],
        [0, 16760832, 1073543046, 1072693248, 8388607, 0, 0, 224, 1006632959, 805369983, 0, 0,],
        [0, 805289984, 1069051854, 1071644675, 16777215, 0, 0, 62915008, 1073741818, 1048575, 62, 0,],
        [0, 1073201152, 1073507855, 1069547535, 16777215, 0, 0, 931137472, 1073741822, 4194303, 4092, 0,],
        [57344, 1069547520, 1072816159, 1006633471, 125829119, 0, 40960, 1056978944, 1073741822, 939524095, 14942207, 114688,],
        [8388096, 1056968704, 1065861631, 1006641151, 268435455, 0, 1044480, 939786240, 1073741811, 1073741823, 536870911, 0,],
        [1073741696, 1058013121, 504312063, 469778424, 134217727, 0, 16776960, 601882624, 1073741807, 1073741823, 1073741823, 1045503, 0,],
        [1073741808, 939524095, 1023336511, 16320, 67108862, 0, 1073741568, 1063321601, 1073741693, 1073741823, 1073741823, 67108863, 0,],
        [1073741792, 134217727, 1056956664, 537001568, 2097151, 0, 1073741312, 1073727007, 1073741055, 1073741823, 1073741823, 1073741823, 1,],
        [1073741696, 1073741823, 1073741823, 2095235, 2097151, 0, 1073740800, 1073711359, 1073738751, 1073741823, 1073741823, 1073741823, 63,],
        [1073741312, 1073741823, 1073741823, 16758787, 4194300, 0, 1073739776, 1073734647, 1073737727, 1073741823, 1073741823, 1073741823, 65535,],
        [1073741816, 1073741823, 1073741823, 7600128, 1048568, 8120, 1073737728, 1073739807, 1073741823, 1073741823, 1073741823, 1073741823, 262143,],
        [1073741808, 1073741823, 1073741823, 4718467, 131056, 32736, 1010823168, 1073738047, 1073741823, 1073741823, 1073741823, 1073741823, 115199,],
        [1073740800, 1073741823, 805306367, 4187679, 262080, 65280, 956297216, 1073740287, 1073741823, 1073741823, 1073741823, 1073741823, 526335,],
        [1073739779, 1073741823, 134217727, 16711782, 1048320, 14336, 973074432, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 32767,],
        [1073741760, 1073741823, 67108863, 12451840, 523264, 0, 956297216, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 262143,],
        [1073741792, 1073741823, 16777215, 6356224, 522240, 134217728, 822081536, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 65531, 0,],
        [1073741792, 1073741823, 16777215, 260096, 1044480, 0, 33550336, 1073741823, 1073741823, 1073741823, 1073741823, 268435455, 65510, 0,],
        [1040187328, 1073741823, 16777215, 2093056, 1998848, 0, 134209536, 1073741820, 1073741823, 1073741823, 1073741823, 536870911, 130960, 0,],
        [570425232, 1073741823, 16777215, 138403840, 1572864, 0, 1073709056, 1073739824, 1073741823, 1073741823, 1073741823, 1073741823, 12032, 0,],
        [2358784, 1073741808, 16777215, 406839296, 0, 0, 1073676288, 1073741697, 1073741823, 1073741823, 1073741823, 603979775, 3591, 0,],
        [1045504, 1073741696, 134217727, 973062144, 1, 0, 1060896768, 1073741697, 1073741823, 1073741823, 1073741823, 2097151, 47104, 0,],
        [1032192, 1073741568, 268435455, 1073709056, 3, 0, 1006633408, 1073740803, 1073741823, 1073741823, 1073741823, 2097151, 63488, 0,],
        [835584, 1073741312, 536870911, 1073676288, 7, 0, 989857728, 1073740567, 1073741823, 1073741823, 1073741823, 4194303, 520192, 0,],
        [28672, 1073740800, 1073741823, 1073610759, 15, 0, 654315392, 1073741327, 1073741823, 1073741823, 1073741823, 8388607, 2088960, 0,],
        [12288, 1073737728, 1073741823, 1073512511, 63, 0, 201341952, 1073739783, 1073741823, 1073741823, 1073741823, 16777215, 8355840, 0,],
        [2560, 1073733632, 1073741823, 1073611263, 255, 0, 939585536, 1073737731, 1073741823, 1073741823, 1073741823, 33554431, 33423360, 0,],
        [128, 1073676288, 1073741823, 1073684479, 2047, 0, 805424896, 1073740546, 1073741823, 1073741823, 1073741823, 268435455, 133693440, 0,],
        [0, 1073627136, 1073741823, 1073618943, 4095, 0, 537333504, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 65011718, 0, 0,],
        [0, 1073627136, 1073741823, 1073627135, 32767, 0, 940547584, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 251658687, 0, 0,],
        [0, 1073250304, 1073741823, 1073496063, 32767, 0, 1014971392, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 469763839, 0, 0,],
        [0, 1072693248, 1073741823, 1073545215, 65535, 0, 956242944, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 805310463, 0, 0,],
        [0, 1072693248, 1073741823, 1073741823, 114687, 0, 956039168, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 10239, 1, 0,],
        [0, 1072693248, 1073741823, 1073741823, 106495, 0, 1009516544, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 122879, 0, 0,],
        [0, 1071644672, 1073741823, 1073741823, 229391, 0, 1006632960, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 475135, 0, 0,],
        [0, 1065353216, 1073741823, 1073741823, 2065935, 0, 1056964608, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 851967, 0, 0,],
        [0, 1040187392, 1073741823, 1073740799, 4162047, 0, 1071644672, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1703935, 0, 0,],
        [0, 1040187392, 1073741823, 1073734143, 8356351, 0, 1069547520, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 2359295, 0, 0,],
        [0, 1006632960, 1073741823, 1073709183, 15729151, 0, 1006632960, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 8912895, 0, 0,],
        [0, 939524096, 1073741823, 1073729535, 1023, 0, 939524096, 1073741823, 1073643519, 1073741793, 1073741823, 1073741823, 51380223, 0, 0,],
        [0, 939524096, 1073741823, 1073741823, 40959, 0, 536870912, 1073741823, 1073492223, 1073741761, 1073741823, 1073741823, 2097151, 0, 0,],
        [0, 805306368, 1073741823, 1069752319, 65535, 0, 0, 1073610751, 1073606911, 1073708929, 1073741823, 1073741823, 4194303, 0, 0,],
        [0, 805306368, 1073741823, 1067958271, 14847, 0, 0, 1071906814, 1073267199, 1073545153, 1073741823, 1073741823, 545259519, 1, 0,],
        [0, 805306368, 1073741823, 1072152575, 6271, 0, 0, 1070055420, 1069548031, 1073741703, 1073741823, 1073741823, 8388607, 46, 0, 0,],
        [0, 805306368, 1073741823, 836714495, 63, 0, 788529152, 1044258812, 1056965631, 1073741327, 1073741823, 1073741823, 16777215, 124, 0, 0,],
        [0, 939524096, 1073741823, 1073692671, 31, 0, 1065353216, 1010565375, 1006633471, 1073740815, 1073741823, 1073741823, 5242879, 62, 0, 0,],
        [0, 805306368, 1073741823, 1059012607, 63, 0, 1056964608, 552665599, 805308415, 1073737791, 1073741823, 1073741823, 1048575, 76, 0, 0,],
        [0, 536870912, 1073741823, 1071644671, 127, 0, 1040187392, 130024447, 540938238, 1073709311, 1073741823, 1073741823, 2097151, 16, 0, 0,],
        [0, 536870912, 1073741823, 1073741823, 31, 0, 1006632960, 504103423, 1073729532, 1073677311, 1073741823, 1073741823, 4194303, 64, 0, 0,],
        [0, 536870912, 1073741823, 1073741823, 15, 0, 939524096, 941097471, 1073738234, 1073680383, 1073741823, 1073741823, 8376319, 384, 0, 0,],
        [0, 536870912, 1073741823, 1073741823, 7, 0, 1006632960, 806881535, 1073737968, 1073678335, 1073741823, 1073741823, 3983359, 768, 0, 0,],
        [0, 0, 1073741823, 1073741823, 7, 0, 939524096, 511, 1073734081, 1073483775, 1073741823, 1073741823, 15763455, 1536, 0, 0,],
        [0, 0, 1073741822, 1073741823, 7, 0, 805306368, 1023, 1073727361, 1073225727, 1073741823, 1073741823, 65015807, 3072, 0, 0,],
        [0, 0, 1073741822, 1073741823, 3, 0, 536870912, 1006633471, 1073709824, 1072709631, 1073741823, 1073741823, 125911039, 3072, 0, 0,],
        [0, 0, 1073741820, 1073741823, 3, 0, 0, 549454333, 1073677825, 1071775743, 1073741823, 1073741823, 504365055, 15616, 0, 0,],
        [0, 0, 1073741816, 1073741823, 7, 0, 0, 67100720, 590348288, 1073741823, 1073741823, 1073741823, 1007157247, 32256, 0, 0,],
        [0, 0, 1073741808, 1073741823, 7, 0, 0, 67106832, 536870912, 1073741823, 1073741823, 1073741823, 940048383, 65025, 0, 0,],
        [0, 0, 1073741792, 1073741823, 7, 0, 0, 134217696, 100761600, 1073741823, 1073741823, 1073741823, 805830655, 32707, 0, 0,],
        [0, 0, 1073741760, 1073741823, 3, 0, 0, 268435424, 0, 1073741822, 1073741823, 1073741823, 2097151, 8129, 0, 0,],
        [0, 0, 1073741568, 1073741823, 1, 0, 0, 134217712, 0, 1073741823, 1073741823, 1073741823, 4194303, 8032, 0, 0,],
        [0, 0, 1073740800, 1073741823, 0, 0, 0, 1073741816, 0, 1073741822, 1073741823, 1073741823, 16777215, 1984, 0, 0,],
        [0, 0, 1073740800, 536870911, 0, 0, 0, 1073741816, 28687, 1073741822, 1073741823, 1073741823, 33554431, 448, 0, 0,],
        [0, 0, 1073739776, 536870911, 0, 0, 0, 1073741816, 520255, 1073741820, 1073741823, 1073741823, 134217727, 768, 0, 0,],
        [0, 0, 1073715200, 268435455, 0, 0, 0, 1073741816, 205516927, 1073741822, 1073741823, 1073741823, 134217727, 512, 0, 0,],
        [0, 0, 1073688576, 268435455, 0, 0, 0, 1073741808, 1073735679, 1073741823, 1073741823, 1073741823, 268435455, 0, 0, 0,],
        [0, 0, 1073688576, 264372223, 0, 0, 0, 1073741808, 1073741823, 1069547519, 1073741823, 1073741823, 536870911, 0, 0, 0,],
        [0, 0, 1073659904, 469960703, 0, 0, 0, 1073741808, 1073741823, 1044381695, 1073741823, 1073741823, 1073741823, 0, 0, 0, 0,],
        [0, 0, 1073528832, 939525119, 0, 0, 0, 1073741816, 1073741823, 1010827263, 1073741823, 1073741823, 1073741823, 0, 0, 0, 0,],
        [0, 0, 1073315840, 805306879, 1, 0, 0, 1073741820, 1073741823, 956301311, 1073741823, 1073741823, 1073741823, 1, 0, 0, 0,],
        [0, 0, 1072939008, 805306623, 1, 0, 0, 1073741822, 1073741823, 570425295, 1073741823, 1073741823, 1073741823, 1, 0, 0, 0,],
        [0, 0, 1070006272, 536871167, 3, 0, 0, 1073741822, 1073741823, 134217503, 1073741790, 1073741823, 1073741823, 1, 0, 0, 0,],
        [0, 0, 1069809664, 536871167, 3, 0, 0, 1073741823, 1073741823, 134217279, 1073741760, 1073741823, 1073741823, 1, 0, 0, 0,],
        [0, 0, 1070333952, 255, 1, 0, 0, 1073741823, 1073741823, 536870463, 1073741616, 1073741823, 1073741823, 1, 0, 0, 0,],
        [0, 0, 1058537472, 511, 0, 0, 0, 1073741823, 1073741823, 1073740031, 1071644768, 1073741823, 1073741823, 17, 0, 0, 0,],
        [0, 0, 1041235968, 255, 0, 0, 0, 1073741823, 1073741823, 1073740031, 1071644784, 1073741823, 1073741823, 24, 0, 0, 0,],
        [0, 0, 1008730112, 255, 0, 0, 536870912, 1073741823, 1073741823, 1073738239, 1065353727, 1073741823, 536870911, 24, 0, 0, 0,],
        [0, 0, 943718400, 536871423, 3, 0, 536870912, 1073741823, 1073741823, 1073726463, 1040191487, 1073741823, 536870911, 48, 0, 0, 0,],
        [0, 0, 805306368, 402653695, 31, 0, 536870912, 1073741823, 1073741823, 1073727487, 1006641151, 1073741823, 134217727, 32, 0, 0, 0,],
        [0, 0, 805306368, 268435967, 60, 0, 805306368, 1073741823, 1073741823, 1073729535, 1006637055, 1015021567, 33554431, 0, 0, 0, 0,],
        [0, 0, 805306368, 7864831, 240, 0, 805306368, 1073741823, 1073741823, 1073713151, 402657279, 940572671, 2359295, 0, 0, 0, 0,],
        [0, 0, 805306368, 16253951, 1920, 0, 0, 1073741823, 1073741823, 1073684479, 4095, 807403516, 4456447, 0, 0, 0, 0,],
        [1048576, 0, 805306368, 7866367, 45056, 0, 0, 1073741823, 1073741823, 1073487871, 2047, 1048574, 14811135, 0, 0, 0, 0,],
        [524288, 0, 536870912, 8128511, 253952, 0, 0, 1073741823, 1073741823, 1073487871, 2047, 262140, 6422527, 0, 0, 0, 0,],
        [0, 0, 0, 4132863, 520192, 0, 0, 1073741823, 1073741823, 1073233919, 1023, 262140, 6422526, 0, 0, 0, 0,],
        [0, 0, 0, 8388600, 4227456, 0, 0, 1073741822, 1073741823, 1072758783, 1023, 262136, 524280, 1792, 0, 0, 0,],
        [0, 0, 0, 4194272, 0, 0, 0, 1073741822, 1073741823, 1071775743, 511, 131064, 1048568, 1792, 0, 0, 0,],
        [0, 0, 0, 4194176, 0, 0, 0, 1073741822, 1073741823, 1069678591, 63, 65520, 2097080, 1792, 0, 0, 0,],
        [0, 0, 0, 4181504, 0, 0, 0, 1073741823, 1073741823, 1069678591, 31, 32752, 4194200, 1792, 0, 0, 0,],
        [0, 0, 0, 536805376, 0, 0, 0, 1073741822, 1073741823, 1065877503, 31, 16320, 16776960, 1536, 0, 0, 0,],
        [0, 0, 0, 1073610752, 0, 0, 0, 1073741823, 1073741823, 1066401791, 7, 16320, 16776704, 3584, 0, 0, 0,],
        [0, 0, 0, 1073479680, 0, 0, 0, 1073741822, 1073741823, 1067450367, 1, 32640, 33553920, 7168, 0, 0, 0,],
        [0, 0, 0, 534773760, 0, 0, 0, 1073741822, 1073741823, 524287999, 0, 32640, 33553408, 29696, 0, 0, 0,],
        [0, 0, 0, 1040187392, 0, 0, 0, 1073741820, 1073741823, 134217727, 0, 65280, 67098624, 36864, 0, 0, 0,],
        [0, 0, 0, 1040187392, 65536, 0, 0, 1073741820, 1073741823, 33554431, 0, 65024, 67049472, 163840, 0, 0, 0,],
        [0, 0, 0, 872415232, 311296, 0, 0, 1073741808, 1073741823, 33554431, 48, 32256, 66983936, 147456, 0, 0, 0,],
        [0, 0, 0, 939524096, 2095104, 0, 0, 1073741808, 1073741823, 67108863, 63, 31744, 33294336, 180224, 0, 0, 0,],
        [0, 0, 0, 939524096, 486537216, 1, 0, 1073741792, 1073741823, 1073741823, 63, 31744, 7866368, 229888, 0, 0, 0,],
        [0, 0, 0, 805306368, 1073675265, 0, 0, 1073741760, 1073741823, 1073741823, 31, 14336, 3147776, 114688, 0, 0, 0,],
        [0, 0, 0, 536870912, 1073741427, 1, 0, 1073741696, 1073741823, 1073741823, 31, 79872, 1054720, 786688, 0, 0, 0,],
        [0, 0, 0, 0, 1073741598, 15, 0, 1073741568, 1073741823, 1073741823, 63, 401408, 28672, 2031616, 0, 0, 0,],
        [0, 0, 0, 0, 1073741592, 31, 0, 1073741568, 1073741823, 1073741823, 31, 458752, 24576, 2064384, 0, 0, 0,],
        [0, 0, 0, 0, 1073741568, 31, 0, 1073741312, 1073741823, 1073741823, 31, 917504, 49152, 1835008, 0, 0, 0,],
        [0, 0, 0, 0, 1073741312, 63, 0, 1073739776, 1073741823, 1073741823, 15, 393216, 114688, 786816, 0, 0, 0,],
        [0, 0, 0, 0, 1073741312, 2047, 0, 134213632, 1073741816, 1073741823, 15, 0, 229376, 525184, 0, 0, 0,],
        [0, 0, 0, 0, 1073741312, 8191, 0, 33546240, 1073741816, 1073741823, 7, 0, 493312, 1984, 0, 0, 0,],
        [0, 0, 0, 0, 1073741312, 16383, 0, 32768, 1073741808, 1073741823, 7, 0, 986624, 1008, 0, 0, 0,],
        [0, 0, 0, 0, 1073741312, 32767, 0, 0, 1073741312, 1073741823, 3, 0, 990208, 1008, 0, 0, 0,],
        [0, 0, 0, 0, 1073741312, 32767, 0, 0, 1073740800, 1073741823, 1, 0, 997376, 504, 0, 0, 0,],
        [0, 0, 0, 0, 1073741568, 65535, 0, 0, 1073740800, 1073741823, 0, 0, 948224, 1022, 0, 0, 0,],
        [0, 0, 0, 0, 1073741696, 65535, 0, 0, 1073740800, 536870911, 0, 0, 1961984, 1023, 0, 0, 0,],
        [0, 0, 0, 0, 1073741760, 131071, 0, 0, 1073741312, 268435455, 0, 0, 940826624, 25692159, 0, 0, 0,],
        [0, 0, 0, 0, 1073741792, 65535, 0, 0, 1073741312, 134217727, 0, 0, 940040192, 25682943, 0, 0, 0,],
        [0, 0, 0, 0, 1073741792, 131071, 0, 0, 1073741312, 67104767, 0, 0, 940556288, 8393215, 0, 0, 0,],
        [0, 0, 0, 524288, 1073741808, 524287, 0, 0, 1073741312, 33547263, 0, 0, 806322176, 545264127, 1, 0, 0,],
        [0, 0, 0, 0, 1073741808, 4194303, 0, 0, 1073741568, 16770047, 0, 0, 807378944, 805433855, 3, 0, 0,],
        [0, 0, 0, 0, 1073741808, 16777215, 0, 0, 1073741312, 16774143, 0, 0, 543096832, 536899839, 387, 0, 0,],
        [0, 0, 0, 0, 1073741808, 33554431, 0, 0, 1073741312, 8386559, 0, 0, 553582592, 30975, 2023, 0, 0,],
        [0, 0, 0, 0, 1073741792, 1073741823, 1, 0, 1073740800, 4194303, 0, 0, 50200576, 117495934, 8183, 0, 0,],
        [0, 0, 0, 0, 1073741808, 1073741823, 7, 0, 1073739776, 2097151, 0, 0, 8126464, 2150496, 65535, 0, 0,],
        [0, 0, 0, 0, 1073741816, 1073741823, 15, 0, 1073737728, 2097151, 0, 0, 7864320, 102400, 201457656, 0, 0,],
        [0, 0, 0, 0, 1073741816, 1073741823, 31, 0, 1073733632, 1048575, 0, 0, 7340032, 102400, 67370944, 0, 0,],
        [0, 0, 0, 0, 1073741808, 1073741823, 127, 0, 1073733632, 1048575, 0, 0, 6291456, 4096, 63438720, 0, 0,],
        [0, 0, 0, 0, 1073741808, 1073741823, 255, 0, 1073733632, 1048575, 0, 0, 58720256, 0, 27262724, 2, 0,],
        [0, 0, 0, 0, 1073741792, 1073741823, 255, 0, 1073725440, 2097023, 0, 0, 796917760, 3, 1048320, 0, 0,],
        [0, 0, 0, 0, 1073741760, 1073741823, 255, 0, 1073725440, 2097151, 0, 0, 1056964608, 7, 1048448, 0, 0,],
        [0, 0, 0, 0, 1073741696, 1073741823, 255, 0, 1073725440, 2097151, 0, 0, 536870912, 63, 1867648, 64, 0,],
        [0, 0, 0, 0, 1073741760, 1073741823, 127, 0, 1073733632, 1048575, 0, 0, 0, 1850304, 1850368, 128, 0,],
        [0, 0, 0, 0, 1073741696, 1073741823, 63, 0, 1073733632, 1048575, 0, 0, 0, 132096, 3932160, 64, 0,],
        [0, 0, 0, 0, 1073741696, 1073741823, 31, 0, 1073725440, 1048575, 0, 0, 0, 67584, 7864320, 0, 0,],
        [0, 0, 0, 0, 1073741568, 1073741823, 15, 0, 1073725440, 2097151, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 1073741568, 1073741823, 15, 0, 1073725440, 2093055, 0, 0, 0, 167772160, 2048, 0, 0,],
        [0, 0, 0, 0, 1073741312, 1073741823, 7, 0, 1073725440, 2093055, 0, 0, 0, 805306368, 6144, 0, 0,],
        [0, 0, 0, 0, 1073741312, 1073741823, 7, 0, 1073733632, 2093055, 8, 0, 0, 1040187392, 7183, 0, 0,],
        [0, 0, 0, 0, 1073741312, 1073741823, 1, 0, 1073737728, 1048575, 6, 0, 0, 1065353216, 3587, 0, 0,],
        [0, 0, 0, 0, 1073741312, 1073741823, 1, 0, 1073739776, 1048575, 7, 0, 0, 1065353216, 3585, 0, 0,],
        [0, 0, 0, 0, 1073740800, 1073741823, 1, 0, 1073739776, 1048575, 7, 0, 0, 1070465024, 7681, 0, 0,],
        [0, 0, 0, 0, 1073739776, 1073741823, 1, 0, 1073739776, 537919487, 15, 0, 0, 1073676288, 15873, 8192, 0,],
        [0, 0, 0, 0, 1073737728, 1073741823, 1, 0, 1073740800, 940572671, 7, 0, 0, 1073709056, 16131, 0, 0,],
        [0, 0, 0, 0, 1073733632, 1073741823, 0, 0, 1073741312, 1057226751, 3, 0, 0, 1073733632, 8067, 536870912, 0,],
        [0, 0, 0, 0, 1073725440, 1073741823, 0, 0, 1073741312, 1057095679, 1, 0, 0, 1073739776, 8143, 0, 0,],
        [0, 0, 0, 0, 1073676288, 1073741823, 0, 0, 1073741312, 1065385983, 1, 0, 0, 1073739776, 8191, 201326592, 0,],
        [0, 0, 0, 0, 1073610752, 536870911, 0, 0, 1073740800, 1065369599, 1, 0, 0, 1073740800, 8191, 0, 0,],
        [0, 0, 0, 0, 1073676288, 268435455, 0, 0, 1073741312, 528486399, 0, 0, 0, 1073741568, 4095, 0, 0,],
        [0, 0, 0, 0, 1073676288, 268435455, 0, 0, 1073740800, 528483327, 0, 0, 0, 1073741696, 16383, 0, 0,],
        [0, 0, 0, 0, 1073610752, 268435455, 0, 0, 1073740800, 528483327, 0, 0, 0, 1073741808, 32767, 0, 0,],
        [0, 0, 0, 0, 1073610752, 134217727, 0, 0, 1073739776, 264242175, 0, 0, 0, 1073741822, 32767, 64, 0,],
        [0, 0, 0, 0, 1073676288, 67108863, 0, 0, 1073740800, 133169663, 0, 0, 805306368, 1073741823, 32767, 64, 0,],
        [0, 0, 0, 0, 1073676288, 33554431, 0, 0, 1073739776, 133170175, 0, 0, 1006632960, 1073741823, 32767, 128, 0,],
        [0, 0, 0, 0, 1073676288, 16777215, 0, 0, 1073739776, 66061311, 0, 0, 1006632960, 1073741823, 65535, 0, 0,],
        [0, 0, 0, 0, 1073709056, 1048575, 0, 0, 1073740800, 33030399, 0, 0, 1056964608, 1073741823, 32767, 0, 0,],
        [0, 0, 0, 0, 1073709056, 262143, 0, 0, 1073740800, 33030399, 0, 0, 1056964608, 1073741823, 65535, 0, 0,],
        [0, 0, 0, 0, 1073709056, 65535, 0, 0, 1073740800, 15728895, 0, 0, 1056964608, 1073741823, 65535, 0, 0,],
        [0, 0, 0, 0, 1073725440, 16383, 0, 0, 1073741312, 3145759, 0, 0, 1065353216, 1073741823, 65535, 0, 0,],
        [0, 0, 0, 0, 1073725440, 16383, 0, 0, 1073740800, 15, 0, 0, 1069547520, 1073741823, 65535, 0, 0,],
        [0, 0, 0, 0, 1073725440, 16383, 0, 0, 1073740800, 15, 0, 0, 1069547520, 1073741823, 65535, 0, 0,],
        [0, 0, 0, 0, 1073733632, 8191, 0, 0, 1073741312, 7, 0, 0, 1069547520, 1073741823, 16383, 0, 0,],
        [0, 0, 0, 0, 1073733632, 8191, 0, 0, 1073741312, 3, 0, 0, 1069547520, 1073741823, 16383, 0, 0,],
        [0, 0, 0, 0, 1073737728, 4095, 0, 0, 1073741312, 1, 0, 0, 1071644672, 1073741823, 8191, 0, 0,],
        [0, 0, 0, 0, 1073737728, 2047, 0, 0, 1073740800, 0, 0, 0, 1071644672, 1073741823, 8191, 0, 0,],
        [0, 0, 0, 0, 1073737728, 2047, 0, 0, 536869888, 0, 0, 0, 1071644672, 1073741823, 4095, 0, 0,],
        [0, 0, 0, 0, 1073739776, 1023, 0, 0, 268434432, 0, 0, 0, 1072693248, 1073741823, 2047, 0,],
        [0, 0, 0, 0, 1073739776, 255, 0, 0, 134216704, 0, 0, 0, 1072693248, 1073741823, 1023, 0,],
        [0, 0, 0, 0, 1073739776, 127, 0, 0, 33553408, 0, 0, 0, 1073217536, 1073740927, 255, 0,],
        [0, 0, 0, 0, 1073739776, 127, 0, 0, 16776192, 0, 0, 0, 1073217536, 1073733639, 255, 0,],
        [0, 0, 0, 0, 1073740800, 31, 0, 0, 4194048, 0, 0, 0, 536739840, 1073737728, 31, 0,],
        [0, 0, 0, 0, 1073741312, 15, 0, 0, 524032, 0, 0, 0, 134184960, 1073739776, 7, 0,],
        [0, 0, 0, 0, 1073741312, 7, 0, 0, 7936, 0, 0, 0, 2064384, 1073731584, 3, 0,],
        [0, 0, 0, 0, 671088384, 1, 0, 0, 0, 0, 0, 0, 229376, 1073725440, 536870912, 0,],
        [0, 0, 0, 0, 268435200, 0, 0, 0, 0, 0, 0, 0, 0, 536854528, 536870912, 1,],
        [0, 0, 0, 0, 268435328, 0, 0, 0, 0, 0, 0, 0, 0, 268419072, 268435456, 0,],
        [0, 0, 0, 0, 134217664, 0, 0, 0, 0, 0, 0, 0, 0, 67100672, 402653184, 0,],
        [0, 0, 0, 0, 134217664, 0, 0, 0, 0, 0, 0, 0, 0, 33550336, 402653184, 0,],
        [0, 0, 0, 0, 67108832, 0, 0, 0, 0, 0, 0, 0, 0, 2093056, 1006632960, 1,],
        [0, 0, 0, 0, 8388592, 0, 0, 0, 0, 0, 0, 0, 0, 139264, 251658240, 0,],
        [0, 0, 0, 0, 524256, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62914560, 0,],
        [0, 0, 0, 0, 262128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29360128, 0,],
        [0, 0, 0, 0, 262136, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2097152, 0,],
        [0, 0, 0, 0, 16380, 0, 0, 0, 0, 0, 0, 0, 0, 31744, 1015808, 0,],
        [0, 0, 0, 0, 16368, 0, 0, 0, 0, 0, 0, 0, 0, 15360, 122880, 0,],
        [0, 0, 0, 0, 32764, 0, 0, 0, 0, 0, 0, 0, 0, 3584, 30720, 0,],
        [0, 0, 0, 0, 8186, 0, 0, 0, 0, 0, 0, 0, 0, 768, 3840, 0,],
        [0, 0, 0, 0, 4092, 0, 0, 0, 0, 0, 0, 0, 0, 0, 992, 0,],
        [0, 0, 0, 0, 2046, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60,],
        [0, 0, 0, 536870912, 511, 0, 0, 0, 0, 0, 0, 0, 0, 536870912, 15,],
        [0, 0, 0, 805306368, 127, 0, 0, 0, 0, 0, 0, 0, 0, 939524096, 3,],
        [0, 0, 0, 805306368, 127, 0, 0, 0, 0, 0, 0, 0, 0, 805306368, 0,],
        [0, 0, 0, 805306368, 511, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 939524096, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1006632960, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1040187392, 31, 0, 0, 0, 0, 1048576, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1040187392, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1056964608, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1056964608, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1040187392, 14337, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1056964608, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1056964608, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 922746880, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1056964608, 1, 32, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 1040187392, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 939524096, 1, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 58720256, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 12582912, 0, 0, 0, 0, 0, 0, 1048576, 0, 0,],
        [0, 0, 0, 16252928, 0, 0, 0, 65011712, 0, 125956096, 516096, 0, 0,],
        [0, 0, 0, 983040, 0, 0, 0, 66977792, 939524096, 805306367, 33553919, 0, 0,],
        [0, 0, 0, 229376, 0, 0, 0, 1073739776, 1073479683, 1073741823, 33554431, 0, 0,],
        [0, 0, 0, 196608, 0, 0, 0, 1073741760, 1073733663, 1073741823, 134217727, 0, 0,],
        [0, 0, 0, 249344, 0, 0, 234881024, 1073741820, 1073740803, 1073741823, 1073741823, 1, 0,],
        [0, 0, 0, 523776, 0, 0, 1072693248, 1073741823, 1073741808, 1073741823, 1073741823, 1, 0,],
        [0, 0, 0, 524064, 0, 1069613056, 1073741823, 134217727, 1073741823, 1073741823, 1073741823, 15,],
        [0, 0, 0, 131056, 0, 1073741280, 1073741823, 956301311, 1073741823, 1073741823, 1073741823, 15,],
        [0, 0, 7936, 129984, 0, 1073741792, 1073741823, 1069547519, 1073741823, 1073741823, 1073741823, 1,],
        [0, 0, 852896, 130820, 0, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 134217727, 0,],
        [0, 940007424, 1073741792, 32767, 939524096, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1048575, 0,],
        [0, 117300824, 1073741760, 4095, 1040187392, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 65535, 0,],
        [872415232, 1073741823, 1073741823, 511, 1069547520, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1023, 0,],
        [1072693248, 1073741823, 973078527, 7, 1073737728, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 63, 0,],
        [1073528832, 1073741823, 67108863, 0, 1073741760, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 7,],
        [1073737728, 1073741823, 134217727, 7340032, 1073741820, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1,],
        [1073725824, 1073741823, 807403519, 807337984, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 16777215, 0,],
        [1072693248, 1073741823, 4194303, 2080800, 1073741816, 1073741823, 1073741823, 1073741823, 1073741823, 131071, 0,],
        [1071644672, 1073741823, 16777215, 939555848, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 16383, 0,],
        [1073725440, 1073741823, 536870911, 1073479680, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1023, 0,],
        [1073676291, 1073741823, 1073741823, 1073741815, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1023,],
        [1073709056, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 2047,],
        [1073610879, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 262143,],
        [1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 4095,],
        [1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 63,],
        [1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823, 1073741823,],],
    rowsLength: [272, 280, 286, 291, 296, 302, 306, 312, 316, 322, 326, 330, 334, 338, 342, 346, 350, 352, 356, 360, 362, 366, 368, 372, 376, 378, 380, 384, 387, 390, 392, 394, 398, 400, 402, 406, 408, 410, 412, 416, 418, 420, 422, 424, 426, 428, 430, 432, 434, 436, 438, 440, 442, 444, 446, 448, 450, 452, 454, 454, 456, 458, 460, 462, 462, 464, 466, 466, 468, 470, 470, 472, 474, 474, 476, 476, 478, 478, 480, 480, 482, 482, 484, 484, 486, 486, 486, 488, 488, 488, 490, 490, 490, 490, 492, 492, 492, 493, 494, 494, 494, 495, 496, 496, 496, 496, 498, 498, 498, 498, 498, 498, 498, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 498, 498, 498, 498, 498, 498, 498, 496, 496, 496, 496, 496, 494, 494, 494, 494, 492, 492, 492, 492, 490, 490, 490, 488, 488, 488, 486, 486, 486, 484, 484, 482, 482, 482, 480, 480, 478, 478, 476, 474, 474, 472, 472, 470, 468, 468, 466, 464, 464, 462, 460, 458, 458, 456, 454, 452, 450, 448, 446, 446, 444, 442, 440, 438, 436, 434, 432, 430, 428, 426, 424, 420, 418, 416, 414, 412, 409, 406, 404, 402, 398, 396, 394, 390, 388, 386, 382, 380, 376, 374, 370, 368, 364, 362, 358, 354, 352, 348, 344, 340, 336, 332, 328, 324, 318, 314, 310, 304, 300, 294, 288, 282, 276, 270],
    rowsStart: [114, 110, 107, 105, 102, 99, 97, 94, 92, 89, 87, 85, 83, 81, 79, 77, 75, 74, 72, 70, 69, 67, 66, 64, 62, 61, 60, 58, 56, 55, 54, 53, 51, 50, 49, 47, 46, 45, 44, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 23, 22, 21, 20, 19, 19, 18, 17, 17, 16, 15, 15, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12, 13, 13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 20, 21, 21, 22, 23, 24, 25, 26, 27, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 45, 47, 48, 49, 51, 52, 53, 55, 56, 57, 59, 60, 62, 63, 65, 66, 68, 69, 71, 73, 74, 76, 78, 80, 82, 84, 86, 88, 91, 93, 95, 98, 100, 103, 106, 109, 112, 115],
    width: 500,
    height: 254
};
const moon = {
    data: [[71512865, 19084340],
        [89473824, 107374166, 90601318, 74565],
        [107303968, 125269879, 125278071, 108558216, 214118],
        [124151122, 143165575, 161061016, 143165593, 108492664, 838],
        [124150849, 159951223, 178956953, 160008602, 143165576, 107444088, 20],
        [142046530, 177834120, 196782762, 161131179, 143165849, 143165592, 3565432],
        [143091010, 160995464, 178956953, 162184123, 177838489, 144279945, 108497320, 839],
        [143029570, 161056904, 162109849, 179026602, 161065370, 161061273, 143301001, 38102904],
        [141972801, 159942792, 161126809, 178956953, 180005546, 178887065, 163228330, 109611146, 5189],
        [125265218, 159942792, 143169688, 162179480, 177908394, 178887066, 178956970, 126462634, 3425399],
        [142042417, 143165832, 142117000, 144279688, 161130904, 178956953, 178891434, 145341354, 73889689, 324],
        [125199425, 143165575, 143165592, 143165832, 178886791, 161061274, 161061273, 179026585, 125340058, 214374],
        [125260866, 125204344, 143231384, 144214152, 161061256, 144284313, 143165848, 178952600, 144275883, 55998072],
        [108422195, 142047078, 161061255, 178952329, 161061546, 177838745, 143169689, 194611336, 176794026, 107378824, 69],
        [107304003, 143169383, 177842841, 179022505, 179022506, 161061273, 144284057, 178817160, 161061546, 108628137, 83286],
        [106251073, 144139861, 162175401, 180066969, 212511114, 177842588, 161065369, 159943065, 178961066, 143235482, 90601592, 1],
        [106251057, 176645461, 161061529, 176724378, 179996298, 194755532, 180075179, 162109850, 178956969, 159947434, 108562584, 598],
        [89408289, 159868502, 161065882, 142051754, 179022488, 196852938, 180071081, 162179498, 180005529, 144358058, 143169928, 83559],
        [89408288, 177833590, 160017049, 127502489, 159946889, 197901242, 178956971, 179026602, 178961050, 163232428, 109607065, 21395576],
        [89408306, 161056614, 142112682, 125269881, 159942824, 214678442, 178961067, 178961594, 195668634, 180005546, 110659993, 73828504],
        [106185523, 161056085, 126314425, 125265511, 143296648, 213624985, 197901244, 180075485, 162179754, 178952873, 143235482, 108628104, 69],
        [88359730, 159929685, 141982361, 125199991, 143165576, 180001160, 195804092, 180075723, 180070810, 178891434, 178887354, 143165848, 17783],
        [88355633, 143086933, 107444872, 107374199, 144275592, 211392648, 213634236, 180079820, 197831338, 195734186, 161069994, 142121114, 3499640],
        [71578400, 143021397, 107583881, 107374182, 143165559, 177838216, 199019434, 196852923, 162109835, 178953129, 162183867, 144353705, 91649912, 2],
        [106185538, 143086933, 90667145, 125269606, 126388087, 177838216, 213633962, 197966555, 161061291, 159947433, 178956971, 162241194, 107444088, 4],
        [89404194, 125199957, 124156295, 107373926, 144209526, 178886791, 196848299, 197905629, 161065915, 143305385, 178961337, 180005531, 108562569, 855],
        [89404193, 124151125, 124160135, 124151415, 143161190, 178886792, 196782779, 179030988, 144358331, 143239594, 230472600, 195734202, 142182827, 87671],
        [71582754, 125199957, 107374727, 107378278, 143095670, 177834120, 213555882, 126471372, 196782471, 161126537, 197896600, 178956987, 160991659, 288631],
        [72631073, 107373892, 124151654, 107444087, 142112630, 160987272, 178891434, 143179467, 162105480, 162105481, 195672729, 179026876, 143170219, 55998601],
        [71513138, 107373909, 141977446, 107439735, 143095654, 145258376, 177916585, 161004730, 143231112, 196778121, 197901226, 195808443, 144288682, 90671256],
        [88290097, 107374165, 125200230, 108422775, 125335143, 158828679, 162245273, 126471081, 143165576, 195594392, 196913836, 198036411, 161070010, 125339801, 54],
        [71582787, 108488277, 125265783, 107374184, 125269606, 143165319, 179022233, 125414570, 126322807, 212305817, 214678204, 213699788, 177978027, 126392489, 71],
        [70534193, 108488036, 125273974, 107374455, 142047094, 143161480, 197896617, 143243691, 125339767, 125274263, 214743977, 214813900, 177912764, 143235499, 13943],
        [71578930, 126313813, 126314087, 125269879, 125335160, 176654472, 196852377, 143169947, 125335688, 125339800, 214678167, 213634252, 177781677, 143169689, 18039],
        [71512881, 125265236, 158819959, 125269624, 126318455, 159877255, 213559706, 143239867, 143100040, 108562567, 231450726, 196922589, 179026875, 143297193, 2455416],
        [71512898, 109672021, 143095687, 144143992, 126314375, 195594632, 195730090, 143305900, 159938729, 125343895, 231372646, 195874029, 177912492, 126384297, 4618120],
        [71578435, 126453349, 125269624, 125335143, 126318455, 178948778, 161065659, 126463401, 143099784, 142051464, 231380839, 196857309, 194685609, 109606538, 5666695],
        [88360002, 142177876, 107440007, 141977462, 143034486, 194550151, 179027114, 127576967, 143165303, 142121096, 178873992, 213765324, 196783003, 107444105, 91719800, 3],
        [71586611, 127698517, 107440007, 142047094, 126253192, 176719991, 145406906, 128629690, 126318199, 125339800, 178878088, 213629883, 179026858, 107378567, 90671221, 4],
        [54805297, 142046788, 107374456, 124299126, 159938439, 126392440, 196852648, 162380747, 143095670, 125340039, 195459207, 212446138, 212581052, 107444089, 109544789, 69],
        [70533939, 125265236, 108426871, 125343607, 160069785, 125339784, 213555336, 145477084, 142042998, 125340295, 174552967, 211397563, 196856765, 107378825, 110650709, 582],
        [70468403, 107373908, 141125239, 144284039, 160008311, 143165576, 196774024, 161136109, 143160935, 142051719, 176580471, 195668667, 214748364, 107444122, 93869397, 838],
        [70464579, 107369812, 125204359, 143170183, 143231113, 159947144, 214599816, 161135820, 125273752, 142117000, 160851848, 143231658, 232709288, 107378587, 127358293, 837],
        [53691186, 89478484, 108492902, 143165558, 160921752, 177772697, 197761144, 178961356, 125335671, 126388359, 124151671, 127449511, 249277319, 107449278, 158750038, 13656],
        [71582515, 106255684, 125273974, 176654455, 160008345, 161061274, 196848024, 177969867, 178821529, 126384247, 108623462, 126392454, 213625750, 124222397, 159929702, 79479],
        [71582548, 106321220, 107583606, 177838215, 160008362, 161061546, 230411416, 179018427, 160008057, 126385066, 108488294, 125339493, 195799415, 107449021, 144266598, 214903],
        [71582788, 106255428, 108628086, 180070775, 177908410, 195734187, 196787115, 143165867, 127572633, 178962136, 107375239, 124221030, 180071254, 107519197, 144275046, 284280],
        [71582789, 107369540, 108628086, 179021977, 179022538, 161266619, 195799449, 143165577, 142266024, 143309479, 107370085, 124147302, 179021909, 108575947, 160011878, 288631],
        [71582805, 108352852, 108562551, 179021944, 197967035, 162245546, 177781145, 143231113, 160156808, 91924890, 107373909, 89478775, 177628502, 127581370, 127502726, 288647],
        [71583057, 106255684, 160991094, 195795063, 198036411, 180075451, 125340058, 143165608, 162105463, 108637098, 107373925, 89548406, 106325333, 196856727, 143174042, 22509446],
        [71583315, 89474372, 161060725, 212576375, 215796412, 179026875, 106465433, 142116744, 143165287, 108510105, 158684790, 89544054, 143025749, 196852634, 158837162, 39286613],
        [71587172, 89478229, 161060726, 196843383, 200203195, 162249659, 106465689, 125340056, 193492582, 107658426, 124081494, 106325351, 176645717, 196847753, 109746586, 39286902],
        [105141860, 89478484, 178956678, 195729544, 233766347, 178961323, 143100042, 143309737, 177829479, 108706252, 106321237, 90596966, 162031205, 178947977, 127511211, 39221368],
        [88364644, 89478741, 179022199, 178952328, 215936203, 162249403, 194549897, 145407179, 212441242, 108702668, 108488021, 107374182, 142173798, 177769112, 144284331, 39221367],
        [88368996, 106255701, 181119368, 160991113, 180075194, 178952619, 195659640, 179035323, 212515499, 109755852, 107439718, 90597221, 142042999, 141003433, 127511210, 39217016],
        [71591780, 89478484, 163223670, 177969561, 178961083, 162175386, 212432744, 214748349, 213629610, 110804189, 124221318, 108426854, 142047367, 107444633, 110664104, 38233992],
        [70608996, 106321220, 145336437, 178956440, 179022506, 144283769, 212432469, 248237244, 232643516, 126598365, 123107191, 125269606, 159938424, 89548921, 92825189, 38238087],
        [71591780, 89544004, 128546917, 178887303, 178957244, 145262458, 195659605, 266058700, 234806750, 145407197, 124151655, 125273703, 159934072, 90666889, 108557653, 38233992],
        [71591780, 89478468, 127432805, 160991384, 178961323, 144283784, 194545527, 232582074, 251653581, 162249934, 108423015, 127371366, 160986743, 108423032, 143091029, 55015287],
        [71591780, 89478468, 125405541, 177768584, 177978026, 143231369, 176654456, 232565673, 268430813, 181189854, 109541241, 197621622, 126388091, 90597223, 126314069, 55011224],
        [88495955, 89478468, 125269845, 161060983, 180079530, 162105226, 176728713, 249277081, 268431086, 197971438, 126252697, 215578487, 128563899, 90601079, 159802982, 55015559],
        [71657299, 89478468, 125199957, 144279671, 198880169, 143231130, 162249096, 248228761, 268365550, 164425438, 125274250, 217745286, 127642573, 107382647, 158758758, 38172552],
        [71791954, 89478468, 124151365, 162039671, 195668632, 160991658, 180079528, 250460569, 251588317, 231603677, 162118621, 197892231, 126528700, 107378296, 142047094, 39155575],
        [71591494, 72701284, 141977205, 160987271, 179931529, 161061546, 180145355, 233688250, 249425646, 233758446, 144428509, 196856696, 125479883, 124151671, 143156871, 353911],
        [71722309, 72701524, 124147302, 160016295, 195660168, 194685354, 214748075, 249416908, 250535678, 266264286, 145612527, 197970584, 145468347, 125204087, 159946614, 353928],
        [72779077, 90527316, 124147301, 143230855, 196708487, 231451306, 214826445, 249421004, 250535662, 268365293, 161205999, 213699498, 127445947, 125204088, 161200519, 354424],
        [72779109, 106387028, 141977173, 142055559, 196782711, 249272764, 232644061, 249421277, 233762286, 268361437, 161066479, 213699497, 127515597, 124151655, 143374727, 288632],
        [90670948, 89478469, 141981285, 144349559, 180005256, 230262954, 250465757, 249355741, 249491181, 268430813, 194628847, 231525274, 144428254, 141977447, 161065624, 227192],
        [91780706, 89544005, 124159589, 144423544, 196774279, 213490107, 249421020, 250469853, 250544126, 268434926, 180079838, 214813626, 178965725, 143095673, 143178393, 157304],
        [90732389, 89548117, 158819942, 125352872, 213559704, 196774060, 232644044, 249421261, 250540031, 251588318, 180141277, 215800762, 161209820, 143095688, 143235224, 1382],
        [91785061, 90531190, 125200230, 125286824, 230328456, 177764235, 214687180, 249421260, 249425663, 267316717, 198041071, 196783018, 143449548, 143165320, 125339784, 1383],
        [92895076, 89548421, 124151686, 125278856, 178813064, 176719787, 214687180, 232644059, 250470110, 268365821, 182386430, 177773276, 146525644, 142117258, 125340072, 1143],
        [127493730, 108489093, 140928919, 125274246, 177768567, 211257803, 213704138, 231525836, 233758429, 251658238, 216002302, 161066188, 180014249, 142125740, 142120841, 358],
        [143226469, 126314104, 107378329, 124217223, 194545543, 196643244, 215866572, 249355484, 249421277, 267312879, 215871215, 178887099, 195874011, 143166137, 125270151, 6],
        [143095396, 143165544, 108423321, 142047366, 176851080, 211384492, 231525803, 232639963, 232775388, 267312878, 198045439, 178887082, 196791757, 144214186, 125270151, 4],
        [143165526, 160991350, 107448474, 163227766, 193505944, 161122185, 215796937, 232578780, 250469853, 268361182, 180154351, 228235673, 162253245, 143165833, 6780808],
        [142116709, 160991095, 107517850, 163219814, 160995735, 195860601, 214814410, 232574157, 233692894, 267316701, 180154367, 228104602, 144357804, 144349576, 5666680],
        [142116963, 194549896, 175601561, 163162231, 159946888, 162039945, 216845770, 249417421, 215936766, 249487053, 196997118, 210274969, 144354235, 144362120, 3635064],
        [143169654, 161192328, 125281946, 144353911, 161061256, 211318665, 231529947, 233692911, 215866590, 250404333, 179035903, 178878601, 126466475, 144222905, 22135],
        [143169637, 108644744, 175535463, 143243689, 126454152, 231307415, 214822348, 214818557, 233627100, 250469853, 198041070, 194685595, 160078281, 143174314, 18039],
        [143169670, 91724441, 178881877, 144280232, 124291208, 232564632, 231529949, 231526109, 233692636, 232713437, 178970093, 213564891, 178895801, 126392730, 102],
        [144284020, 90671528, 178812261, 180984488, 158824584, 214734728, 214748637, 248303308, 232644061, 232643789, 213638893, 197831644, 178961355, 109615785, 70],
        [161061509, 90601625, 144336470, 162109833, 143095944, 232630919, 215862477, 232643789, 215867101, 250469580, 197971167, 196922300, 178957499, 108501418],
        [161057125, 107383705, 144201062, 160995451, 142125432, 231512967, 232643806, 233688269, 215871229, 267316700, 214744269, 214682539, 180009931, 73894043],
        [177834357, 107444377, 144139622, 143170168, 125269895, 231516568, 216980940, 232648397, 214818270, 232718045, 198041053, 214682811, 180010188, 419737],
        [194545507, 107440537, 176649846, 144283769, 142046839, 215787911, 216002012, 250539741, 231529694, 232648429, 213700061, 231521211, 162188235, 91802],
        [194545509, 107444633, 177772662, 127445127, 126322551, 216910488, 232648429, 215941102, 249486556, 232578525, 196857054, 214747836, 162118604, 1128],
        [178817125, 124226203, 162175351, 126458248, 193562776, 249486793, 249560830, 231661294, 215997660, 214813917, 197905356, 215796683, 125409995, 5],
        [177768291, 142113451, 125483401, 161135016, 213621418, 267316956, 267321327, 231529965, 215871197, 214748381, 196861131, 214813627, 108566972, 1],
        [177833829, 160012971, 195529385, 197909418, 232565164, 267185918, 233828079, 214748365, 231525869, 196857053, 196857035, 181124284, 3635353],
        [159934310, 161061273, 159872938, 199023785, 250535372, 250609406, 250478590, 249417181, 233692639, 196922572, 213629884, 161135804, 18056],
        [143165542, 177903753, 144345227, 214822090, 267316701, 249561087, 233697006, 232709853, 214748365, 213630139, 195804091, 143235771, 87],
        [160991350, 177834104, 178890874, 231595467, 268431069, 268365823, 232648174, 215801309, 213700060, 196922300, 180140459, 108562874],
        [143099491, 162170775, 214543289, 250465228, 267382765, 233828095, 232713710, 214748366, 213629900, 196852940, 162249659, 5666969],
        [143099748, 178952344, 196852650, 249421004, 268435437, 249491183, 232713694, 214752732, 197971388, 196918203, 143236027, 153208],
        [143095652, 178952601, 214739370, 249421003, 250605294, 250540015, 214748638, 232578508, 213630173, 180075708, 143235498, 855],
        [144140132, 196848281, 213556155, 250535645, 267316974, 233762814, 232574429, 214748621, 197966779, 163298492, 91785353, 2],
        [143226486, 180009640, 231525308, 233692893, 250605549, 233692637, 214883805, 197901772, 213630139, 144288443, 88200],
        [143161222, 195799705, 214678698, 232713693, 249487085, 216985326, 213704140, 213629884, 214678203, 143165867, 71],
        [143161462, 195734169, 231587003, 232783325, 232648430, 213769438, 214682556, 214748347, 162254012, 73963912],
        [142051173, 196782745, 231525306, 249417181, 232709869, 196861389, 196852667, 196852667, 161065659, 288393],
        [142047076, 178956696, 214612667, 232644061, 231595741, 197971165, 196852668, 178956987, 127437210, 598],
        [158893941, 177908377, 232508347, 233692637, 215866589, 195874012, 196852667, 161196731, 5671048],
        [158824307, 178887065, 231521484, 215862732, 214752731, 196918203, 178961340, 144349626, 10104],
        [158828661, 195729833, 214748091, 231525580, 196856781, 195869627, 177978026, 92833945],
        [160991366, 179022489, 196852667, 214678476, 195738315, 178956987, 143235738, 1656],
        [144279686, 196782761, 197901260, 196852683, 179026876, 161127082, 6785433],
        [161061012, 196848042, 179026875, 196848314, 162245290, 144284057, 72],
        [159946887, 196848042, 178956971, 178956970, 161061546, 2185],
        [159942786, 178956953, 178891434, 162179754, 3704985],
        [159946885, 161061273, 161061273, 362649],
        [126387798, 74938231]],
    rowsLength: [14, 26, 34, 38, 44, 48, 52, 56, 60, 62, 66, 68, 70, 72, 75, 78, 80, 82, 84, 84, 86, 88, 90, 92, 92, 94, 96, 96, 98, 98, 100, 100, 102, 102, 104, 104, 104, 106, 106, 108, 108, 108, 108, 110, 110, 110, 110, 110, 110, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 110, 110, 110, 110, 110, 110, 108, 108, 108, 108, 106, 106, 104, 104, 104, 102, 102, 100, 100, 98, 98, 96, 96, 94, 92, 92, 90, 88, 86, 84, 83, 82, 80, 78, 75, 72, 70, 68, 66, 62, 60, 56, 52, 48, 44, 38, 34, 26, 14],
    rowsStart: [49, 43, 39, 37, 34, 32, 30, 28, 26, 25, 23, 22, 21, 20, 19, 17, 16, 15, 14, 14, 13, 12, 11, 10, 10, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 4, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10, 10, 11, 12, 13, 14, 14, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 28, 30, 32, 34, 37, 39, 43, 49],
    width: 112,
    height: 112
};
const getSunCalc = async () => {
    'use strict';
    const PI = Math.PI, sin = Math.sin, cos = Math.cos, tan = Math.tan, asin = Math.asin, atan = Math.atan2, acos = Math.acos, rad = PI / 180;
    const dayMs = 1000 * 60 * 60 * 24, J1970 = 2440588, J2000 = 2451545;
    const toJulian = (date) => { return date.valueOf() / dayMs - 0.5 + J1970; };
    const fromJulian = (j) => { return new Date((j + 0.5 - J1970) * dayMs); };
    const toDays = (date) => { return toJulian(date) - J2000; };
    const e = rad * 23.4397;
    const rightAscension = (l, b) => { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); };
    const declination = (l, b) => { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); };
    const azimuth = (H, phi, dec) => { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); };
    const altitude = (H, phi, dec) => { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); };
    const siderealTime = (d, lw) => { return rad * (280.16 + 360.9856235 * d) - lw; };
    const astroRefraction = (h) => {
        if (h < 0)
            h = 0;
        return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
    };
    const solarMeanAnomaly = (d) => { return rad * (357.5291 + 0.98560028 * d); };
    const eclipticLongitude = (M) => {
        const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), P = rad * 102.9372;
        return M + C + P + PI;
    };
    const sunCoords = (d) => {
        const M = solarMeanAnomaly(d), L = eclipticLongitude(M);
        return {
            dec: declination(L, 0),
            ra: rightAscension(L, 0)
        };
    };
    const getPosition = (date, lat, lng) => {
        const lw = rad * -lng, phi = rad * lat, d = toDays(date), c = sunCoords(d), H = siderealTime(d, lw) - c.ra;
        return altitude(H, phi, c.dec);
    };
    const times = [
        [-0.833, 'sunrise', 'sunset'],
        [-0.3, 'sunriseEnd', 'sunsetStart'],
    ];
    const J0 = 0.0009;
    const julianCycle = (d, lw) => { return Math.round(d - J0 - lw / (2 * PI)); };
    const approxTransit = (Ht, lw, n) => { return J0 + (Ht + lw) / (2 * PI) + n; };
    const solarTransitJ = (ds, M, L) => { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); };
    const hourAngle = (h, phi, d) => { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); };
    const observerAngle = (height) => { return -2.076 * Math.sqrt(height) / 60; };
    const getSetJ = (h, lw, phi, dec, n, M, L) => {
        const w = hourAngle(h, phi, dec), a = approxTransit(w, lw, n);
        return solarTransitJ(a, M, L);
    };
    const getTimes = (date, lat, lng, height) => {
        height = height || 0;
        const lw = rad * -lng, phi = rad * lat, dh = observerAngle(height), d = toDays(date), n = julianCycle(d, lw), ds = approxTransit(0, lw, n), M = solarMeanAnomaly(ds), L = eclipticLongitude(M), dec = declination(L, 0), Jnoon = solarTransitJ(ds, M, L);
        let i, len, time, h0, Jset, Jrise;
        const result = {
            solarNoon: fromJulian(Jnoon),
        };
        for (i = 0, len = times.length; i < len; i += 1) {
            time = times[i];
            h0 = (time[0] + dh) * rad;
            Jset = getSetJ(h0, lw, phi, dec, n, M, L);
            Jrise = Jnoon - (Jset - Jnoon);
            result[time[1]] = fromJulian(Jrise);
            result[time[2]] = fromJulian(Jset);
        }
        return result;
    };
    const moonCoords = (d) => {
        var L = rad * (218.316 + 13.176396 * d), M = rad * (134.963 + 13.064993 * d), F = rad * (93.272 + 13.229350 * d), l = L + rad * 6.289 * sin(M), b = rad * 5.128 * sin(F), dt = 385001 - 20905 * cos(M);
        return {
            ra: rightAscension(l, b),
            dec: declination(l, b),
            dist: dt
        };
    };
    const getMoonPosition = (date, lat, lng) => {
        const lw = rad * -lng, phi = rad * lat, d = toDays(date), c = moonCoords(d), H = siderealTime(d, lw) - c.ra, pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));
        let h = altitude(H, phi, c.dec);
        h = h + astroRefraction(h);
        return {
            azimuth: azimuth(H, phi, c.dec),
            altitude: h,
            distance: c.dist,
            parallacticAngle: pa
        };
    };
    const getMoonIllumination = (date) => {
        const d = toDays(date || new Date()), s = sunCoords(d), m = moonCoords(d), sdist = 149598000, phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)), inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)), angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
            cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));
        return {
            fraction: (1 + cos(inc)) / 2,
            phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
            angle: angle
        };
    };
    const hoursLater = (date, h) => {
        return new Date(date.valueOf() + h * dayMs / 24);
    };
    const getMoonTimes = function (date, lat, lng, inUTC) {
        const t = new Date(date);
        if (inUTC)
            t.setUTCHours(0, 0, 0, 0);
        else
            t.setHours(0, 0, 0, 0);
        const hc = 0.133 * rad;
        let h0 = getMoonPosition(t, lat, lng).altitude - hc;
        let h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;
        for (var i = 1; i <= 24; i += 2) {
            h1 = getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
            h2 = getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;
            a = (h0 + h2) / 2 - h1;
            b = (h2 - h0) / 2;
            xe = -b / (2 * a);
            ye = (a * xe + b) * xe + h1;
            d = b * b - 4 * a * h1;
            roots = 0;
            if (d >= 0) {
                dx = Math.sqrt(d) / (Math.abs(a) * 2);
                x1 = xe - dx;
                x2 = xe + dx;
                if (Math.abs(x1) <= 1)
                    roots++;
                if (Math.abs(x2) <= 1)
                    roots++;
                if (x1 < -1)
                    x1 = x2;
            }
            if (roots === 1) {
                if (h0 < 0)
                    rise = i + x1;
                else
                    set = i + x1;
            }
            else if (roots === 2) {
                rise = i + (ye < 0 ? x2 : x1);
                set = i + (ye < 0 ? x1 : x2);
            }
            if (rise && set)
                break;
            h0 = h2;
        }
        const result = {
            rise: undefined,
            set: undefined,
        };
        if (rise)
            result.rise = hoursLater(t, rise);
        if (set)
            result.set = hoursLater(t, set);
        if (!rise && !set)
            result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;
        return result;
    };
    return {
        getPosition,
        getTimes,
        getMoonIllumination,
        getMoonTimes
    };
};
(function () {
    getSunCalc().then((SunCalc) => {
        const colorsNames = {
            earth: 'earth',
            ocean: 'ocean',
            altEarth: 'altEarth',
            altOcean: 'altOcean',
        };
        const SECOND = 1000;
        const MINUTE = 60 * SECOND;
        const HOUR = 60 * MINUTE;
        const DAY = 24 * HOUR;
        const MOON_PHASES = DAY * 29.5306;
        const SPREAD = 40;
        const BODY_BORDER = 40;
        const SHADOW_TOLERANCE = .1;
        const LONGITUDE_CORRECTION = .03;
        const ORIGIN_SCALE = .85;
        let scale = ORIGIN_SCALE;
        const CELL_WORLD_LENGTH = 30;
        const MOON_MAX_INDEX = 7;
        const MOON_CELL = 15;
        const HEX_COLORS = {
            earth: {
                day: '#094e09',
                night: '#032703',
            },
            ocean: {
                day: '#072d07',
                night: '#061b06',
            },
            altEarth: {
                day: '#094B09',
                night: '#032503',
            },
            altOcean: {
                day: '#072C07',
                night: '#051A05',
            },
        };
        const worldCanvas = document.getElementById("worldCanvas");
        const worldContext = worldCanvas.getContext("2d");
        const moonCanvas = document.getElementById("moonCanvas");
        const moonContext = moonCanvas.getContext("2d");
        const worldImageData = new ImageData(world.width, world.height);
        const moonImageData = new ImageData(moon.width, moon.height);
        let now;
        let worldRecountTime;
        let moonRecountTime;
        let timeToDayEnd;
        let colors;
        const position = {
            latitude: 54.3258694,
            longitude: 18.6075532,
        };
        const celestialAnimationElem = document.getElementById('celestialAnimation');
        const sunriseElem = document.getElementById('sunrise');
        const solarNoonElem = document.getElementById('solarNoon');
        const sunsetElem = document.getElementById('sunset');
        const moonRiseElem = document.getElementById('moonRise');
        const moonRiseBoxElem = document.getElementById('moonRiseBox');
        const moonSetElem = document.getElementById('moonSet');
        const moonSetBoxElem = document.getElementById('moonSetBox');
        const timerElem = document.getElementById('timer');
        const updateNow = () => now = new Date();
        const getTime = (date) => {
            const getWithZero = (num) => num < 10 ? '0' + num : num.toString();
            const h = getWithZero(date.getHours());
            const m = getWithZero(date.getMinutes());
            const s = getWithZero(date.getSeconds());
            return `${h}:${m}:${s}`;
        };
        const countColors = () => {
            const hexToNumber = (hex) => {
                const r = parseInt(hex.substring(1, 3), 16);
                const g = parseInt(hex.substring(3, 5), 16);
                const b = parseInt(hex.substring(5, 7), 16);
                return { r, g, b };
            };
            const getHexToNumber = (kind) => ({
                day: hexToNumber(HEX_COLORS[kind].day),
                night: hexToNumber(HEX_COLORS[kind].night)
            });
            const result = {};
            const keys = Object.keys(HEX_COLORS);
            keys.forEach((key) => result[key] = getHexToNumber(key));
            return result;
        };
        const init = () => {
            celestialAnimationElem.style.width = ((SPREAD + world.width + SPREAD) * scale) + 'px';
            worldCanvas.width = world.width;
            worldCanvas.height = world.height;
            worldCanvas.style.width = (world.width * scale) + 'px';
            worldCanvas.style.height = (world.height * scale) + 'px';
            worldCanvas.style.left = (SPREAD * scale) + 'px';
            moonCanvas.width = moon.width;
            moonCanvas.height = moon.height;
            moonCanvas.style.width = (moon.width * scale) + 'px';
            moonCanvas.style.height = (moon.height * scale) + 'px';
            moonCanvas.style.left = '0px';
            moonCanvas.style.top = ((world.height - moon.height) * scale) + 'px';
            updateNow();
            worldRecountTime = Math.floor(DAY / (world.width * 2));
            moonRecountTime = Math.floor(MOON_PHASES / (moon.width * 2));
            timeToDayEnd = DAY - (now.getHours() * HOUR) - (now.getMinutes() * MINUTE) - (now.getSeconds() * SECOND) - now.getMilliseconds() + 500;
            colors = countColors();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((p) => {
                    position.latitude = p.coords.latitude;
                    position.longitude = p.coords.longitude;
                });
            }
            else {
                console.log("Geolocation is not supported by this browser.");
            }
            timerElem.style.left = (((world.width - 125 + SPREAD) * scale)) + 'px';
            timerElem.style.top = (((world.height - 50) * scale)) + 'px';
            timerElem.style.fontSize = (40 * scale) + 'px';
            const celestialTimesElem = document.querySelectorAll('.celestialTime');
            celestialTimesElem.forEach((e) => e.style.fontSize = (20 * scale) + 'px');
            const celestialIconsElem = document.querySelectorAll('.celestialIcon');
            celestialIconsElem.forEach((e) => {
                e.style.width = (40 * scale) + 'px';
                e.style.height = (30 * scale) + 'px';
            });
            const sunTimesElem = document.getElementById('sunTimes');
            sunTimesElem.style.left = ((world.width + SPREAD + SPREAD) * scale) + 'px';
        };
        const worldHeight = world.rowsLength.length;
        const worldCenterHeight = worldHeight / 2;
        const drawWorld = () => {
            const getColor = (altitude, earth, longitude) => {
                const countColor = (aquaTerra, altitude) => {
                    if (altitude > 0) {
                        if (altitude < SHADOW_TOLERANCE) {
                            const day = colors[aquaTerra].day;
                            const night = colors[aquaTerra].night;
                            const ratio = altitude / SHADOW_TOLERANCE;
                            const getGradient = (day, night) => Math.round(((day - night) * ratio) + night);
                            const r = getGradient(day.r, night.r);
                            const g = getGradient(day.g, night.g);
                            const b = getGradient(day.b, night.b);
                            return { r, g, b };
                        }
                        return colors[aquaTerra].day;
                    }
                    else
                        return colors[aquaTerra].night;
                };
                const colorAlt = longitude - (Math.floor(longitude / 20) * 20) > 10;
                if (earth) {
                    return countColor(colorAlt ? colorsNames.earth : colorsNames.altEarth, altitude);
                }
                return countColor(colorAlt ? colorsNames.ocean : colorsNames.altOcean, altitude);
            };
            for (let y = 0; y < worldHeight; ++y) {
                const rowStart = world.rowsStart[y];
                const latitude = ((y - worldCenterHeight) / worldHeight) * -180;
                const worldWidth = world.rowsLength[y];
                const worldCenterWidth = worldWidth / 2;
                for (let x = 0; x < worldWidth; ++x) {
                    const posCorrection = world.width * LONGITUDE_CORRECTION;
                    const longitude = ((x - worldCenterWidth + posCorrection) / worldWidth) * 360;
                    const altitude = SunCalc.getPosition(now, latitude, longitude);
                    let data = world.data[y][Math.floor(x / CELL_WORLD_LENGTH)] & 1 << x % CELL_WORLD_LENGTH;
                    const { r, g, b } = getColor(altitude, data > 0, longitude);
                    const pos = ((y * world.width) + x + rowStart) * 4;
                    worldImageData.data[pos] = r;
                    worldImageData.data[pos + 1] = g;
                    worldImageData.data[pos + 2] = b;
                    worldImageData.data[pos + 3] = 255;
                }
            }
            worldContext.putImageData(worldImageData, 0, 0);
        };
        const moonHeight = moon.rowsLength.length;
        const drawMoon = (now) => {
            moonContext.fillStyle = HEX_COLORS.earth.day;
            const radius = 56;
            moonContext.arc(radius, radius, radius, 0, 2 * Math.PI);
            moonContext.fill();
            const { phase } = SunCalc.getMoonIllumination(now);
            const shadowLeftSide = phase < .5;
            const shadow = shadowLeftSide ? phase * 2 : ((phase - .5) * 2);
            const getColor = (value, light) => {
                const getColor = (lowColor, heightColor) => {
                    const countColor = (colorFraction) => ((heightColor[colorFraction] - lowColor[colorFraction]) * (value / 255)) + lowColor[colorFraction];
                    const r = countColor('r');
                    const g = countColor('g');
                    const b = countColor('b');
                    return { r, g, b };
                };
                if (light) {
                    return getColor(colors.earth.night, colors.earth.day);
                }
                else {
                    return getColor(colors.ocean.night, colors.ocean.day);
                }
            };
            for (let y = 0; y < moonHeight; ++y) {
                const rowStart = moon.rowsStart[y];
                const moonWidth = moon.rowsLength[y];
                const shadowLength = moonWidth * shadow;
                for (let x = 0; x < moonWidth; ++x) {
                    const row = moon.data[y];
                    const move = (x % MOON_MAX_INDEX) * 4;
                    const bitArea = MOON_CELL << move;
                    let value = ((row[Math.floor(x / MOON_MAX_INDEX)] & bitArea) >>> move) * 15;
                    let light;
                    if (shadowLeftSide) {
                        light = moonWidth - shadowLength < x;
                    }
                    else {
                        light = moonWidth - shadowLength > x;
                    }
                    const color = getColor(value, light);
                    const pos = ((y * moon.width) + x + rowStart) * 4;
                    moonImageData.data[pos] = color.r;
                    moonImageData.data[pos + 1] = color.g;
                    moonImageData.data[pos + 2] = color.b;
                    moonImageData.data[pos + 3] = 255;
                }
            }
            moonContext.putImageData(moonImageData, 0, 0);
        };
        const setCelestialTimes = () => {
            const { solarNoon, sunrise, sunset } = SunCalc.getTimes(now, position.latitude, position.longitude, 17);
            sunriseElem.innerHTML = getTime(sunrise);
            solarNoonElem.innerHTML = getTime(solarNoon);
            sunsetElem.innerHTML = getTime(sunset);
            const { rise, set } = SunCalc.getMoonTimes(now, position.latitude, position.longitude, false);
            if (!!rise && !!set) {
                if (rise.getTime() < set.getTime()) {
                    moonRiseBoxElem.style.top = '0';
                    moonSetBoxElem.style.top = (30 * scale) + 'px';
                }
                else {
                    moonRiseBoxElem.style.top = (30 * scale) + 'px';
                    moonSetBoxElem.style.top = '0';
                }
            }
            if (!!rise && !set) {
                moonRiseBoxElem.style.top = '0';
                moonSetBoxElem.style.visibility = 'hidden';
            }
            if (!rise && !!set) {
                moonRiseBoxElem.style.visibility = 'hidden';
                moonSetBoxElem.style.top = '0';
            }
            if (!rise && !!rise) {
                moonRiseBoxElem.style.visibility = 'hidden';
                moonSetBoxElem.style.visibility = 'hidden';
            }
            moonRiseElem.innerHTML = rise ? getTime(rise) : '---';
            moonSetElem.innerHTML = set ? getTime(set) : '---';
        };
        init();
        celestialAnimationElem.addEventListener('click', () => {
            const redraw = () => {
                init();
                drawWorld();
                drawMoon(now);
                setCelestialTimes();
            };
            if (scale === ORIGIN_SCALE) {
                scale = window.innerWidth / (SPREAD + world.width + SPREAD + BODY_BORDER);
                celestialAnimationElem.style.height = (world.height * scale) + 20 + 'px';
                redraw();
            }
            else {
                scale = ORIGIN_SCALE;
                celestialAnimationElem.style.height = (world.height * scale) + 'px';
                redraw();
            }
        });
        drawWorld();
        setInterval(() => { updateNow(); drawWorld(); }, worldRecountTime);
        drawMoon(now);
        setInterval(() => { updateNow(); drawMoon(now); }, moonRecountTime);
        setCelestialTimes();
        setTimeout(() => {
            updateNow();
            setCelestialTimes();
            setInterval(() => { updateNow(); setCelestialTimes(); }, DAY);
        }, timeToDayEnd);
        const setTimerTime = () => timerElem.innerHTML = getTime(new Date());
        setTimerTime();
        let timerInterval;
        const setTimerTicking = () => setTimeout(() => {
            setTimerTime();
            timerInterval = setInterval(() => setTimerTime(), SECOND);
            setTimeout(() => {
                clearInterval(timerInterval);
                setTimerTicking();
            }, (10 * MINUTE) + (SECOND * .5));
        }, (SECOND * 1.005) - (new Date().getMilliseconds()));
        setTimerTicking();
    });
}());
const search = (function () {
    const MIN_LETTERS = 2;
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
    let finderElems = [];
    let finderList = [];
    const clearFinder = () => {
        finderElems.forEach(e => e.remove());
        finderElems = [];
        finderList = [];
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
            searcher.value = '';
            clearFinder();
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
                    message.innerHTML = `enter at least ${MIN_LETTERS} letters`;
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
    const onkeypress = (event) => {
        let value = event.target.value.toLowerCase();
        clearFinder();
        if (!!finder) {
            finder.style.width = '';
            finder.style.maxHeight = '400px';
        }
        if (!!finderOutput)
            finderOutput.style.maxHeight = '370px';
        if (value.length < MIN_LETTERS) {
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
