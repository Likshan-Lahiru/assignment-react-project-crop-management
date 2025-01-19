import {configureStore} from "@reduxjs/toolkit";
import dataSlice from  "./testSlice.ts"

export const store = configureStore({
    reducer: {
        myData: dataSlice
    }
});