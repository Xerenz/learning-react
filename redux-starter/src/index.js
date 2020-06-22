import { Map } from 'immutable'

// makes an immutable object
let book = Map({ name : "Harry Potter" })

const publish = book => {
    return book.set("isPublished", true) // an asynchronous method
}

book = publish(book)

import { produce } from 'immer'

let murakamiBook = { title : "Norwegian woods"}

const publishMurakami = book => {
    return produce(book, draft => {
        draft.isPublished = true;
    })
}

murakamiBook = publishMurakami(murakamiBook)

console.log(murakamiBook)