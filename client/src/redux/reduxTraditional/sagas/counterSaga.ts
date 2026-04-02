import { put, takeEvery, delay } from 'redux-saga/effects';
import {
  INCREMENT_ASYNC,
  DECREMENT_ASYNC,
  incrementByAmount,
  incrementAsyncSuccess,
  decrementAsyncSuccess
} from '../actions/counterActions';

// Worker saga for async increment
function* handleIncrementAsync(action: any) {
  try {
    yield delay(1000);
    yield put(incrementByAmount(action.payload));
    yield put(incrementAsyncSuccess());
  } catch (error) {
    console.error('Error in increment async saga:', error);
  }
}

// Worker saga for async decrement
function* handleDecrementAsync(action: any) {
  try {
    yield delay(1000);
    yield put(incrementByAmount(-action.payload));
    yield put(decrementAsyncSuccess());
  } catch (error) {
    console.error('Error in decrement async saga:', error);
  }
}

// Watcher saga for counter actions
export function* counterSaga() {
  yield takeEvery(INCREMENT_ASYNC, handleIncrementAsync);
  yield takeEvery(DECREMENT_ASYNC, handleDecrementAsync);
}
