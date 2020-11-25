const initialState = {
  cityWeeklyWeather: null,
  isLoading: true,
  error: null,
};

export default function cityWeeklyWeatherReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_WEEKLY_WEATHER_REQUEST":
      return {
        cityWeeklyWeather: null,
        isLoading: true,
        error: null,
      };
    case "FETCH_WEEKLY_WEATHER_SUCCESS":
      return {
        cityWeeklyWeather: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_WEEKLY_WEATHER_FAILURE":
      return {
        cityWeeklyWeather: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
