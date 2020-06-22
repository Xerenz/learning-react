import { BUG_ADDED } from './actionTypes'

export const bugAdded = description => {
    return {
        type : BUG_ADDED,
        payload : {
            description : description
        }
    }
}