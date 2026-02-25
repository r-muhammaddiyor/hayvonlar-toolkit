import { createSlice } from '@reduxjs/toolkit';
import {animals} from '../data/data.json';

const animalSlice = createSlice({
  name: 'animals',
  initialState: animals,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },

    remove: (state, action) => {
      return state.filter((a) => a.id !== action.payload);
    },

    edit: (state, action) => {
      return state.map((a) => (a.id === action.payload.id ? action.payload : a));
    },
  },
});

export const { add, remove, edit } = animalSlice.actions;
export default animalSlice.reducer;
