// Counter action types
export const INCREMENT = 'counter/increment';
export const DECREMENT = 'counter/decrement';
export const INCREMENT_BY_AMOUNT = 'counter/incrementByAmount';
export const INCREMENT_ASYNC = 'counter/incrementAsync';
export const DECREMENT_ASYNC = 'counter/decrementAsync';

// Sync action creators
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const incrementByAmount = (amount: number) => ({
  type: INCREMENT_BY_AMOUNT,
  payload: amount
});

// Async action creators (thunks)
export const incrementAsync = (amount: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount));
    }, 1000);
  };
};

export const decrementAsync = (amount: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(incrementByAmount(-amount));
    }, 1000);
  };
};
