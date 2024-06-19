import { jest } from "@jest/globals";
import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

const rootURL = 'https://blog.boot.dev'
const testBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>'
const testBody2 = '<html><body><a href="/one"><span>Go to Boot.dev/one</span></a><a href="/two"><span>Go to Boot.dev/two</span></a></body></html>'
const testBody3 = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="/one"><span>Go to Boot.dev/one</span></a></body></html>'

test('normalizes https://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
})

test('normalizes https://blog.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
})

test('normalizes http://blog.boot.dev/path/ to blog.boot.dev/path', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
})

test('normalizes http://blog.boot.dev/path to blog.boot.dev/path', () => {
    expect(normalizeURL('http://BLOG.boot.dev/path')).toBe('blog.boot.dev/path');
})

test('getURLsFromHTML absolute', () => {
    const testURL = rootURL + '/'
    expect(getURLsFromHTML(testBody, rootURL)).toEqual([testURL]);
})

test('getURLsFromHTML relative', () => {
    const testURL = rootURL + '/one'
    const testURL2 = rootURL + '/two'
    expect(getURLsFromHTML(testBody2, rootURL)).toEqual([testURL, testURL2]);
})

test('getURLsFromHTML mixed', () => {
    const testURL = rootURL + '/'
    const testURL2 = rootURL + '/one'
    expect(getURLsFromHTML(testBody3, rootURL)).toEqual([testURL, testURL2]);
})