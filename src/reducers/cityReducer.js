const initialState = {
  city: null,
  isLoading: false,
  error: null,
};

export default function cityReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CITY_REQUEST":
      return {
        city: null,
        isLoading: true,
        error: null,
      };
    case "FETCH_CITY_SUCCESS":
      return {
        city: action.payload,
        isLoading: false,
        error: null,
      };
    case "FETCH_CITY_FAILURE":
      return {
        city: null,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
