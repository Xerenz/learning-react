import store from './store'
import { BUG_ADDED, BUG_REMOVED, BUG_RESOLVED } from './actionTypes'

// subscribing to a store
// basically refresh or re render app
const unsubcribe =  store.subscribe(() => {

    // this function executes whenever the state of the store changes

    console.log("Store changed!", store.getState())
})

// dispatch an action
store.dispatch({
    type : BUG_ADDED,
    payload : {
        description : 'Bug1'
    }
})

store.dispatch({
    type : BUG_RESOLVED,
    payload : {
        id : 0
    }
})

unsubcribe() // after this is called the UI won't be notified of the change

// dispatch another action
store.dispatch({
    type : BUG_REMOVED,
    payload : {
        id : 0
    }
})

console.log(store.getState());