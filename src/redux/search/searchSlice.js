import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    display: 'cells',
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setDisplayOption: (state, action) => {
            state.display = action.payload.display;
        }    
    }
});

export default searchSlice.reducer;
export const {
  setDisplayOption,
} = searchSlice.actions;

export const displayOptionSelector = (state)  => state.search.display;
