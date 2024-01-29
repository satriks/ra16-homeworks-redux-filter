import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Data, FIlter, IsRedact } from "../models/models";

interface DataState {
  data: Data[];
  isRedact: IsRedact;
  filter: FIlter;
}

const data: DataState = {
  data: [],
  isRedact: { id: "", redact: false },
  filter: { filterData: [], isFilter: false, filterText: "" },
};

const dataSlice = createSlice({
  name: "data",
  initialState: data,
  reducers: {
    addData(state, action) {
      if (action.payload.name && action.payload.price) {
        state.data.push({
          id: v4(),
          name: action.payload.name,
          price: action.payload.price,
        });
      }
    },

    changeData(state, action) {
      const current = state.data.find((el) => el.id === action.payload.id);
      if (current) {
        current.name = action.payload.text;
        current.price = action.payload.price;
      }
    },

    setRedact(state, action) {
      state.isRedact.id = action.payload.id;
      state.isRedact.redact = true;
    },
    stopRedact(state) {
      state.isRedact.redact = false;
    },
    delData(state, action) {
      state.data = state.data.filter((el) => el.id != action.payload.id);
    },
    setFilter(state, action) {
      state.filter.filterText = action.payload.text;
      const reg = new RegExp(state.filter.filterText);
      state.filter.filterData = state.data.filter((el) => reg.test(el.name));
      state.filter.isFilter = true;
      console.log(state.filter.filterData);
    },
    stopFilter(state) {
      state.filter.isFilter = false;
      state.filter.filterText = "";
    },
    updateFIlter(state) {
      const reg = new RegExp(state.filter.filterText);
      state.filter.filterData = state.data.filter((el) => reg.test(el.name));
    },
  },
});

export const {
  addData,
  setRedact,
  delData,
  changeData,
  stopRedact,
  setFilter,
  stopFilter,
  updateFIlter,
} = dataSlice.actions;

export default dataSlice.reducer;
