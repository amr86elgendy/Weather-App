import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_WEATHER') {
    const { main: {temp, temp_min, temp_max}, name,weather } = action.payload;

    return {
      ...state,
      name,
      temp,
      temp_min,
      temp_max,
      icon: weather[0].icon,
      description: weather[0].description,
    };
  }

  if (action.type === 'SET_ERROR') {
    return { ...state, error: action.payload }
  }

  if (action.type === 'CLEAN_STATE') {
    return {
      ...state,
      name: '',
      temp: 0,
      temp_min: 0,
      temp_max: 0,
      description: '',
      icon: '',
      error: null,
    };
  }

  return {...state};
};

const initialState = {
  name: '',
  temp: 0,
  temp_min: 0,
  temp_max: 0,
  description: '',
  icon: '',
  error: null
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
