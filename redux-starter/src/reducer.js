import { BUG_ADDED, BUG_REMOVED } from './actionTypes'

let counter = 0

export default function reducer(state=[], action) {
    if (action.type === BUG_ADDED) {
        return [
            ...state,
            {
                id : counter++,
                description : action.payload.description,
                resolved : false
            }
        ]
    } else if (action.type === BUG_REMOVED) {
        return state.filter(bug => bug.id !== action.payload.id)
    }

    return state
}