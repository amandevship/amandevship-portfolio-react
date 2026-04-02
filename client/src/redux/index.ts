import { REDUX_CONFIG } from './config';

// Import both implementations
import {
  store,
  useAppDispatch as classicUseAppDispatch,
  useAppSelector as classicUseAppSelector,
  RootState,
  AppDispatch,
} from './reduxTraditional/store';
import {
  toolkitStore,
  useToolkitAppDispatch,
  useToolkitAppSelector,
  ToolkitRootState,
  ToolkitAppDispatch,
} from './reduxToolkit/store';
import * as classicActions from './reduxTraditional/actions/counterActions';
import * as toolkitActions from './reduxToolkit/slices/counterSlice';

// Active store and hooks based on config
export const activeStore = REDUX_CONFIG.isReduxToolkit ? toolkitStore : store;

export const useAppDispatch = REDUX_CONFIG.isReduxToolkit ? useToolkitAppDispatch : classicUseAppDispatch;
export const useAppSelector = REDUX_CONFIG.isReduxToolkit ? useToolkitAppSelector : classicUseAppSelector;

// For static typing, we can use union types here because runtime selection is controlled separately
export type RootStateType = ToolkitRootState | RootState;
export type AppDispatchType = ToolkitAppDispatch | AppDispatch;

// Runtime API state hints
export type ActiveRootState = RootStateType;
export type ActiveAppDispatch = AppDispatchType;

// Export both implementations for reference
export { store } from './reduxTraditional/store';
export type { RootState, AppDispatch } from './reduxTraditional/store';
export { toolkitStore } from './reduxToolkit/store';
export type { ToolkitRootState, ToolkitAppDispatch } from './reduxToolkit/store';

// Re-export actions based on config (dynamic branch)
export const increment = REDUX_CONFIG.isReduxToolkit ? toolkitActions.increment : classicActions.increment;
export const decrement = REDUX_CONFIG.isReduxToolkit ? toolkitActions.decrement : classicActions.decrement;
export const incrementByAmount = REDUX_CONFIG.isReduxToolkit ? toolkitActions.incrementByAmount : classicActions.incrementByAmount;
export const incrementAsync = REDUX_CONFIG.isReduxToolkit ? toolkitActions.incrementAsync : classicActions.incrementAsync;
export const decrementAsync = REDUX_CONFIG.isReduxToolkit ? toolkitActions.decrementAsync : classicActions.decrementAsync;
