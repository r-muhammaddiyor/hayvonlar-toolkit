import { configureStore } from '@reduxjs/toolkit';
import animalReducer from '../slices/animalSlice';

export const store = configureStore({
  reducer: {
    animals: animalReducer,
  },
});
