import { combineReducers } from 'redux';
import { counterReducer, CounterState } from './counterReducer';

// Root state interface
export interface RootState {
  counter: CounterState;
}

// Combine all reducers
export const rootReducer = combineReducers({
  counter: counterReducer
});
