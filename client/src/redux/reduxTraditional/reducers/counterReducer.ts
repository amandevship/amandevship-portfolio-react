import {
  INCREMENT,
  DECREMENT,
  INCREMENT_BY_AMOUNT,
  INCREMENT_ASYNC,
  DECREMENT_ASYNC,
  INCREMENT_ASYNC_SUCCESS,
  DECREMENT_ASYNC_SUCCESS
} from '../actions/counterActions';

// Counter state interface
export interface CounterState {
  value: number;
  isLoading: boolean;
}

// Initial state
const initialState: CounterState = {
  value: 0,
  isLoading: false
};

// Counter reducer
export const counterReducer = (
  state = initialState,
  action: any
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1
      };
    
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1
      };
    
    case INCREMENT_BY_AMOUNT:
      return {
        ...state,
        value: state.value + action.payload
      };
    
    case INCREMENT_ASYNC:
    case DECREMENT_ASYNC:
      return {
        ...state,
        isLoading: true
      };

    case INCREMENT_ASYNC_SUCCESS:
    case DECREMENT_ASYNC_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    
    default:
      return state;
  }
};
