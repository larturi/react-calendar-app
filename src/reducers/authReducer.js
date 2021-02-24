import { types } from "../types/types";

const initialState = {
    checking:  true,
};

export const authReducer = ( state = initialState, action  ) => {

    switch ( action.type ) {

        case types.authLogin:
            console.log('authLogin')
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            console.log('checkingFinish')
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            console.log('authLogout')
            return {
                checking: false
            }
    
        default:
            return state;
        
    }

};  