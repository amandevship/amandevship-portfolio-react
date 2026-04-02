import { fork } from 'redux-saga/effects';
import { counterSaga } from './counterSaga';

// Root saga that combines all sagas
export function* rootSaga() {
  yield fork(counterSaga);
}
