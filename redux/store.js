import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxPromise from "redux-promise";

//----REDUCERS
import UserReducer from "./user/user.reducer";
import UiReducer from "./UI/ui.reducer";

const rootReducer = combineReducers({
  auth: UserReducer,
  UI: UiReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

export default store;
