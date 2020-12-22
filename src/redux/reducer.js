
const initialState = {
}

const reducer = (state = initialState, action) => {

    const newState = { ...state };

    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, cartItems: Array.from(new Set([...state.cartItems, action.payload.ele])) }

        case 'RESET_CART':
            console.log(("hcsucbsjfgsjfg"));
            return { ...state, cartItems: [] }

        case 'DELETE_FROM_CART':
            return { ...state, cartItems: state.cartItems.filter(item => item !== action.payload.ele) }

        case 'SAVE_TOKEN':
            return { ...state, token: action.payload.token, user_id: action.payload.user_id, cartItems: action.payload.cartItems }

        case 'CALCULATE_PAYMENT_AMOUNT':
            let amount = 0;
            state.cartItems.forEach(ele => {
                amount = amount + ele.minPrice
            });
            return { ...state, paymentAmount: amount }

        case 'LOGOUT':
            localStorage.clear();
            return initialState
        default:
            return newState;
    }
}

export default reducer;