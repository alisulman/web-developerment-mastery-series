import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  matchNumbers: [],
  matchOperators: [],
  result: "",
  status: "",
  history: [],
  clickCount: 0,
};

const createReducer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setMatchNumbers(state, actions) {
      state.isLoading = false;
      state.matchNumbers = actions.payload;
    },
    setMatchOperators(state, actions) {
      state.isLoading = false;
      state.matchOperators = actions.payload;
    },
    setResult(state, actions) {
      state.isLoading = false;
      state.result = actions.payload;
    },
    setStatus(state, actions) {
      state.isLoading = false;
      state.status = actions.payload;
    },
    setClickCount(state, actions) {
      state.isLoading = false;
      state.clickCount = actions.payload;
    },
    setHistory(state, actions) {
      state.isLoading = false;
      state.history = actions.payload;
    },
  },
});

export const {
  setLoading,
  setMatchNumbers,
  setMatchOperators,
  setError,
  setResult,
  setStatus,
  setHistory,
  setClickCount,
} = createReducer.actions;

export default createReducer.reducer;
