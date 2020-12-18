import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import throttle from "lodash/throttle";
import Reducer from './reducer';
import {
    loadState,
    saveState
} from "../utils/localStorage";

const persistedState = loadState();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(Reducer, persistedState);

store.subscribe(throttle(() => {
    saveState({
        token: store.getState().token,
        user_id: store.getState().user_id,
        cartItems: store.getState().cartItems
    });
}, 300));

export default store;
