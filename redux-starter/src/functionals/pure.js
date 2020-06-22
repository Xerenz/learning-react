// pure functions
// functions which donot depend on a global state

const minAge = 13

const checkAge = age => age >= minAge // not a pure function
const checkAgePure = (age, minAgePure) => age >= minAgePure // pure function as all variables which the function requires is in the scope

// pure functions donot change any data

// working with objects
const info = { name : "Martin" }
// make a copy of the object 
const newInfo = { ...info, name : "Alan" }

// for nested objects
const someInfo = {
    name : "Martin", 
    address : {
        state : "Haryana",
        city : "Faridabad"
    }
}

const newSomeInfo = {
    ...someInfo,
    address : { ...someInfo.address, city : "Kottayam" },
    name : "Alan"
}

// working with arrays

const numbers = [1, 2, 3, 4]
const copyNumbers = [...numbers, 5] // add back
const frontCopy = [5, ...numbers] // add front
const somewhereInBetween = [...numbers.slice(0, 2), 5, ...numbers.slice(2)]

// map, filter and indexOf

const index = numbers.indexOf(2)
const squares = numbers.map(n => n*n)
const not2 = numbers.filter(n => n !== 2)