import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    categoryId: 0,
    sort: {
        name: "популярности ↓",
        sortProp: "rating",
      },

};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setSearchValue(state,action) {
            state.searchValue = action.payload;
        }
    }
})

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;
export const { setCategoryId, setSort, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;