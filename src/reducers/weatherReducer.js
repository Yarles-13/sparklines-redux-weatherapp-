import { FETCH, SUCCESS, ERROR } from '../actions/weatherActions';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true, error: null };
    case SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}
