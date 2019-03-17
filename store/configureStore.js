import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import {middleware} from "../navigation/AppNavigator";
import navReducer from "./reducers/nav";
import uiReducer from "./reducers/ui";
import authReducer from "./reducers/auth";
import userReducer from "./reducers/user";
import lockUpsReducer from './reducers/lockUps';
import healthyFoodsReducer from './reducers/healthy-foods';
import physicalTrainingReducer from './reducers/physical-trainings';

const rootReducer = combineReducers({
    nav: navReducer,
    ui: uiReducer,
    auth: authReducer,
    user: userReducer,
    lockUps: lockUpsReducer,
    healthyFoods: healthyFoodsReducer,
    physicalTraining: physicalTrainingReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(middleware), applyMiddleware(thunk)));
};

export default configureStore;
