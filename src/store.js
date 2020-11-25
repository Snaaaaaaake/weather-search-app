import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import cityReducer from "./reducers/cityReducer";
import cityWeeklyWeatherReducer from "./reducers/cityWeeklyWeatherReducer";
import cacheReducer from "./reducers/cacheReducer";

const store = createStore(
  combineReducers({
    cityState: cityReducer,
    cityWeeklyWeatherState: cityWeeklyWeatherReducer,
    cacheState: cacheReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
