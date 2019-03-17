
import {ALL_COUNTRIES, ALL_CITIES, LANGUAGES, GET_PAYMENT_METHODS ,GET_DELIVERY_METHODS} from  "../actions/actionTypes";
const initialState = {
    countries :[],
    cities :[],
    languages :[],
    paymentMethods:[],
    deliveryMethods:[]
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case ALL_COUNTRIES:
            return {
                ...state,
                countries: action.countries
            };
        case ALL_CITIES:
         return {
                ...state,
                cities: action.cities
            };
        case LANGUAGES :
         return {
                ...state,
                languages: action.languages
            };
        case GET_PAYMENT_METHODS:
            return {
                ...state,
                paymentMethods: action.paymentMethods
            }
        case GET_DELIVERY_METHODS:
            return {
                ...state,
                deliveryMethods: action.deliveryMethods
            }
       default:
            return state;
    }
}
export default reducer;