import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { value: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    increase(state, action) {
      state.value = state.value + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const { actions, reducer } = counterSlice;

export const { increment, decrement, increase, toggleCounter } = actions;

export default reducer;
