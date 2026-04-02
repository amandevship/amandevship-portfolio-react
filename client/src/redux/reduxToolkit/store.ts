import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import counterReducer from './slices/counterSlice';

// Create store with Redux Toolkit
export const toolkitStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Infer types from store
export type ToolkitRootState = ReturnType<typeof toolkitStore.getState>;
export type ToolkitAppDispatch = typeof toolkitStore.dispatch;

// Custom hooks for Redux Toolkit
export const useToolkitAppDispatch = () => useDispatch<ToolkitAppDispatch>();
export const useToolkitAppSelector: TypedUseSelectorHook<ToolkitRootState> = useSelector;
