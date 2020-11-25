const setCacheAction = (data) => {
  return {
    type: "SET_CACHE",
    payload: data,
  };
};
function getCachedData(request, getState) {
  const cache = getState().cacheState.cache;
  request = Array.isArray(request) ? request.join() : request;
  return cache[request] ? cache[request] : null;
}
const setCacheThunkAction = (request, data) => (dispatch, getState) => {
  let { cache, cacheLength } = getState().cacheState;
  request = Array.isArray(request) ? request.join() : request;
  cache[request] = data;
  if (cacheLength.length < 10) {
    cacheLength = [...cacheLength, request];
  } else {
    delete cache[cacheLength[0]];
    cacheLength = [...cacheLength.slice(1), request];
  }
  dispatch(setCacheAction({ cache, cacheLength }));
};

const fetchCityRequestAction = () => {
  return {
    type: "FETCH_CITY_REQUEST",
  };
};
const fetchCitySuccessAction = (data) => {
  return {
    type: "FETCH_CITY_SUCCESS",
    payload: data,
  };
};
const fetchCityFailureAction = (data) => {
  return {
    type: "FETCH_CITY_FAILURE",
    payload: data,
  };
};
const fetchCityThunkAction = (service, id) => (dispatch, getState) => {
  const cachedData = getCachedData(id, getState);
  if (cachedData) {
    dispatch(fetchCitySuccessAction(cachedData));
  } else {
    dispatch(fetchCityRequestAction());
    service
      .getCity(id)
      .then((data) => {
        dispatch(fetchCitySuccessAction(data));
        dispatch(setCacheThunkAction(id, data));
      })
      .catch((error) => dispatch(fetchCityFailureAction(error)));
  }
};

const fetchWeeklyWeatherRequestAction = () => {
  return {
    type: "FETCH_WEEKLY_WEATHER_REQUEST",
  };
};
const fetchWeeklyWeatherSuccessAction = (data) => {
  return {
    type: "FETCH_WEEKLY_WEATHER_SUCCESS",
    payload: data,
  };
};
const fetchWeeklyWeatherFailureAction = (data) => {
  return {
    type: "FETCH_WEEKLY_WEATHER_FAILURE",
    payload: data,
  };
};
const fetchWeeklyWeatherThunkAction = (service) => (dispatch, getState) => {
  const { lat, lon } = getState().cityState.city.coord;
  const cachedData = getCachedData([lat, lon], getState);
  if (cachedData) {
    dispatch(fetchWeeklyWeatherSuccessAction(cachedData));
  } else {
    dispatch(fetchWeeklyWeatherRequestAction());
    service
      .getWeeklyWeather(lat, lon)
      .then((data) => {
        dispatch(fetchWeeklyWeatherSuccessAction(data.daily));
        dispatch(setCacheThunkAction([lat, lon], data.daily));
      })
      .catch((error) => dispatch(fetchWeeklyWeatherFailureAction(error)));
  }
};

export { fetchCityThunkAction, fetchWeeklyWeatherThunkAction, fetchWeeklyWeatherRequestAction };
