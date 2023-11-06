import { createSelector } from "@reduxjs/toolkit";
import tacheReducer from "../reducers/tache.reducer";
export const dataSelector = (state) => state.tacheReducer
// console.log(dataSelector);

export const tacheCustomerSelector = createSelector(
    dataSelector,
    (_, id)=> id,
    (tacheReducer, id)=>tacheReducer.filter((el) => el.id === id)
);