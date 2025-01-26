import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import { adminReducer } from './reducers/adminReducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin:adminReducer
  }
});

export default store;
