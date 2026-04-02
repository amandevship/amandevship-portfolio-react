// Store Factory - Returns appropriate store based on configuration
import { REDUX_CONFIG } from './config';
import { store as reduxStore } from './reduxTraditional/store';
import { toolkitStore as reduxToolkitStore } from './reduxToolkit/store';

export const getActiveStore = () => {
  return REDUX_CONFIG.isReduxToolkit ? reduxToolkitStore : reduxStore;
};

export const getStoreInfo = () => {
  return {
    implementation: REDUX_CONFIG.isReduxToolkit ? 'Redux Toolkit' : 'Redux + Redux Thunk',
    isReduxToolkit: REDUX_CONFIG.isReduxToolkit,
  };
};
