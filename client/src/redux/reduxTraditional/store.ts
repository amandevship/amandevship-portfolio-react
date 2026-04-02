import { createStore, applyMiddleware } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers/index';
import { rootSaga } from './sagas/rootSaga';
import { reduxTraditionalConfig } from './config';

// Create saga middleware only if enabled in config
const sagaMiddleware = reduxTraditionalConfig.isSagaEnabled 
  ? createSagaMiddleware() 
  : null;

// Create store with appropriate middleware
const middlewares = [thunk];
if (sagaMiddleware) {
  middlewares.push(sagaMiddleware);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Run saga if enabled in config
if (sagaMiddleware) {
  sagaMiddleware.run(rootSaga);
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
