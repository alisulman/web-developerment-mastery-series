import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  matchNumbers: [],
  matchOperators: [],
  result: '',
  status: '',
  history: []
};

const createReducer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setError(state, actions) {
      state.isLoading = false;
      state.isError = actions.payload;
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
        state.isLoading = false
        state.result = actions.payload
    },
    setStatus(state, actions){
        state.isLoading = false
        state.status = actions.payload
    },
    setHistory(state, actions){
        state.isLoading = false
        state.history = actions.payload
    }
  },
});

export const { setLoading, setMatchNumbers, setMatchOperators, setError, setResult, setStatus, setHistory } =
  createReducer.actions;

export default createReducer.reducer;
