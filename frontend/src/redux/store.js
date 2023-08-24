import {
  legacy_createStore,
  compose,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import UserReducer from "./user/user.reducer";
import BlogReducer from "./blogs/blog.reducer";

const rootReducer = combineReducers({
  userManager: UserReducer,
  blogManager: BlogReducer,
});

const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  comp(applyMiddleware(thunk))
);
