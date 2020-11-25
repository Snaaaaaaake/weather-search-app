const initialState = {
  cache: {},
  cacheLength: [],
};

export default function cacheReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CACHE":
      return {
        cache: action.payload.cache,
        cacheLength: action.payload.cacheLength,
      };
    default:
      return state;
  }
}
