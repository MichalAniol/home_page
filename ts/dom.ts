const dom = (function () {
    const byId = (id: string): HTMLElement | HTMLTextAreaElement | null => {
        return document.getElementById(id) as HTMLElement | HTMLTextAreaElement | null;
    }
    const byQuery = (query: string) => document.querySelector(query)
    const byQueryAll = (query: string) => document.querySelectorAll(query)
    const byQ = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, query: string) => elem.querySelector(query)
    const byQAll = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, query: string) => elem.querySelectorAll(query)

    type RecursiveHTMLElement<T> = {
        [K in keyof T]:
        T[K] extends string
        ? HTMLElement | HTMLTextAreaElement | null
        : T[K] extends string[]
        ? (HTMLElement | HTMLTextAreaElement | null)[]
        : T[K] extends object
        ? RecursiveHTMLElement<T[K]>
        : never;
    }

    const getAllById = <T extends Record<string, any>>(obj: T): RecursiveHTMLElement<T> => {
        const results = {} as RecursiveHTMLElement<T>;

        Object.keys(obj).forEach((key) => {
            const value = obj[key];

            if (typeof value === "string") {
                results[key as keyof T] = byId(value) as RecursiveHTMLElement<T>[keyof T];
            } else if (Array.isArray(value)) {
                results[key as keyof T] = value.map(id => byId(id)) as RecursiveHTMLElement<T>[keyof T];
            } else if (typeof value === "object" && value !== null) {
                results[key as keyof T] = getAllById(value) as RecursiveHTMLElement<T>[keyof T];
            }
        });

        return results;
    }

    const prepare = (node: Element | HTMLElement | HTMLImageElement | string, options?: {
        delete?: boolean,
        id?: string,
        classes?: string[],
        children?: HTMLElement[],
        src?: string,
        inner?: string,
        position?: { x: number, y: number },
    }) => {
        const elem: Element | HTMLElement | HTMLImageElement =
            typeof node === "string" ? document.createElement(node) : node

        if (elem && elem instanceof HTMLElement) {
            if (options.delete) {
                elem.remove()
                return
            }

            if (options?.id) elem.id = options.id
            options?.classes?.forEach((c) => elem.classList.add(c))
            options?.children?.forEach((c) => elem.appendChild(c))

            if (options?.src && elem instanceof HTMLImageElement) {
                elem.src = options.src
            }
            if (options?.inner) {
                elem.textContent = options.inner
            }
            if (options?.position) {
                elem.style.left = `${options.position.x}px`
                elem.style.top = `${options.position.y}px`
            }

            return elem
        }
    }

    type ModifiableCSSProperties = {
        [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends ((...args: any[]) => any) ? never : K]: string;
    }

    const setStyle = (element: HTMLElement, style: keyof ModifiableCSSProperties, value: string) => element.style[style as any] = value

    type StyleT = [element: HTMLElement, attribute: keyof ModifiableCSSProperties, value: string]
    type StylesT = StyleT[]
    const setAllStyles = (styles: StylesT) => styles.forEach((s: StyleT) => setStyle(s[0], s[1], s[2]))

    type AttributeNamesT = 'x' | 'y' | 'width' | 'height' | 'fill' | 'stroke' | 'stroke-width' | 'viewBox'
    const setAttribute = (element: Element | HTMLElement | SVGRectElement, attribute: AttributeNamesT, value: string) => element.setAttribute(attribute as any, value)

    type AttributeT = [element: Element | HTMLElement | SVGRectElement, attribute: AttributeNamesT, value: string]
    type AttributesT = AttributeT[]
    const setAllAttributes = (attributes: AttributesT) => attributes.forEach((a: AttributeT) => a[0].setAttribute(a[1], a[2]))

    const disable = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement) => elem.setAttribute('disabled', '')
    const enable = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement) => elem.removeAttribute('disabled')

    const check = (elem: HTMLInputElement) => elem.checked = true
    const uncheck = (elem: HTMLInputElement) => elem.checked = false

    const display = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, attribute: string) =>
        elem.style.display = attribute
    const setColor = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, color: string) =>
        elem.style.color = color
    const removeClass = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, attribute: string) =>
        elem.classList.remove(attribute)
    const addClass = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, attribute: string) =>
        elem.classList.add(attribute)

    const colors = {
        line: 'var(--line_color)',
        prime: 'var(--prime_color)',
        off1: 'var(--off_prime_color)',
        off2: 'var(--off_second_color)',
    } as const

    type EventNamesT = 'click' | 'input' | 'did-finish-load' | 'console-message' | 'change'
    const add = (elem: HTMLElement | HTMLInputElement | HTMLButtonElement, name: EventNamesT, fn: EventListenerOrEventListenerObject) => elem.addEventListener(name, fn)

    const xmlns = 'http://www.w3.org/2000/svg'
    type NsNamesT = 'rect'
    const newNS = (name: NsNamesT) => document.createElementNS(xmlns, 'rect')

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
    }
}())