import { AppDispatch } from '../store';
import { 
  incrementByAmount,
  incrementByAmount as decrementByAmount 
} from '../actions/counterActions';

/**
 * Thunk action creators for async operations
 * These work with Redux-Thunk middleware for handling asynchronous logic
 * Alternative to Redux-Saga for simpler async operations
 */

// Async increment thunk
export const incrementAsyncThunk = (amount: number) => {
  return (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 1000);
  };
};

// Async decrement thunk
export const decrementAsyncThunk = (amount: number) => {
  return (dispatch: AppDispatch) => {
    setTimeout(() => {
      dispatch(decrementByAmount(-amount));
    }, 1000);
  };
};

// Simulated API call thunk
export const incrementAsyncFromAPI = (amount: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      // Simulate API call
      const response = await new Promise<number>((resolve) => {
        setTimeout(() => {
          resolve(amount);
        }, 1500);
      });
      
      dispatch(incrementByAmount(response));
    } catch (error) {
      console.error('Error fetching increment value:', error);
    }
  };
};

// Simulated batch increment thunk
export const incrementByBatchThunk = (batches: number, delayPerBatch: number = 500) => {
  return (dispatch: AppDispatch) => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      dispatch(incrementByAmount(1));
      
      if (count >= batches) {
        clearInterval(interval);
      }
    }, delayPerBatch);
  };
};
