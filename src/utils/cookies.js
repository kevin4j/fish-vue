import Cookies from "js-cookie";

/**
 * @param key
 * @param value
 * @param expires   (days)
 * @returns {*}
 */
export function setCookie(key,value,expires) {
    return Cookies.set(key, value,{ expires: expires})
}

export function getCookie(key) {
    return Cookies.get(key)
}

export function removeCookie(key) {
    return Cookies.remove(key)
}

export function getAll() {
    return Cookies.get()
}