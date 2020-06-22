import { compose, pipe } from 'lodash/fp'

// functions
const trim = str => str.trim()
const wrapInDiv = str => `<div>${str}</div>`
const toLowerCase = str => str.toLowerCase()

// composing functions
const transform = compose(wrapInDiv, toLowerCase, trim) // need to read from right to left

const newTransform = pipe(trim, toLowerCase, wrapInDiv) // read in order of execution

const result = transform('My Input')
const newResult = newTransform('My Input')

// The concept of currying
// take a fn with N params and make a fn wich takes 1 param
function add(a, b) {
    return a + b
}

// currying add
function curryAdd(a) {
    return function(b) {
        return a + b
    }
}

const result = curryAdd(1)(5) // instead of seperating params by commas seperate by paranthesis

// the full thing in arrows
const curry = a => b => a + b

// curry the wrap function
const wrap = type => str => `<${type}>${str}</${type}>`

// piping
const pipeTransform = pipe(trim, toLowerCase, wrap("div")) // since wrap("div") returns a function