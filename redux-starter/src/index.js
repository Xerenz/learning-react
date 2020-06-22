import store from './store'

// subscribing to a store
// basically refresh or re render app
const unsubcribe =  store.subscribe(() => {

    // this function executes whenever the state of the store changes

    console.log("Store changed!", store.getState())
})

// dispatch an action
store.dispatch({
    type : 'bugAdded',
    payload : {
        description : 'Bug1'
    }
})

unsubcribe() // after this is called the UI won't be notified of the change

// dispatch another action
store.dispatch({
    type : 'bugRemoved',
    payload : {
        id : 0
    }
})

console.log(store.getState());