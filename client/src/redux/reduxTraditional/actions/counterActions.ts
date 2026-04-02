// Counter action types
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';
export const INCREMENT_ASYNC = 'counter/incrementAsync';
export const DECREMENT_ASYNC = 'counter/decrementAsync';
export const INCREMENT_ASYNC_SUCCESS = 'counter/incrementAsyncSuccess';
export const DECREMENT_ASYNC_SUCCESS = 'counter/decrementAsyncSuccess';

// Sync action creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const incrementByAmount = (amount: number) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount
});

// Async action creators (for saga)
export const incrementAsync = (amount: number) => ({
  type: INCREMENT_ASYNC,
  payload: amount
});

export const decrementAsync = (amount: number) => ({
  type: DECREMENT_ASYNC,
  payload: amount
});

// Success action creators
export const incrementAsyncSuccess = () => ({ type: INCREMENT_ASYNC_SUCCESS });
export const decrementAsyncSuccess = () => ({ type: DECREMENT_ASYNC_SUCCESS });
