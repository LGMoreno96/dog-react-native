import thunk from "redux-thunk";
import reducer from "./reducer";
import { createStore, applyMiddleware, combineReducers } from "redux";

const rootReducer = combineReducers({ reducer });

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
export default store
