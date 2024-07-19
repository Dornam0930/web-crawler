function printReport(pages) {
    console.log('Report is starting:')
    const sortedPages = sortReport(pages)
    for (let page of sortedPages) {
        if (page[1] > 1) {
            console.log(`Found ${page[1]} internal link to ${page[0]}`)    
        }
        else {
            console.log(`Found ${page[1]} internal links to ${page[0]}`)
        }
    }
}

function sortReport(pages) {
    const sortedPages = Object.entries(pages).sort(([,a],[,b]) => a - b)
    return sortedPages.reverse()
}

export { printReport }