import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"

async function main() {
const argsLength = process.argv.length
if (argsLength < 3) {
    console.log('No baseURL entered, please enter a base URL as an arguement')
    return
} else if (argsLength > 3) {
    console.log('Too many arguements entered. Please enter "npm run start baseURL"')
    return
}
    const baseURL = process.argv[2]
    console.log(`Starting web crawler at ${baseURL}`)
    let pages = await crawlPage(baseURL)
    console.log('')
    printReport(pages)
}


main()