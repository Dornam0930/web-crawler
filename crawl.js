import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    return `${urlObj.hostname}/${urlObj.pathname.replaceAll('/','')}`
}

function getURLsFromHTML(htmlbody, html) {
    const links = []
    const hmtljsdom = new JSDOM(htmlbody)
    const anchors = hmtljsdom.window.document.querySelectorAll('a')

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')
            console.log(`anchor href: ${href}`)
            try {
                href = new URL(href, html).href
                console.log(`URL.href: ${href}`)
                links.push(href)
            } catch (error) {
                console.log(`${error.message}: ${href.hostname}`)
            }
        }
    }

     return links
}

export { normalizeURL, getURLsFromHTML };