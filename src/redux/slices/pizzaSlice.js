import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchPizza = createAsyncThunk("pizza/fetchPizzaStatus", async (params) => {
  const { order, sortBy, category, search } = params;
  const res = await axios.get(
    `https://65aaadff081bd82e1d978bf3.mockapi.io/items?${category}&sortby=${sortBy}&order=${order}${search}`
  );
  return res.data;
});

const initialState = {
  items: [],
  status: '',
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const selectPizzaData = (state) => state.pizza;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
