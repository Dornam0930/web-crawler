function normalizeURL(url) {
    const urlObj = new URL(url)
    return `${urlObj.hostname}/${urlObj.pathname.replaceAll('/','')}`
}

export { normalizeURL };