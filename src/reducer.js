export const initialState = {
    basket: [],
    user: null,
    products: [],
    search: [],
    country: ''
}
export const getBasketTotal = (basket) => {
    return basket?.reduce((amount, item) => item.price + amount, 0);
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'REMOVE':
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.item.id)
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);
            }
            else {
                console.warn(
                    `Cant remove product ( id: ${action.item.id}) as its not in basket!`
                )
            }
            return {
                ...state,
                basket: newBasket
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'PRODUCTS':
            return {
                ...state,
                products: action.products
            }
        case 'SEARCH':
            return {
                ...state,
                search: state.products.filter(item => item.title.toLowerCase().includes(action.search))
            }
        case 'LOCATION':
            return {
                ...state,
                location: action.location
            }
        case 'EMPTY':
            return {
                ...state,
                basket: []
            }
        default:
            return state;
    }
};
export default reducer;