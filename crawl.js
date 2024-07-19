import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    return `${urlObj.hostname}/${urlObj.pathname.replaceAll('/','')}`
}

function getURLsFromHTML(html, baseURL) {
    const links = []
    const htmljsdom = new JSDOM(html)
    const anchors = htmljsdom.window.document.querySelectorAll('a')

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')
            try {
                href = new URL(href, baseURL).href
                links.push(href)
            } catch (error) {
                console.log(`${error.message}: ${href.hostname}`)
            }
        }
    }

    return links
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const currObj = new URL(currentURL)
    const baseObj = new URL(baseURL)
    if (currObj.hostname !== baseObj.hostname) {
        return pages
    }

    const normURL = normalizeURL(currentURL)

    if (normURL in pages) {
        pages[normURL]++
        return pages
    }
    pages[normURL] = 1

    let html = ''
    try {
        html = await fetchHTML(currentURL)
    } catch (err) {
        console.log(`${err.message}`)
        return pages
    }
    
    let links = getURLsFromHTML(html, baseURL)

    for (const link of links) {
        pages = await crawlPage(baseURL, link, pages)
    }

    return pages
}

async function fetchHTML(currentURL) {
    let response
    try {
        response = await fetch(currentURL)
    } catch (error) {
        throw new Error(`Network error: ${error.message}`)
    }

    if (response.status >= 400) {
        throw new Error(`Status code error: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        throw new Error(`Content-type not "text/html": ${contentType}`)
        return
    }

    return response.text()
}

export { normalizeURL, getURLsFromHTML, crawlPage };